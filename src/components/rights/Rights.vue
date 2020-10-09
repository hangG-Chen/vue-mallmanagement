<!--
 * @Author: your name
 * @Date: 2020-07-28 10:54:07
 * @LastEditTime: 2020-07-31 14:04:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backstage\src\components\rights\rights.vue
--> 
<template>
<el-card class="box-card">
  <!-- 面包屑 -->
  <my-bread level1='权限管理' level2='权限列表'></my-bread>
  <el-table 
  :data="rightList" 
  style="width: 100%" 
  height="600px"
  >
    <el-table-column type="index" label="#" width="100">
    </el-table-column>
    <el-table-column prop="id" label="ID" width="180">
    </el-table-column>
    <el-table-column prop="authName" label="权限说明" width="180">
    </el-table-column>
    <el-table-column prop="path" label="路径" width="180">
    </el-table-column>
    <el-table-column label="权限层级" width="180">
      <template slot-scope="scope">
        <span v-if='scope.row.level==0'>一级</span>
        <span v-if='scope.row.level==1'>二级</span>
        <span v-if='scope.row.level==2'>三级</span>
      </template>
    </el-table-column>
  </el-table>
</el-card>
</template>

<script>
export default {
  name: 'Rights',
  data() {
    return {
      rightList: []
    }
  },
  created() {
    this.getRightList('list')
  },
  filters: {
    
  },
  methods: {

    //   所有权限列表

    // - 请求路径：rights/:type
    // - 请求方法：get
    // - 请求参数

    // | 参数名    | 参数说明  | 备注                                                         |
    // | ------   | -------- | ------------------------------------------------------------ |
    // | type     | 类型     | 值 list 或 tree , list 列表显示权限, tree 树状显示权限,`参数是url参数:type` |

    // - 响应参数

    // | 参数名    | 参数说明    
    // | id       | 权限 ID      
    // | authName | 权限说明    
    // | level    | 权限层级    
    // | pid      | 权限父 ID   
    // | path     | 对应访问路径 
    async getRightList(type) {
     
      const res = await this.$http.get(`rights/${type}`)
      const {
        data,
        meta: {
          msg,
          status
        }
      } = res.data
      console.log(data,msg,status);
      if( status === 200 ){
        this.rightList = data
        this.$message.success(msg)
        console.log(this.rightList)
      }
      
    }
  }
}
</script>

<style scoped>

</style>
