<template>
<el-dialog :title="title" :visible='showaddrole' @close='cancle'>
  <el-form label-width="80px">
    <el-form-item label="角色名称">
      <el-input v-model='role.roleName'></el-input>
    </el-form-item>
    <el-form-item label="角色描述">
      <el-input v-model='role.roleDesc'></el-input>
    </el-form-item>
  </el-form>
  <el-row type="flex" justify="center">
    <el-col :span="6">
      <el-button size='small' @click="cancle">取消</el-button>
    <el-button size='small' type='primary' @click="sure">确定</el-button>
    </el-col>
  </el-row>
</el-dialog>
</template>

<script>
import { addrole, editrole, getRoleById } from '@/api/role'
export default {
  props: {
    showaddrole: {
      type: Boolean,
      default: false
    }
  },
  created () {},
  data () {
    return {
      role: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    cancle () {
      this.role = []
      this.$emit('update:showaddrole', false)
    },
    async sure () {
      if (this.role.roleId) {
        await editrole({ ...this.role, id: this.role.roleId })
      } else {
        await addrole(this.role)
      }
      this.$emit('update:showaddrole', false)
      this.$message.success('添加角色成功')
      this.$emit('addrole')
    },
    async getRoleById (id) {
      this.role = await getRoleById(id)
    }
  },
  computed: {
    title () {
      return this.role.roleId ? '编辑角色' : '添加角色'
    }
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>

</style>
