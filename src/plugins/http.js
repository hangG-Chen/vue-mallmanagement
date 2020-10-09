/*
 * @Author: your name
 * @Date: 2020-07-06 12:02:00
 * @LastEditTime: 2020-07-29 14:36:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backstage\src\plugins\http.js
 */
import axios from "axios"
const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
  axios.defaults.baseURL = `http://127.0.0.1:8888/api/private/v1/`
  Vue.prototype.$http = axios
  // 添加请求拦截器

  axios.interceptors.request.use(function (config) {
    // 发送请求前对设置请求头
    if (config.url!=='login') {
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers['Authorization'] = AUTH_TOKEN
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

}

export default MyHttpServer