<template>
<div>
    <el-card>
      <!-- 表格 -->
      <el-table
      :data="rightlist"
      border
      style="width: 100%">
      <el-table-column
      type='index'
        label="#"
        width="180">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径">
      </el-table-column>
      <el-table-column
        label="权限等级">
        <template v-slot="{row}">
          <el-button size='small' plain v-if='row.level==="0"' type="warning">等级一</el-button>
          <el-button size='small' plain v-if='row.level==="1"' type="success">等级二</el-button>
          <el-button size='small' plain v-if='row.level==="2"' type="primary">等级三</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
</div>
</template>

<script>
import { rightslist } from '@/api/rights'
export default {
  created () {
    this.rightslist()
  },
  data () {
    return {
      rightlist: []
    }
  },
  methods: {
    async rightslist () {
      this.rightlist = await rightslist()
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
