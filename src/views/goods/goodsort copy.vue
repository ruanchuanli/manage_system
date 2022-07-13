<template>
<div>
    <el-breadcrumb separator="/" style="margin-bottom: 20px; font-size: 15px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row type="flex" justify="start">
        <el-col
          ><el-button style="margin-left: 20px" type="primary" @click="addsort"
            >添加分类</el-button
          ></el-col
        >
      </el-row>
      <!-- 表格 -->
      <el-table :data="sorts" border style="width: 100%" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="cat_id">
        <el-table-column type="index" label="#" width="100"> </el-table-column>
        <el-table-column prop="cat_name" label="分类名称" width="180">
         <!-- <template>
           <i class='el-icon-circle-plus-outline'></i>
         </template> -->
        </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template v-slot='{row}'>
            <i class='el-icon-circle-check' :style="{color:row.cat_deleted?'grey':'green'}"></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template v-slot='{row}'>
            <el-button size="small" plain v-if='row.cat_level===0' type="primary">一级</el-button>
            <el-button size="small" plain v-if='row.cat_level===1' type="success">二级</el-button>
            <el-button size="small" plain v-if='row.cat_level===2' type="warning">三级</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" @click="editsort(row.id)"
              ><i class="el-icon-edit"></i>编辑</el-button
            >
            <el-button type="danger" size="small" @click="delsort(row.id)"
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
          :page-sizes="[5, 10, 15, 20]"
          :page-size="page.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { sortlist } from '@/api/goods'
export default {
  created () {
    this.sortlist()
  },
  data () {
    return {
      page: {
        type: null,
        pagenum: 1,
        pagesize: 5
      },
      sorts: []
    }
  },
  methods: {
    async sortlist () {
      this.sorts = await sortlist()
    },
    editsort (id) {
      console.log(id)
    },
    addsort (id) {
      console.log(id)
    },
    delsort (id) {
      console.log(id)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>

</style>
