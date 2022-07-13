<template>
  <div>
    <el-card>
      <el-row type="flex" justify="start">
        <el-col
          ><el-button style="margin-left: 20px" type="primary" @click="showaddrole=true"
            >添加角色</el-button
          ></el-col
        >
      </el-row>
      <!-- 表格 -->
      <el-table :data="roles" border style="width: 100%">
        <el-table-column type="expand" label="#" width="80">
          <template v-slot="{ row }">
            <span v-for="(item, index) in row.children" :key="index">
              <el-row type="flex" justify="space-between" align="middle">
                <el-col :span="6">
                  <el-row>
                    <el-button type="primary" plain>{{
                      item.authName
                    }}</el-button>
                    <i class="el-icon-caret-right"></i>
                  </el-row>
                </el-col>
                <el-col :span="18">
                  <el-row
                    type="flex"
                    justify="center"
                    align="middle"
                    v-for="(item1, index1) in item.children"
                    :key="index1"
                    style="margin-bottom: 10px;border-bottom: 1px solid #eee"
                  >
                    <el-col :span="6">
                      <el-button type="success" plain  style="margin-bottom: 10px;">{{
                      item1.authName
                    }}</el-button>
                    <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col>
                      <span
                      v-for="(item2, index2) in item1.children"
                      :key="index2"
                    >
                      <el-tag
                      :key='item2.id'
                        closable
                        plain
                        style="
                          margin: 5px 10px;
                        "
                        @close="delright(row, item2)"
                        >{{ item2.authName }}</el-tag
                      >
                    </span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </span>
          </template>
          <!-- 分割线 -->
        </el-table-column>
        <el-table-column type="index" label="#" width="80"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" @click="editroles(row.id)"
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
    <el-dialog title="分配权限" :visible="showrights" @close="cancle">
      <el-tree
        :data="rightslist"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        default-expand-all
        ref="rightstree"
      >
      </el-tree>
      <el-row>
        <el-col>
          <el-button size="small" @click="cancle">取消</el-button>
          <el-button size="small" type="primary" @click="sure">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <addrole :showaddrole.sync='showaddrole' @addrole='rolelist' ref='roleform'></addrole>
  </div>
</template>

<script>
import { rolelist, rights, roleright, delright, delrole } from '@/api/role'
import addrole from '@/views/role/components/addrole.vue'
// import removeitem from 'lodash/remove'
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
      id: '',
      showaddrole: false
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
    async delrole (id) {
      console.log(id)
      try {
        await this.$confirm('确定删除这个角色吗？')
        await delrole(id)
        this.rolelist()
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 点击分配权限
    assignright (row) {
      this.showrights = true
      this.id = row.id
      ids = []
      console.log(row)
      this.select = this.getid(row.children)
      this.select.forEach((val) => {
        this.$nextTick(() => {
          this.$refs.rightstree.setChecked(val, true, false)
        })
      })
      console.log(this.select)
    },
    // 获取角色所对应的权限id数组
    getid (arr) {
      arr.forEach((item) => {
        ids.push(item.id)
        if (item.children) {
          this.getid(item.children)
        }
      })
      return ids
    },
    // 删除角色的某个权限
    async delright (role, item) {
      try {
        console.log(item)
        await this.$confirm('确定删除这个权限吗？')
        await delright(role.id, item.id)
        this.delitem(item)
        // this.rolelist()
        console.log(item)
        console.log(role)
        this.$message.success('删除权限成功')
      } catch (error) {
        console.log(error)
      }
    },
    delitem (item) {
      this.roles.forEach(val => {
        val.children.forEach(val2 => {
          val2.children.forEach(val3 => {
            val3.children.forEach((val4, index) => {
              if (val4.id === item.id) {
                console.log(val4, 111111)
                val3.children.splice(index, 1)
                return false
              }
            })
          })
        })
      })
      console.log(item.id)
      console.log(this.roles)
    },
    async editroles (id) {
      await this.$refs.roleform.getRoleById(id)
      this.showaddrole = true
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { addrole }
}
</script>

<style scoped lang="less"></style>
