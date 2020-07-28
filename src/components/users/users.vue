<!--
 * @Author: your name
 * @Date: 2020-07-06 12:01:28
 * @LastEditTime: 2020-07-28 11:56:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backstage\src\components\users\users.vue
--> 
<template>
<el-card class="box-card">
  <!-- 面包屑 -->
  <my-bread level1='用户管理' level2='用户列表'></my-bread>
  <!-- 搜索 -->
  <el-row>
    <el-col>
      <el-input placeholder="请输入搜索内容" v-model="query" class="inputSearch">
        <el-button slot='append' icon="el-icon-search" @click="handleSearch">
        </el-button>
      </el-input>

      <!-- 添加用户 -->
      <el-button type='success' @click="dialogFormVisibleAdd = true">添加用户</el-button>

    </el-col>
  </el-row>

  <!-- 表格 -->
  <el-table :data="userlist" style="width: 100%">
    <el-table-column type='index' label="#" width="50">
    </el-table-column>
    <el-table-column prop="username" label="姓名" width="100">
    </el-table-column>
    <el-table-column prop="email" label="邮箱" width="180">
    </el-table-column>
    <el-table-column prop="mobile" label="电话" width="180">
    </el-table-column>
    <el-table-column label="创建时间" width="180">
      <template slot-scope="scope">
        {{scope.row.create_time | fmtdate}}

      </template>
    </el-table-column>
    <el-table-column label="用户状态">
      <template slot-scope="scope">
        <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="changeMgState(scope.row)">

        </el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">

      <!-- <template slot-scope="scope"> -->
      <template slot-scope="scope">
        <!-- 编辑用户 -->
        <el-button plain size="mini" type="primary" icon="el-icon-edit" circle @click="showEditUserDialog(scope.row)"></el-button>
        <!-- 删除用户 -->
        <el-button plain size="mini" type="danger" icon="el-icon-delete" circle @click="showDeleteUserBox(scope.row.id)"></el-button>
        <el-button plain size="mini" type="success" icon="el-icon-check" circle @click="showSetUserRoleDia(scope.row)"></el-button>
      </template>
    </el-table-column>

  </el-table>

  <el-pagination :page-size="pagesize" @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="total" :current-page="pagenum" :page-sizes="[5,10,15]" layout="total, sizes, prev, pager, next, jumper">
  </el-pagination>

  <!-- 添加用户的对话框 -->
  <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密 码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮 箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电 话" :label-width="formLabelWidth">
        <el-input v-model="form.mobile" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
      <el-button type="primary" @click="addUser()">确 定</el-button>
    </div>
  </el-dialog>
  
  <!-- 编辑用户的对话框 -->
  <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
    <el-form :model="editForm">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮 箱" :label-width="formLabelWidth">
        <el-input v-model="editForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电 话" :label-width="formLabelWidth">
        <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
      <el-button type="primary" @click="editUser()">确 定</el-button>
    </div>
  </el-dialog>

  <!-- 分配用户角色的对话框 -->
  <el-dialog title="分配角色" :visible.sync="dialogFormVisibleSetRole">
    <el-form>
      <el-form-item label="用户名称" :label-width="formLabelWidth">
        {{currentUsername}}
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth">
        <el-select v-model="currentRid" placeholder="请选择" no-match-text="请选择">
          <el-option :label='noRole.label' :value="noRole.id"></el-option>
          <el-option v-for='item in roleList' :label='item.roleName' :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleSetRole = false">取 消</el-button>
      <el-button type="primary" @click="setUserRole()">确 定</el-button>
    </div>
  </el-dialog>
