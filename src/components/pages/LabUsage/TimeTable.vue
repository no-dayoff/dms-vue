<!--
 * @Author: lihuazheng
 * @Date: 2020-12-21 20:02:55
 * @LastEditTime: 2020-12-24 19:03:21
 * @FilePath: \dms-vue\src\components\pages\LabUsage\TimeTable.vue
-->
<template>
<div>
  <h1>实验室课程安排，请按照学期查询安排</h1>
   <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   <el-button type="primary" icon="el-icon-search" @click="axiosQueryTimetable">查询</el-button>

    <el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="Name"
      label="实验课程名"
      width="120">
    </el-table-column>
    <el-table-column
      property="Room"
      label="实验教室"
      width="120">
    </el-table-column>
    <el-table-column
      property="Term"
      label="学期安排">
    </el-table-column>
    <el-table-column
      property="Need"
      label="所需设备">
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="updateRow">编辑</el-button>
  </div>

  <el-dialog title="课程安排" :visible.sync="dialogFormVisible">
  <el-form :model="currentObj">
    <el-form-item label="实验名称" :label-width="formLabelWidth">
      <el-input v-model="currentObj.Name" autocomplete="off" :disabled="true"></el-input>
    </el-form-item>
   
     <el-form-item label="实验教室" :label-width="formLabelWidth">
      <el-select v-model="currentObj.Room">
        <el-option label="化学实验室" value="化学实验室"></el-option>
        <el-option label="物理实验室" value="物理实验室"></el-option>
        <el-option label="生物实验室" value="生物实验室"></el-option>
        <el-option label="科技实验室" value="科技实验室"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="学期安排" :label-width="formLabelWidth">
      <el-select v-model="currentObj.Term">
        <el-option label="2020年——秋季学期" value="2020年秋季学期"></el-option>
        <el-option label="2021年——春季学期" value="2021年春季学期"></el-option>
        <el-option label="2021年——秋季学期" value="2021年秋季学期"></el-option>
        <el-option label="2022年——春季学期" value="2022年春季学期"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="axiosTimetableUpdate">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import url from '../../../serviceAPI.config'
export default {
  data() {
    return {
      options: [{
          value: '2020年秋季学期',
          label: '2020年——秋季学期'
        }, {
          value: '2021年春季学期',
          label: '2021年——春季学期'
        }, {
          value: '2021年秋季学期',
          label: '2021年——秋季学期'
        }, {
          value: '2022年春季学期',
          label: '2022年——春季学期'
        }],
      value: '',
      tableData: [],
      dialogFormVisible: false, 
      currentObj:'',
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    }
  },
  methods:{
    axiosQueryTimetable(){
      // let params={Term:this.value}
      axios({
        url:url.queryTimetable,
        method:"post",
        data:{
          Term:this.value
        }
        
      }).then(response=>{
        this.tableData=response.data.message
      }).catch(error=>{
        console.log(error);
      })
    },
     updateRow() {
        this.currentObj=JSON.parse(JSON.stringify(this.currentRow))
        this.dialogFormVisible = true
  
  
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      axiosTimetableUpdate(){
      
        axios({
          url:url.updateTimetable,
          method:"post",
          data:{
            Name:this.currentObj.Name,
            Room:this.currentObj.Room,
            Term:this.currentObj.Term,
          }
        }).then(response=>{
          if(response.data.message.nModified==0){
              this.open3();
          }else{

          this.dialogFormVisible = false
          this.open2();
          this.axiosQueryTimetable();
          }
        })
      },
      open2() {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      },
      open3() {
        this.$message({
          message: '您还没有做任何修改',
          type: 'warning'
        });
      },
  }
}
</script>

<style>

</style>