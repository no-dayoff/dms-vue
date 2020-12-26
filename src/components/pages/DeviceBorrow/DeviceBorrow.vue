<!--
 * @Author: lihuazheng
 * @Date: 2020-12-24 23:01:43
 * @LastEditTime: 2020-12-26 17:35:01
 * @FilePath: \dms-vue\src\components\pages\DeviceBorrow\DeviceBorrow.vue
-->
<template>
  <div>
    <h1>您可以审核所有借用申请</h1>
    <el-table
    :data="tableBorrow"
    stripe
    style="width: 100%">
    <el-table-column
      prop="Borrower"
      label="申请人"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Dept"
      label="申请人部门"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Name"
      label="借用设备名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Num"
      label="借用数量">
    </el-table-column>
    <el-table-column
      prop="Date"
      label="申请日期">
    </el-table-column>
    <el-table-column
      prop="State"
      label="状态">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          @click="handlePass(scope.$index, scope.row)">通过</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleFail(scope.$index, scope.row)">拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import url from '../../../serviceAPI.config'
export default {
  created(){
    this.axiosGetAllBorrow()
  },
data() {
  return {
    tableBorrow: [],
    checkedDate:''
  }
},
methods:{
  axiosGetAllBorrow(){
      axios({
        url:url.GetAllBorrow,
        method:"get",
      }).then((response)=>{
        this.tableBorrow=response.data.message

      })
    },
    handlePass(index, row) {
      this.checkedDate = JSON.parse(JSON.stringify(row)).Date;
      this.axiosBorrowPass();
      },
      handleFail(index, row) {
      this.checkedDate = JSON.parse(JSON.stringify(row)).Date;
      this.axiosBorrowFail();
      },
      axiosBorrowPass(){
        axios({
          url:url.BorrowPass,
          method:'post',
          data:{
            Date:this.checkedDate
          }
        }).then((response)=>{
      
          this.axiosGetAllBorrow()
           this.$message({
          message: '操作成功，申请已通过',
          type: 'success'
        });
        })
      },
      axiosBorrowFail(){
        axios({
          url:url.BorrowFail,
          method:'post',
          data:{
            Date:this.checkedDate
          }
        }).then((response)=>{
          this.axiosGetAllBorrow()
          this.$message({
          message: '操作成功，申请已拒绝',
          type: 'success'
        });
        })
      }
      
}}
</script>

<style>

</style>