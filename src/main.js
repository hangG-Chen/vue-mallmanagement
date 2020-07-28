/*
 * @Author: your name
 * @Date: 2020-06-24 15:22:59
 * @LastEditTime: 2020-07-28 11:55:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backstage\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import MyBread from '@/components/cuscom/MyBread.vue'

import MyHttpServer from '@/plugins/http.js'
import moment from 'moment'


import router from './router'

//引入CSS
import "@/assets/css/base.css"
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

//使用ELEMENT UI
Vue.use(ElementUI)
//使用axios
Vue.use(MyHttpServer)
//全局组件 my-bread
Vue.component(MyBread.name, MyBread)
// 全局过滤器
Vue.filter('fmtdate', (v)=> {
  return moment(v).format('YYYY-MM-DD')
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
