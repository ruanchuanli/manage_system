<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 20px; font-size: 15px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row type="flex" justify="start">
        <el-col
          ><el-button style="margin-left: 20px" type="primary"
            >添加角色</el-button
          ></el-col
        >
      </el-row>
      <!-- 表格 -->
      <el-table :data="roles" border style="width: 100%">
        <el-table-column type="expand" label="#" width="80">
          <template v-slot="{ row }">
            <el-table
              :data="row.children"
              :show-header="false"
            >
              <el-table-column width="200">
                <template v-slot="{ row }">
                  <el-button type="primary" plain>{{ row.authName }}</el-button>
                  <i class="el-icon-caret-right"></i>
                </template>
              </el-table-column>
              <el-table-column width="300">
                <template v-slot="{ row }">
                  <el-row
                    v-for="(item, index) in row.children"
                    :key="index"
                    style="margin-bottom: 10px"
                  >
                    <el-button type="success" plain>{{
                      item.authName
                    }}</el-button>
                    <i class="el-icon-caret-right"></i>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column>
                <template v-slot="{ row }">
                  <el-row
                    v-for="(item, index) in row.children"
                    :key="index"
                    style="border-bottom: 1px solid #eee"
                  >
                    <el-tag
                      closable
                      plain
                      v-for="(item1, index) in item.children"
                      :key="index"
                      style="margin: 10px 5px; height: 40px; line-height: 40px"
                      @close='delright(row.id,item1.id)'
                      >{{ item1.authName }}</el-tag
                    >
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <!-- 分割线 -->
        </el-table-column>
        <el-table-column type="index" label="#" width="80"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" @click="editrole(row.id)"
              ><i class="el-icon-edit"></i>编辑</el-button
            >
            <el-button type="danger" size="small" @click="delrole(row.id)"
              ><i class="el-icon-delete"></i>删除</el-button
            >
            <el-button type="warnning" size="small" @click="assignright(row)"
              ><i class="el-icon-setting"></i>分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="分配权限" :visible="showrights" @close='cancle'>
      <el-tree
        :data="rightslist"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        default-expand-all
        ref='rightstree'
      >
      </el-tree>
      <el-row>
        <el-col>
          <el-button size='small' @click="cancle">取消</el-button>
          <el-button size='small' type="primary" @click="sure">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { rolelist, rights, roleright, delright } from '@/api/role'
let ids = []
export default {
  created () {
    this.rolelist()
    this.rights()
  },
  data () {
    return {
      roles: [],
      rightslist: [],
      page: {
        page: 1,
        pagesize: 5,
        totalpage: 0
      },
      showrights: false,
      defaultProps: {
        label: 'authName'
      },
      checkkeys: [],
      id: ''
    }
  },
  methods: {
    async rolelist () {
      this.roles = await rolelist()
      console.log(this.roles)
    },
    async rights () {
      this.rightslist = await rights()
    },
    cancle () {
      this.select = []
      this.showrights = false
    },
    async sure () {
      this.showrights = false
      this.checkkeys = this.$refs.rightstree.getCheckedKeys()
      console.log(this.checkkeys)
      await roleright({ roleId: this.id, rids: this.checkkeys.join(',') })
      this.$message.success('角色授权成功')
      // 重新获取角色列表
      this.rolelist()
    },
    editrole (id) {
      console.log(id)
    },
    delrole (id) {
      console.log(id)
    },
    // 点击分配权限
    assignright (row) {
      this.showrights = true
      this.id = row.id
      ids = []
      console.log(row)
      this.select = this.getid(row.children)
      this.select.forEach(val => {
        this.$nextTick(() => {
          this.$refs.rightstree.setChecked(val, true, false)
        })
      })
      console.log(this.select)
    },
    // 获取角色所对应的权限id数组
    getid (arr) {
      arr.forEach(item => {
        ids.push(item.id)
        if (item.children) {
          this.getid(item.children)
        }
      })
      return ids
    },
    // 删除角色的某个权限
    async delright (roleid, rid) {
      try {
        await this.$confirm('确定删除这个权限吗？')
        await delright(roleid, rid)
        this.$message.success('删除权限成功')
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less"></style>
