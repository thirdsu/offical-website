<template>
  <div class="login-dialog">
    <el-dialog
      :title="this.isLogin ? '登录' : '注册'"
      :top="this.isLogin ? '28vh':'25vh'"
      :visible.sync="dialogVisible"
      width="320px"
      :before-close="handleClose">
      <div class="content">
        <div v-if="isLogin" class="content-login">
          <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
          <el-input type="password" v-model="form.password" class="mt15" placeholder="请输入密码"></el-input>
          <el-button type="primary" size="medium"  class="mt15" @click="toLogin">登录</el-button>
          <div class="notice-login">
            <p>没有账号？<span class="regist-text" @click='toRegisterDialog'>注册</span></p>
            <p class="forget-password">忘记密码</p>
          </div>
        </div>
      <div v-else class="content-register">
           <el-input v-model="regForm.userName" placeholder="请输入用户名" autoComplete="off"></el-input>
           <el-input v-model="regForm.tel" class="mt15" placeholder="请输入手机号" autoComplete="off"></el-input>
          <el-input type="password" v-model="regForm.password" class="mt15" placeholder="请输入密码（不少于6位）"  autoComplete="new-password"></el-input>
           <el-button type="primary" size="medium"  class="mt15 login-btn" @click="toRegister">注册</el-button>
            <el-button type="text" size="medium"  class="login-btn" @click="toLoginDialog">已有账号登录</el-button>
      </div>
        <p>注册登录即表示同意<span class="contract-text">用户协议、隐私政策</span></p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {login, register} from '../../../api/login'
export default {
  name: 'LoginDialog',
  data () {
    return {
      dialogVisible: false,
      isLogin: true,
      form: {
        tel: '',
        password: ''
      },
      regForm: {
        userName: '',
        tel: '',
        password: ''
      }
    }
  },
  methods: {
    open (data) {
      this.form = {
        tel: '',
        password: ''
      }
      this.regForm = {
        userName: '',
        tel: '',
        password: ''
      }
      if (data) {
        this.dialogVisible = true
        this.isLogin = data.isLogin
      }
    },
    handleClose () {
      this.dialogVisible = false
    },
    toRegisterDialog () {
      this.regForm = {
        userName: '',
        tel: '',
        password: ''
      }
      this.isLogin = false
    },
    toLoginDialog () {
      this.form = {
        tel: '',
        password: ''
      }
      this.isLogin = true
    },
    toLogin () {
      login({
        tel: this.form.tel,
        password: this.form.password
      }).then(res => {
        this.saveUserInfoStorage(res.data)
        this.$message.success('登录成功！')
        this.$parent.loginCallback()
        this.dialogVisible = false
        console.log(res)
      })
    },
    toRegister () {
      register({
        userName: this.regForm.userName,
        tel: this.regForm.tel,
        password: this.regForm.password
      }).then(res => {
        if (res.data) {
          this.saveUserInfoStorage(res.data)
          this.$message.success('注册成功！')
          this.$parent.registerCallback()
          this.dialogVisible = false
        }
        console.log(res)
      })
    },
    // 保存用户信息到localStorage
    saveUserInfoStorage (data) {
      if (data.new_token) {
        localStorage.setItem('token', data.new_token)
        localStorage.setItem('userInfo', JSON.stringify({
          userName: data.userInfo.name,
          headPortrait: data.userInfo.headPortrait,
          password: data.userInfo.password
        }))
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../../assets/css/common.scss';
.login-dialog {
  .content{
    margin:5px;
    .mt15 {
      margin-top:15px;
    }
    .content-login,.content-register {
       @include displayflex(column, space-between, stretch);
      .login-btn {
        flex:1;
      }
      .notice-login {
        @include displayflex(row,space-between,flex-start);
        .regist-text, .forget-password {
          color: #007fff;
          cursor: pointer;
        }
      }
    }
    .contract-text {
        color: #007fff;
      }
  }
}
</style>
