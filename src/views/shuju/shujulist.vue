<template>
  <div>
    <el-card>
      <div id="box"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { shuju } from '@/api/reports'
export default {
  created () {
  },
  data () {
    return {
      option: {}
    }
  },
  methods: {
    async shuju1 () {
      const res = await shuju()
      this.option = res
    },
    async init () {
      const myChart = echarts.init(document.getElementById('box'))
      await this.shuju1()
      console.log(this.option)
      myChart.setOption(this.option)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    this.init()
  }
}
</script>

<style scoped lang="less">
#box {
  width: 80vw;
  height: 90vh;
}
</style>
