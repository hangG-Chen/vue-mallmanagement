<!--
 * @Author: your name
 * @Date: 2020-06-24 19:27:36
 * @LastEditTime: 2020-07-06 11:40:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backstage\src\components\login\login.vue
--> 
<template>
<div class='login-wrap'>
  <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
    <h2> 用户登录 </h2>
    <el-form-item label="账号">
      <el-input v-model="formdata.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formdata.password"> </el-input>
    </el-form-item>
    <el-button type="primary" class="login-btn" @click.prevent="handleLogin()"> 登录 </el-button>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin() {

      // es7 async await
      const res = await this.$http.post("login", this.formdata)
      console.log(res);
      const {
        data,
        meta: {
          msg,
          status
        }
      } = res.data

      if (status === 200) {
        // 登陆成功
        // 保存token值
        localStorage.setItem('token', data.token)
        // 提示信息
        this.$message.success('登陆成功')
        // 跳转Home
        this.$router.push('/home')
      } else {
        // 登录失败
        // 提示信息
        this.$message.warning(meta.msg);
      }
    }

  }

  // this.$http.post("login", this.formdata).then(res => {
  // const { data, meta:
  // { msg, status }
  // } = res.data
  // if (meta.status === 200) {
  // // 登陆成功
  // // 跳转Home
  // this.$message.success('登陆成功')
  // this.$router.push("/home");
  // } else {
  // // 登录失败
  // // 提示信息
  // this.$message.warning(meta.msg);
  // }
  // })
  // }
}
</script>

<style scoped>
.login-wrap {
  height: 100%;
  background-color: #324152;

  display: flex;

  justify-content: center;

  align-items: center;

}

.login-wrap .login-form {

  width: 400px;

  background-color: #fff;
  padding: 30px;
  padding-bottom: 40px;
  border-radius: 5px;
}

.login-wrap .login-btn {
  width: 100%;
}
</style>
