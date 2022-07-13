<template>
  <div>
    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon > </el-alert>
      <el-row style="margin:15px 0">
        <el-col>
          选择商品分类：
          <el-cascader
            v-model="cid"
            :options="sorts"
            :props="{ expandTrigger: 'hover',label: 'cat_name',value: 'cat_id' }"
            @change="change"
          ></el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="active" @tab-click="tabclick">
        <el-tab-pane label="动态参数" name="many">
          <attr :active='active' :cid='cid[2]' ref='attrform1' @editattr='tabclick'></attr>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only"> <attr :active='active' :cid='cid[2]' ref='attrform2'  @editattr='tabclick'></attr></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { sortlist } from '@/api/goods'
import attr from './components/attrs.vue'
export default {
  created () {
    this.sortlist()
  },
  data () {
    return {
      sorts: [],
      cid: '',
      active: 'many',
      page: {
        // type: null,
        pagenum: 1,
        pagesize: 4,
        total: 0
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
    async change () {
      this.$refs.attrform1.attrslist(this.cid[2], this.active)
    },
    tabclick () {
      if (this.active === 'only') {
        this.$refs.attrform2.attrslist(this.cid[2], this.active)
      } else {
        this.$refs.attrform2.attrslist(this.cid[2], this.active)
      }
    }
    // async editattr () {
    //   await this.$refs.attrform2.attrslist(this.cid[2], this.active)
    // }
  },
  computed: {},
  watch: {
  },
  filters: {},
  components: { attr }
}
</script>

<style scoped lang="less"></style>
