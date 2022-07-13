<template>
  <div>
    <el-card>
      <el-row type="flex" justify="start">
        <el-col
          ><el-button style="margin-left: 20px" type="primary" @click="addsort"
            >添加分类</el-button
          ></el-col
        >
      </el-row>
      <!-- 表格 -->
      <el-table
        :data="sorts"
        border
        style="width: 100%"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        row-key="cat_id"
      >
        <!-- <el-table-column type="index" label="#" width="100"> </el-table-column> -->
        <el-table-column prop="cat_name" label="分类名称" width="180">
          <!-- <template>
           <i class='el-icon-circle-plus-outline'></i>
         </template> -->
        </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template v-slot="{ row }">
            <i
              class="el-icon-circle-check"
              :style="{ color: row.cat_deleted ? 'grey' : 'green' }"
            ></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template v-slot="{ row }">
            <el-button
              size="small"
              plain
              v-if="row.cat_level === 0"
              type="primary"
              >一级</el-button
            >
            <el-button
              size="small"
              plain
              v-if="row.cat_level === 1"
              type="success"
              >二级</el-button
            >
            <el-button
              size="small"
              plain
              v-if="row.cat_level === 2"
              type="warning"
              >三级</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" @click="editsort(row.cat_id)"
              ><i class="el-icon-edit"></i>编辑</el-button
            >
            <el-button type="danger" size="small" @click="delsort(row.cat_id)"
              ><i class="el-icon-delete"></i>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-pagination
          @size-change="changesize"
          @current-change="changenum"
          :current-page="page.pagenum"
          :page-sizes="[4, 8, 12, 16]"
          :page-size="page.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 添加框 -->
    <el-dialog title="添加商品分类" :visible.sync="showaddsort">
      <el-form label-width="80px" :model="addform" ref="addform">
        <el-form-item label="分类名称">
          <el-input v-model="addform.cat_name"> </el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
          ref='selectitem'
          @change='change'
            :options="sorts"
            :props="{ checkStrictly: true,expandTrigger: 'hover',label: 'cat_name',value: 'cat_id' }"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="6">
          <el-button size="small" @click="cancle">取消</el-button>
          <el-button size="small" type="primary" @click="sure">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 编辑框 -->
    <el-dialog title="编辑商品分类" :visible.sync="showeditsort">
      <el-form label-width="80px" :model="editform" ref="editform">
        <el-form-item label="分类ID">
          <el-input v-model="editform.cat_id" disabled> </el-input>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="editform.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="6">
          <el-button size="small" @click="cancle2">取消</el-button>
          <el-button size="small" type="primary" @click="sure2">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { sortlist, addsort, getsort, editsort, delsort } from '@/api/goods'
export default {
  created () {
    this.sortlist()
  },
  data () {
    return {
      page: {
        // type: null,
        pagenum: 1,
        pagesize: 4,
        total: 0
      },
      sorts: [],
      value: '',
      catids: [],
      addform: {
        cat_name: '',
        cat_pid: '',
        cat_level: ''
      },
      item: [],
      showaddsort: false,
      showeditsort: false,
      editform: {
        cat_id: '',
        cat_name: ''
      }
    }
  },
  methods: {
    async sortlist () {
      const res = await sortlist(this.page)
      this.sorts = res.result
      this.page.total = res.total
      console.log(res)
    },
    change (val) {
      try {
        console.log(val)
        const item = this.$refs.selectitem.getCheckedNodes()
        this.item = item[0].data
        console.log(item[0].data)
      } catch (error) {
        console.log(error)
      }
    },
    changesize (val) {
      console.log(val)
      this.page.pagesize = val
      this.sortlist()
    },
    changenum (val) {
      console.log(val)
      this.page.pagenum = val
      this.sortlist()
    },
    async editsort (id) {
      console.log(id)
      this.showeditsort = true
      this.editform = await getsort(id)
      console.log(this.editform)
    },
    addsort (id) {
      console.log(id)
      this.showaddsort = true
    },
    async delsort (id) {
      console.log(id)
      await this.$confirm('确定删除该分类吗？')
      await delsort(id)
      this.$message.success('删除分类成功')
      this.sortlist()
    },
    cancle () {
      this.addform = {}
      this.$refs.selectitem.$refs.panel.clearCheckedNodes()
      this.showaddsort = false
    },
    // 点击确定
    async sure () {
      this.showaddsort = false
      await addsort({
        cat_name: this.addform.cat_name,
        cat_pid: this.item.cat_id || 0,
        cat_level: this.item.cat_level + 1 || 0
      })
      this.$message.success('添加分类成功')
      this.sortlist()
      this.addform = {}
      this.$refs.selectitem.$refs.panel.clearCheckedNodes()
    },

    cancle2 () {
      this.editform = {}
      this.showeditsort = false
    },
    // 点击确定
    async sure2 () {
      this.showeditsort = false
      await editsort({ ...this.editform, id: this.editform.cat_id })
      this.$message.success('修改分类成功')
      this.sortlist()
      this.editform = {}
      this.sortlist()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less"></style>
