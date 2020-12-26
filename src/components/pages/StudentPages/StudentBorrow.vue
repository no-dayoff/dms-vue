<!--
 * @Author: lihuazheng
 * @Date: 2020-12-25 19:22:13
 * @LastEditTime: 2020-12-26 19:52:08
 * @FilePath: \dms-vue\src\components\pages\StudentPages\StudentBorrow.vue
-->
<template>
  <div>
    <h1>您可以搜索您想要借用的设备，并选择借用数量进行申请！</h1>

    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
    <el-input-number v-model="num" :min="1" :max="10"></el-input-number>
    <el-button
      size="medium"
      type="warning"
      plain
      @click="handleSub"
      >借用</el-button
    >
    <h1>以下是您的申请记录</h1>
     <el-table
    :data="tableBorrow"
    stripe
    style="width: 100%">
    <el-table-column
      prop="Borrower"
      label="借用人"
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
  </el-table>

  </div>
</template>

<script>
import store from "../../../vuex/store";
import axios from "axios";
import url from "../../../serviceAPI.config";
export default {
  store,
  data() {
    return {
      msg: [],
      tableData: [],
      restaurants: [],
      state: "",
      timeout: null,
      subitem:'',
      num: 1,
      tableBorrow:[],
    };
  },
  created() {
    this.checkAxios();
    this.axiosStudentBorrowCheck();
  },
  methods: {
    checkAxios() {
      axios({
        url: url.getDeviceCheck,
        method: "get"
      })
        .then(response => {
         
          this.msg = response.data.message;
          //把msg里所有对象的name属性名改为value
          this.tableData = JSON.parse(
            JSON.stringify(this.msg).replace(/Name/g, "value")
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.tableData;

      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      //加载动画
      // clearTimeout(this.timeout);
      // this.timeout = setTimeout(() => {
        cb(results);
      // }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.subitem=item
    },
    handleSub(){
     
      this.axiosStudentBorrow();
    },
    parseDate(rawDate){
      let hours;
      let day;
      let month;
      let minutes;
      let seconds;

      if (rawDate.getHours().toString().length === 1) {
        hours = `0${rawDate.getHours()}`;
      } else {
        hours = `${rawDate.getHours()}`;
      }

      if (rawDate.getDate().toString().length === 1) {
        day = `0${rawDate.getDate()}`;
      } else {
        day = `${rawDate.getDate()}`;
      }

      if (rawDate.getMonth().toString().length === 1) {
        month = `0${rawDate.getMonth() + 1}`;
      } else {
        month = `${rawDate.getMonth() + 1}`;
      }
      if (rawDate.getMinutes().toString().length === 1) {
        minutes = `0${rawDate.getMinutes()+ 1}`;
      } else {
        minutes = `${rawDate.getMinutes() + 1}`;
      }
      if (rawDate.getSeconds().toString().length === 1) {
        seconds = `0${rawDate.getSeconds()+ 1}`;
      } else {
        seconds = `${rawDate.getSeconds() + 1}`;
      }
	return `${rawDate.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}` ;
},
    axiosStudentBorrow(){
      axios({
        url:url.studentBorrow,
        method:'post',
        data:{
          Name:this.subitem.value,
          Borrower:this.$store.state.user.name,
          Dept:this.$store.state.user.dept,
          Date:this.parseDate(new Date()),
          Num:this.num,
        }
      }).then(response=>{
        if(response.data.code==200){
          this.axiosStudentBorrowCheck();
           this.$message({
          message: '申请成功',
          type: 'success'
          });
          setTimeout(()=>{
            
            this.$notify({
          title: '温馨提示',
          message: '您的申请需要等待管理员审核',
          type: 'success'
        });
          },2000)
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    axiosStudentBorrowCheck(){
      axios({
        url:url.StudentBorrowCheck,
        method:"post",
        data:{
          Borrower:this.$store.state.user.name
        }
      }).then((response)=>{
        this.tableBorrow=response.data.message

      })
    }
  
  }
};
</script>

<style></style>