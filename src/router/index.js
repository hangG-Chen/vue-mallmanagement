/*
 * @Author: your name
 * @Date: 2020-06-24 16:08:15
 * @LastEditTime: 2020-09-22 11:28:04
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
import Role from '@/components/rights/Role.vue'

import { Message } from 'element-ui'
/**
 * 重写路由的push方法
 */

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  if (typeof (location) == "string") {
    var Separator = "&";
    if (location.indexOf('?') == -1) {
      Separator = '?';
    }
    location = location + Separator + "random=" + Math.random();
  }
  return routerPush.call(this, location).catch(error => error)
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
      },
      {
        path: 'roles',
        name: 'Role',
        component: Role
      }
    ]
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  console.log("to:", to);
  console.log("from:", from);
  if(to.name==='login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      Message.warning('回到登录页')
      router.push({
        path: '/login'
      })
      return
    } 
  }
  
  next()
})
export default router