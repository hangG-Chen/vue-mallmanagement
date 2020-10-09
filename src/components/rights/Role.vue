<!--
 * @Author: your name
 * @Date: 2020-07-29 15:23:18
 * @LastEditTime: 2020-08-21 15:35:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backstage\src\components\rights\RoleRight.vue
--> 
<template>
<div>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread level1='权限管理' level2='角色列表'></my-bread>
    <el-row class="createRoleBtn">
      <el-col>
        <el-button type="info" @click="showCreateRoleDia">创建角色</el-button>
      </el-col>
    </el-row>
    <el-table :data="roleList" style="width: 100%" height="600px">
      <el-table-column type="expand" width="100">
        <template slot-scope="scope">
          <el-row v-for="item1 in scope.row.children" :key='item1.id' class="roleTree">
            <el-col :span='4'>
              <el-tag @close="delRight(scope.row, item1.id)" closable>{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span='20'>
              <el-row v-for="item2 in item1.children" :key="item2.id">
                <el-col :span="6">
                  <el-tag @close="delRight(scope.row, item2.id)" closable type='success'>
                    {{item2.authName}}
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="18">
                  <el-tag @close="delRight(scope.row, item3.id)" v-for="item3 in item2.children" :key="item3.id" closable type='warning'>
                    {{item3.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div v-if="scope.row.children.length === 0" class="noRightWrap">无权限</div>
        </template>

      </el-table-column>
      <el-table-column type="index" label="#" width="100">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <!-- 编辑角色信息 -->
          <el-button plain size="mini" type="primary" icon="el-icon-edit" circle @click="showEditRoleDia(scope.row)"></el-button>
          <!-- 删除角色 -->
          <el-button plain size="mini" type="danger" icon="el-icon-delete" circle @click="showDeleteRoleBox(scope.row)"></el-button>
          
          <!-- 修改角色权限 -->
          <el-button plain size="mini" type="success" icon="el-icon-check" circle @click="showEditRightDialog(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-card>
  <!-- 角色权限对话框 -->
  <el-dialog title="角色权限" :visible.sync="dialogVisibleEditRight">
    <div class="tree-container">
      <el-tree :data="rightsList" show-checkbox node-key="id" :default-expanded-keys="rightExpand" :default-checked-keys="rightCheck" :props="defaultProps" ref='roleTree'>
      </el-tree>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleEditRight = false">取 消</el-button>
      <el-button type="primary" @click="setRoleRight()">确 定</el-button>
    </div>
  </el-dialog>

  <!-- 创建角色对话框 -->
  <el-dialog title="创建角色" :visible.sync="dialogVisibleCreateRole">
    <el-form :model="formData">
      <el-form-item label="角色名称" label-width="180px">
        <el-input v-model="formData.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width='180px'>
        <el-input type="textarea" placeholder="请输入角色描述" v-model="formData.roleDesc">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisibleCreateRole = false">取 消</el-button>
      <el-button type="primary" @click="createRole()">确 定</el-button>
    </div>
  </el-dialog>

  <!-- 编辑角色对话框 -->
  <el-dialog title="编辑角色信息" :visible.sync="dialogVisibleEditRole">
    <el-form :model="formData2">
      <el-form-item label="角色名称" label-width="180px">
        <el-input v-model="formData2.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width='180px'>
        <el-input placeholder="请输入角色描述" v-model="formData2.roleDesc">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisibleEditRole = false">取 消</el-button>
      <el-button type="primary" @click="editRole()">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'Role',
  data() {
    return {
      roleList: [],
      rightsList: {},
      // 编辑角色权限 相关数据
      dialogVisibleEditRight: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rightExpand: [],
      rightCheck: [],
      currentRoleId: -1,
      // 添加角色 相关数据
      dialogVisibleCreateRole: false,
      formData: {
        roleName: '',
        roleDesc: ''
      },
      // 修改角色 相关数据
      dialogVisibleEditRole: false,
      formData2: {
        roleName: '',
        roleDesc: ''
      },
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    //  角色授权

    //  请求路径：roles/:roleId/rights
    //  请求方法：post
    //  请求参数：通过 `请求体` 发送给后端
    // | 参数名   | 参数说明             | 备注                                                         |
    // | ------- | -------------------| ------------------------------------------------------------ |
    // | :roleId | 角色 ID             | 不能为空`携带在url中`                                        |
    // | rids    | 权限 ID [列表字符串]  | 以 `,` 分割的权限 ID 列表（获取所有被选中、叶子节点的key和半选中节点的key, 包括 1，2，3级节点） |
    async setRoleRight() {
      // 获取对应选中和半选中节点的key并拼接
      let arr1 = this.$refs.roleTree.getCheckedKeys()
      let arr2 = this.$refs.roleTree.getHalfCheckedKeys()
      let arr = [...arr1, ...arr2]
      const res = await this.$http.post(`roles/${this.currentRoleId}/rights`, {
        rids: arr.join(',')
      })

      const {
        msg,
        status
      } = res.data.meta
      if (status === 200) {
        this.getRoleList()
        this.$message.closeAll()
        this.$message.success(msg)
        this.dialogVisibleEditRight = false
      }

    },
    // 获取角色列表
    async getRoleList() {
      const res = await this.$http.get(`roles`)
      const {
        data,
        meta: {
          msg,
          status
        }
      } = res.data
      if (status === 200) {
        this.roleList = data
      }
    },
    //   删除角色指定权限

    // - 请求路径：roles/:roleId/rights/:rightId

    // - 请求方法：delete

    // - 请求参数

    //   | 参数名   | 参数说明 | 备注                  |
    //   | -------- | -------- | --------------------- |
    //   | :roleId  | 角色 ID  | 不能为空`携带在url中` |
    //   | :rightId | 权限 ID  | 不能为空`携带在url中` |

    // - 响应数据说明 

    //   - 返回的data, 是当前角色下最新的权限数据
    async delRight(role, rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      const {
        data,
        meta: {
          msg,
          status
        }
      } = res.data
      if (status === 200) {
        this.$message.closeAll()
        this.$message.success(msg)
        role.children = data;
      } else {
        this.$message.closeAll()
        this.$message.warning(msg)
      }
    },
    // 编辑角色权限对话框
    async showEditRightDialog(role) {
      const res = await this.$http.get(`rights/tree`)
      this.currentRoleId = role.id
      const {
        data,
        meta: {
          msg,
          status
        }
      } = res.data
      if (status === 200) {
        this.rightsList = data
        this.$message.closeAll()
        this.$message.success(msg)
      }
      // 展开权限与选择权限
      var arrTemp1 = []
      var arrTemp2 = []
      // 展开所有权限
      this.rightsList.forEach(item1 => {
        arrTemp1.push(item1.id)
        item1.children.forEach(item2 => {
          arrTemp1.push(item2.id)
        });
      });
      this.rightExpand = arrTemp1
      // 选择当前已有权限
      role.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            arrTemp2.push(item3.id)
          });
        });
      });
      this.rightCheck = arrTemp2
      this.dialogVisibleEditRight = true
    },
    // 删除角色弹出框
    //     ### 1.5.5. 删除角色

    // - 请求路径：roles/:id
    // - 请求方法：delete
    // - 请求参数

    // | 参数名 | 参数说明   | 备注                |
    // | ------ | --------| ------------------ |
    // | :id    | 角色 ID  | 不能为空`携带在url中` |
    showDeleteRoleBox(role) {
      this.$confirm(`即将删除 ${role.roleName} ，是否继续？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`roles/${role.id}`)
        const {
          data,
          meta: {
            msg,
            status
          }
        } = res.data
        if (status === 200) {
          this.getRoleList();
          this.$message.success(msg)
        } else {
          this.$message.warning(msg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //   1.5.2. 创建角色

    // - 请求路径：roles
    // - 请求方法：post
    // - 请求参数

    // | 参数名   | 参数说明 | 备注     |
    // | -------- | -------- | -------- |
    // | roleName | 角色名称 | 不能为空 |
    // | roleDesc | 角色描述 | 可以为空 |

    // - 响应参数

    // | 参数名   | 参数说明 | 备注 |
    // | -------- | -------- | ---- |
    // | roleId   | 角色 ID  |      |
    // | roleName | 角色名称 |      |
    // | roleDesc | 角色描述 |      |
    async createRole() {
      const res = await this.$http.post(`roles`, {
        roleName: this.formData.roleName,
        roleDesc: this.formData.roleDesc
      })
      const {
        meta: {
          msg,
          status
        }
      } = res.data
      if (status === 201) {
        this.formData.roleName = this.formData.roleDesc = ''
        this.getRoleList();
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    },
    showCreateRoleDia() {
      this.dialogVisibleCreateRole = true
    },
    //   1.5.4. 编辑提交角色

    // - 请求路径：roles/:id
    // - 请求方法：put
    // - 请求参数

    // | 参数名   | 参数说明 | 备注                  |
    // | -------- | -------- | --------------------- |
    // | :id      | 角色 ID  | 不能为空`携带在url中` |
    // | roleName | 角色名称 | 不能为空              |
    // | roleDesc | 角色描述 | 可以为空              |
    async editRole() {
      const res = await this.$http.put(`roles/${this.currentRoleId}}`,{
        roleName: this.formData2.roleName,
        roleDesc: this.formData2.roleDesc,
      })
      const {
        meta: {
          msg,
          status
        }
      } = res.data
      if (status === 200) {
        this.formData2.roleName = this.formData2.roleDesc = '' 
        this.getRoleList();
        this.$message.success(msg)
        this.dialogVisibleEditRole = false
      } else {
        this.$message.warning(msg)
      }
    },
    showEditRoleDia(role) {
      this.currentRoleId = role.id
      this.formData2.roleName = role.roleName
      this.formData2.roleDesc = role.roleDesc
      this.dialogVisibleEditRole = true
    }
  }
}
</script>

<style scoped>
.createRoleBtn {
  margin-top: 20px;
}

.roleTree {
  margin: 5px;
}

/* 无权限显示内容的样式 */
.noRightWrap {
  text-align: center;
}

.tree-container {
  max-height: 500px;
  overflow-x: scroll;
}
</style>
