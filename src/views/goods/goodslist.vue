<template>
  <div>
    <el-card>
      <el-row type="flex" justify="start">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="page.query"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="goods"
            ></el-button>
          </el-input>
        </el-col>
        <el-col
          ><el-button style="margin-left: 20px" type="primary" @click="addgood"
            >添加商品</el-button
          ></el-col
        >
      </el-row>
      <!-- 表格 -->
      <el-table :data="goodslist" border style="width: 100%">
        <el-table-column type="index" label="#" width="180"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间">
          <template v-slot="{ row }">
            {{ row.add_time | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" @click="editgood(row.id)"
              ><i class="el-icon-edit"></i>编辑</el-button
            >
            <el-button type="danger" size="small" @click="delgood(row.id)"
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
import { goods } from '@/api/goods'
export default {
  created () {
    this.goods()
  },
  data () {
    return {
      goodslist: [],
      page: {
        pagenum: 1,
        pagesize: 5,
        query: '',
        total: 0
      }
    }
  },
  methods: {
    async goods () {
      const data = await goods(this.page)
      console.log(data)
      this.goodslist = data.goods
      this.page.total = data.total
    },
    changesize (val) {
      console.log(val)
      this.page.pagesize = val
      this.goods()
    },
    changenum (val) {
      console.log(val)
      this.page.pagenum = val
      this.goods()
    },
    editgood (id) {
      console.log(id)
    },
    delgood (id) {
      console.log(id)
    },
    addgood () {
      console.log(1)
      this.$router.push('addgood')
    }
  },
  computed: {},
  watch: {},
  filters: {
    formatDate (time, cFormat) {
      if (arguments.length === 0 || !time) {
        return null
      }
      const format = cFormat || '{y}-{m}-{d}'
      let date
      if (typeof time === 'object') {
        date = time
      } else {
        if (typeof time === 'string') {
          if (/^[0-9]+$/.test(time)) {
            // support "1548221490638"
            time = parseInt(time)
          } else {
            // support safari
            // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
            // eslint-disable-next-line prefer-regex-literals
            time = time.replace(new RegExp(/-/gm), '/')
          }
        }

        if (typeof time === 'number' && time.toString().length === 10) {
          time = time * 1000
        }
        date = new Date(time)
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      }
      // eslint-disable-next-line camelcase
      const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
          return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        return value.toString().padStart(2, '0')
      })
      // eslint-disable-next-line camelcase
      return time_str
    }
  },
  components: {}
}
</script>

<style scoped lang="less"></style>
