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
              @click="orders"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="orderlist" border style="width: 100%">
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="250">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="60">
        </el-table-column>
        <el-table-column prop="pay_status" label="是否付款" width="100">
          <template v-slot="{ row }">
            <el-button type="danger" size="small" v-if="row.pay_status === '0'"
              >未支付</el-button
            >
            <el-button type="success" size="small" v-else>已支付</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="100">
        </el-table-column>
        <el-table-column prop="create_time" label="下单时间" width="150">
          <template v-slot="{ row }">
            {{ row.create_time | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" @click="editorder(row)"
              >修改订单</el-button
            >
            <el-button type="success" size="small" @click="orderdetail(row)"
              >查看订单</el-button
            >
            <el-button type="warning" size="small" @click="kuaidiinfo(row)"
              >查看物流</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-pagination
          @size-change="changesize"
          @current-change="changenum"
          :current-page="page.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="page.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <el-dialog title="购买信息" :visible.sync="showdetail">
      <el-descriptions v-for="(item, index) in detail.goods" :key="index">
        <el-descriptions-item label="商品id">{{
          item.goods_id
        }}</el-descriptions-item>
        <el-descriptions-item label="商品数量">{{
          item.goods_number
        }}</el-descriptions-item>
        <el-descriptions-item label="商品单价">{{
          item.goods_price
        }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
    <el-dialog :visible='showedit'  @close='cancle' title="修改订单信息">
      <el-form>
        <el-form-item label="是否发货">
          <el-radio-group v-model="detail.is_send">
            <el-radio label="是">已发货</el-radio>
            <el-radio label="否">未发货</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-radio-group v-model="detail.order_pay">
            <el-radio label="0">未支付</el-radio>
            <el-radio label="1">支付宝</el-radio>
            <el-radio label="2">微信</el-radio>
            <el-radio label="3">银行卡</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="订单价格">
          <el-input v-model="detail.order_price"></el-input>
        </el-form-item>
        <el-form-item label="订单数量">
          <el-input v-model="detail.order_number"></el-input>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-radio-group v-model="detail.pay_status">
            <el-radio label="0">未付款</el-radio>
            <el-radio label="1">已付款</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
     <el-row type="flex" justify="center" align="middle">
    <el-col :span="6">
      <el-button size="small" @click="cancle">取消</el-button>
      <el-button size="small" type="primary" @click='sure'>确定</el-button>
    </el-col>
  </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { orders, getorder, kuaidi, editorder } from '@/api/order'
export default {
  created () {
    this.orders()
  },
  data () {
    return {
      orderlist: [],
      page: {
        query: '',
        pagenum: 1,
        pagesize: 5,
        totalpage: 0
      },
      showdetail: false,
      showedit: false,
      detail: {
        id: '',
        is_send: '',
        order_pay: '',
        order_price: '',
        order_number: '',
        pay_status: ''
      }
    }
  },
  methods: {
    async orders () {
      const data = await orders(this.page)
      console.log(data)
      this.orderlist = data.goods
      this.page.total = data.total
    },
    changesize (val) {
      console.log(val)
      this.page.pagesize = val
      this.orders()
    },
    changenum (val) {
      console.log(val)
      this.page.pagenum = val
      this.orders()
    },
    async editorder (row) {
      // this.orderdetail(row)
      const data = await getorder(row.order_id)
      this.detail = data
      this.showedit = true
    },
    async orderdetail (row) {
      console.log(row)
      const data = await getorder(row.order_id)
      this.showdetail = true
      console.log(data)
      this.detail = data
    },
    async kuaidiinfo (row) {
      console.log(row)
      const data = await kuaidi(row.order_id)
      console.log(data)
    },
    // 点击取消
    cancle () {
      this.detail = {}
      this.showedit = false
    },
    // 点击确定
    async sure () {
      try {
        await editorder({ ...this.detail, id: this.detail.order_id })
        this.$message.success('修改订单成功')
        this.showedit = false
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
