<!--
 * @Author: your name
 * @Date: 2020-07-28 11:13:08
 * @LastEditTime: 2020-07-28 11:53:58
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-backstage\src\components\cuscom\MyBread.vue
--> 

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: 'MyBread',
    props: ['level1','level2']
  }
</script>

<style scoped>

</style>