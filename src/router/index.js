/*
 * @Author: your name
 * @Date: 2020-06-24 16:08:15
<<<<<<< HEAD
 * @LastEditTime: 2020-07-28 11:10:27
=======
 * @LastEditTime: 2020-07-28 11:07:51
>>>>>>> dev-user
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backstage\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login.vue'
import Home from '@/components/home/Home.vue'
import Users from '@/components/users/Users.vue'
import Rights from '@/components/rights/Rights.vue'

/**
 * 重写路由的push方法
 */

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  if(typeof(location)=="string"){
    var Separator = "&";
    if(location.indexOf('?')==-1) { Separator='?'; }
    location = location + Separator + "random=" + Math.random();
  }
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)

const routes = [
  // {
//     path: "/",
//     redirect: '/login'
//   },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [{
      path: 'users',
      name: 'users',
      component: Users
    },
    {
      path: 'rights',
      name: 'rights',
      component: Rights
    }]
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router