<template>
<div class='login'>
  <div class="form-box">
     <!-- <el-avatar src="requeir('@/assets/logo.png')"></el-avatar> -->
     <div class='avatar'>
       <img src="@/assets/logo.png" alt="">
     </div>
     <el-form label-width="50px" :model='loginform' :rules="rules" ref='loginform'>
       <el-form-item  prop="username">
         <el-input v-model='loginform.username' style="width:90%">
           <i slot="prefix" class="el-input__icon el-icon-user"></i>
         </el-input>
       </el-form-item>
       <el-form-item prop="password">
         <el-input style="width:90%" v-model='loginform.password' type='password'>
           <i slot="prefix" class="el-input__icon el-icon-lock"></i>
         </el-input>
       </el-form-item>
     </el-form>
     <el-row type="flex" justify="end" align="middle">
       <el-col :span='9'>
         <el-button size='medium' type='primary' @click="login">登录</el-button>
         <el-button size='medium' type="info" @click="reset">重置</el-button>
       </el-col>
     </el-row>
  </div>
</div>
</template>

<script>
// import { login } from '@/api/user'
export default {
  created () {},
  data () {
    return {
      loginform: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '用户名为3到8位', trigger: 'blur' }],
        password: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '用户名为3到8位', trigger: 'blur' }]
      }

    }
  },
  methods: {
    // 重置
    reset () {
      this.$refs.loginform.resetFields()
    },
    // 登录
    async login () {
      try {
        await this.$refs.loginform.validate()
        // const data = await login(this.loginform)
        // console.log(data)
        await this.$store.dispatch('login', this.loginform)
        this.$router.push('/home')
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
.login{
  width: 100vw;
  height: 100vh;
  background-color: #334b6c;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-box {
    width: 500px;
    height: 300px;
    background-color: #fff;
    padding-top:70px;
    position: relative;
  }
  .avatar {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translate(-50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #fff;
    text-align: center;
    line-height: 100px;
    vertical-align: middle;
    box-shadow: 0 0 10px green;;
    img{
      width: 50px;
      height: 50px;
    }
  }
}

</style>
