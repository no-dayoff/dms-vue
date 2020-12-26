<!--
 * @Author: lihuazheng
 * @Date: 2020-12-25 19:22:31
 * @LastEditTime: 2020-12-26 14:53:05
 * @FilePath: \dms-vue\src\components\pages\StudentPages\StudentReturn.vue
-->
<template>
  <div>
    <h1>这是您已经借用的设备,请注意归还日期！</h1>
    <el-table :data="tableBorrow" stripe style="width: 100%">
      <el-table-column prop="Borrower" label="借用人" width="180">
      </el-table-column>
      <el-table-column prop="Name" label="借用设备名" width="180">
      </el-table-column>
      <el-table-column prop="Num" label="借用数量"> </el-table-column>
      <el-table-column prop="Date" label="申请日期"> </el-table-column>
      <el-table-column prop="State" label="状态"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleReturn(scope.$index, scope.row)"
            >归还</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import store from "../../../vuex/store";
import axios from "axios";
import url from "../../../serviceAPI.config";
export default {
  store,
  created() {
    this.axiosStudentCheckReturn();
  },
  data() {
    return {
      tableBorrow: [],
      ReturnDate:''
    };
  },
  methods: {
    handleReturn(index, row) {
      this.ReturnDate = JSON.parse(JSON.stringify(row)).Date;
      this.axiosStudentReturn();
    },
  axiosStudentCheckReturn() {
    axios({
      url: url.StudentCheckReturn,
      method: "post",
      data: {
        Borrower: this.$store.state.user.name
      }
    })
      .then(response => {
        this.tableBorrow=response.data.message
      })
      .catch(error => {
        console.log(error);
      });
  },
  axiosStudentReturn(){
    axios({
      url:url.StudentReturn,
      method:"post",
      data:{
        Date:this.ReturnDate
      }
    }).then(response=>{
       this.$message({
          message: '归还成功',
          type: 'success'
        });
        this.axiosStudentCheckReturn();
    }).catch(error=>{
      console.log(error)
    })
  }
  },
};
</script>

<style></style>
