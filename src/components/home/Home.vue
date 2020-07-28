<!--
 * @Author: your name
 * @Date: 2020-06-28 11:44:10
 * @LastEditTime: 2020-07-24 12:31:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backstage\src\views\home\Home.vue
--> 
<template>
<el-container class='container'>
  <el-header class='header' height='60px'>
    <el-row :gutter="20">
      <el-col :span="4">
        <img src="@/assets/img/home_icon.png" alt="无法显示图片">
      </el-col>
      <el-col :span="18" class="title">
        <span>电商后台管理系统</span>
      </el-col>
      <el-col :span="2">
        <a @click="handleSignout()" class="login-out">退出</a>
      </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside class='aside' width='220px'>
      <el-menu default-active="2" 
      class="el-menu-vertical-demo" 
      :unique-opened="true"
      :router="true">

        <!-- 1 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="users">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <!-- 2 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item index="2-1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2-2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <!-- 3 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="3-1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3-2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3-3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <!-- 4 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item index="4-1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </template>

          </el-menu-item>
        </el-submenu>
        <!-- 5 -->
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
            <el-menu-item index="5-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>数据统计</span>
              </template>
            </el-menu-item>
          
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main class='main'>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'Home',
  beforeCreate() {
    const token = localStorage.getItem('token')
    if(!token) {
      this.$router.push({name:"login"})
    }
  },
  methods: {
    handleSignout() {
      // 清除token
      localStorage.clear()
      // 消息提示
      this.$message.success('退出成功')
      // 跳转登录页
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
}

/* 头部样式 */
.header img {
  height: 60px;
  margin-left: 20px;
}

.title {
  color: #fff;
  font-size: 36px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-weight: 700;
}

.login-out {
  line-height: 60px;
  text-decoration: none;
}

.main {
  height: 100%;
}
</style>
