<template>
<el-dialog title="添加用户对话框" :visible='showadduser' @close='cancle'>
  <el-form label-width="100px" :model="userform" :rules="rules" ref='userform'>
    <el-form-item label='用户名' prop="username">
      <el-input v-model='userform.username' style="width:90%"></el-input>
    </el-form-item>
    <el-form-item label='密码' prop="password">
      <el-input v-model='userform.password' type="password" style="width:90%"></el-input>
    </el-form-item>
    <el-form-item label='邮箱' prop="email">
      <el-input v-model='userform.email'  style="width:90%"></el-input>
    </el-form-item>
    <el-form-item label='手机号' prop="mobile">
      <el-input v-model='userform.mobile'  style="width:90%"></el-input>
    </el-form-item>
  </el-form>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="6">
      <el-button size="small" @click="cancle">取消</el-button>
      <el-button size="small" type="primary" @click='sure'>确定</el-button>
    </el-col>
  </el-row>
</el-dialog>
</template>

<script>
import { adduser } from '@/api/user'
export default {
  props: {
    showadduser: {
      type: Boolean,
      default: false
    }
  },
  created () {},
  data () {
    return {
      userform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }, { min: 2, max: 7, message: '长度为2到7位', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }, { min: 2, max: 7, message: '长度为2到7位', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机格式不正确', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 点击取消
    cancle () {
      this.userform = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
      this.$refs.userform.resetFields()
      this.$emit('update:showadduser', false)
    },
    // 点击确定
    async sure () {
      try {
        await this.$refs.userform.validate()
        await adduser(this.userform)
        this.$message.success('添加用户成功')
        this.$emit('update:showadduser', false)
        this.$emit('adduser')
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

<style scoped lang='less'>

</style>
