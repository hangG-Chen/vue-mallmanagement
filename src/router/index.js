/*
 * @Author: your name
 * @Date: 2020-06-24 16:08:15
 * @LastEditTime: 2020-07-06 10:29:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backstage\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/views/home/Home.vue'

/**
 * 重写路由的push方法
 */
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const routes = [
  {
    path: "/",
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router