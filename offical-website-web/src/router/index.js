import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage/index'
import topics from '@/views/topics/index'

Vue.use(Router)

// 解决在路由跳转的时候同一个路由多次添加是不被允许的问题
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage
    },
    {
      path: '/topics',
      name: 'topics',
      component: topics
    }
  ]
})