</el-card>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      query: '',
      pagenum: 1,
      pagesize: 5,
      userlist: [],
      total: 0,

      // 对话框属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleSetRole: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      editForm: {},

      // 分配角色 
      noRole: {
        id: -1,
        label: '请选择'
      },
      roleList: {},
      currentRid: '',
      currentId: 0,
      currentUsername: '',
      formLabelWidth: '100px'
    }
  },
  //过滤器

  filters: {
    userWithoutRole(value) {
      if (value == -1) {
        return '请选择'
      }
    }
  },
  methods: {
    // query    查询参数     可以为空
    // pagenum  当前页码     不能为空
    // pagesize 每页显示条数  不能为空
    async getUserList() {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)

      const {
        data: {
          users,
          total
        },
        meta: {
          msg,
          status
        }
      } = res.data
      if (status === 200) {
        this.userlist = users
        this.total = total
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }

    },
    // username 用户名称 不能为空
    // password 用户密码 不能为空
    // email    邮箱    可以为空
    // mobile   手机号   可以为空
    async addUser() {
      //关闭对话框
      this.dialogFormVisibleAdd = false;
      const res = await this.$http.post(`users`, this.form)
      console.log(res)
      const {
        data,
        meta: {
          msg,
          status
        }
      } = res.data
      if (status === 201) {
        this.$message.closeAll()
        //成功提示
        this.$message.success(msg)
        //重新获取userlist，更新视图
        this.getUserList()
        //清空对话框
        this.form = {}
      } else {
        this.$message.closeAll()
        //失败提示
        this.$message.warning(msg)
      }

    },
    // ### 1.3.5. 编辑用户提交

    // - 请求路径：users/:id
    // - 请求方法：put
    // - 请求参数
    //  id      用户 id  不能为空 
    //  email   邮箱     可以为空      ·
    //  mobile  手机号   可以为空     
    async editUser() {
      // 
      this.form = JSON.parse(JSON.stringify(this.editForm))
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      this.editForm = {}
      this.getUserList();
    },

    // 改变用户状态
    async changeMgState(user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
      } else {
        this.$message.warning(res.data.meta.msg)
        user.mg_state = !user.mg_state
      }
    },
    // ### 1.3.7. 分配用户角色

    // - 请求路径：users/:id/role
    // - 请求方法：put
    // - 请求参数

    // | 参数名 | 参数说明 | 备注                       |
    // | ------ | -------- | -------------------------- |
    // | id     | 用户 ID  | 不能为空`参数是url参数:id` |
    // | rid    | 角色 id  | 不能为空`参数body参数`     |
    async setUserRole() {
      const res = await this.$http.put(`users/${this.currentId}/role`, {
        rid: this.currentRid
      })
      const {
        data,
        meta: {
          msg,
          status
        }
      } = res.data
      if(status === 200) {
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
      this.dialogFormVisibleSetRole = false
    },
    //弹出删除用户弹窗
    showDeleteUserBox(userId) {
      this.$confirm('删除用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${userId}`)
        if (res.data.meta.status === 200) {
          // 回到第一页
          this.pagenum = 1
          // 刷新页面
          this.getUserList()
          // 提示成功
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          });
        }

      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '删除失败！'
        // });          
      });
    },
    //弹出 编辑用户 对话框
    showEditUserDialog(user) {
      this.editForm = JSON.parse(JSON.stringify(user))
      this.dialogFormVisibleEdit = true
    },
    //弹出 用户角色分配 对话框
    async showSetUserRoleDia(user) {
      // 获取当前用户名
      this.currentUsername = user.username
      // 获取用户角色id,rid
      const res1 = await this.$http.get(`users/${user.id}`)
      this.currentRid = res1.data.data.rid
      this.currentId = res1.data.data.id
      console.log(this.currentRid, this.currentId);
      // 获取角色列表
      const res2 = await this.$http.get('roles')
      this.roleList = res2.data.data
      // 显示对话框
      this.dialogFormVisibleSetRole = true
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.pagenum = val
      this.getUserList()
    },
    handleSearch(val) {
      this.getUserList()
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}

.inputSearch {
  width: 500px;
  padding: 10px;
}
</style>
