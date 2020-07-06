/*
 * @Author: your name
 * @Date: 2020-06-24 15:22:59
 * @LastEditTime: 2020-06-27 18:47:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backstage\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import MyHttpServer from '@/plugins/http.js'

import "@/assets/css/base.css"
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import store from './store'



Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(MyHttpServer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
