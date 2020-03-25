<template>
  <div class="menu">
    <div class="menu-container">
      <div class="menu-list">
        <div class="logo">
          <p class="logo-text">SU.COM</p>
        </div>
          <div v-for="(item,index) in tabList" :key="item.name" @click="navigatePage(item)">
              <div :class="['menu-item ',currentIndex==index?'checked':'']">
                {{item.name}}
              </div>
          </div>
        </div>
      <div v-if="!isLogin" class="menu-right">
        <p class="login-text" @click="toLogin">登录</p>
        <p class="dot-text">·</p>
        <p class="register-text" @click="toRegister">注册</p>
      </div>
      <div v-else class="menu-user">
          <div class="mes-icon-div">
            <i class="icon-noticefill iconfont mes-icon"></i>
          </div>
          <div class="user-img-div" @click="toUserPage">
          </div>
      </div>
    </div>
    <LoginDialog ref='loginDialog' @registerCallback="registerCallback" @loginCallback="loginCallback"></LoginDialog>
  </div>
</template>

<script>
import LoginDialog from '../../homePage/LoginDialog'
export default {
  name: 'Header',
  components: {
    LoginDialog
  },
  data () {
    return {
      isLogin: false,
      currentIndex: 0,
      tabList: [
        {
          name: '首页',
          pathName: '/'
        },
        {
          name: '话题',
          pathName: '/topics'
        }
      ]
    }
  },
  mounted () {
    // console.log(this.$route)
    // const path = this.$route.path
    // if (path === '/') {
    //   this.currentIndex = 0
    // } else {
    //   this.currentIndex = this.tabList.findIndex(item => {
    //     return item.path === path
    //   })
    // }
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    console.log(userInfo)
    if (userInfo && userInfo.userName) {
      this.isLogin = true
    }
    this.currentIndex = this.tabList.findIndex(item => {
      return item.pathName === this.$route.path
    })
    console.log(this.currentIndex)
  },
  methods: {
    navigatePage (item) {
      this.$router.push(item.pathName)
    },
    toLogin () {
      this.$refs.loginDialog.open({
        isLogin: true
      })
    },
    toRegister () {
      this.$refs.loginDialog.open({
        isLogin: false
      })
    },
    loginCallback () {
      debugger
      this.isLogin = true
    },
    registerCallback () {
      this.isLogin = true
    },
    toUserPage () {}
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
