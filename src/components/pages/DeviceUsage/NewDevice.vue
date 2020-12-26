<!--
 * @Author: lihuazheng
 * @Date: 2020-12-23 14:39:01
 * @LastEditTime: 2020-12-26 20:23:46
 * @FilePath: \dms-vue\src\components\pages\DeviceUsage\NewDevice.vue
-->
<template>
<div>
  <h1>新购入设备登记</h1>
  <el-form ref="form" :model="form" label-width="80px" style="width: 24%;">
  <el-form-item label="设备编号" prop="Did">
    <el-input v-model="form.Did"></el-input>
  </el-form-item>
  <el-form-item label="设备名称" prop="Name">
    <el-input v-model="form.Name"></el-input>
  </el-form-item>
    <el-form-item label="设备类型" prop="Dtype">
   <el-select v-model="form.Dtype" placeholder="请选择">
        <el-option label="实验仪器" value="实验仪器"></el-option>
        <el-option label="桌椅类" value="桌椅类"></el-option>
        <el-option label="消防设备" value="消防设备"></el-option>
        <el-option label="储物类" value="储物类"></el-option>
        <el-option label="电子设备" value="电子设备"></el-option>
      </el-select>
  </el-form-item>

    <el-form-item label="购买日期" prop="BuyDate">
  <el-date-picker
      v-model="form.BuyDate"
      align="right"
      type="date"
      placeholder="选择日期"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions">
    </el-date-picker>
  </el-form-item>
    <el-form-item label="供应商" prop="Supplier">
    <el-input v-model="form.Supplier"></el-input>
  </el-form-item>
    <el-form-item label="价格" prop="Price">
    <el-input v-model="form.Price"></el-input>
  </el-form-item>
    <el-button type="primary" @click="onSubmit">登记</el-button>
    <el-button @click="resetForm('form')">重置</el-button>
</el-form>
</div>
</template>

<script>
import axios from 'axios'
import url from '../../../serviceAPI.config'
export default {
data() {
  return {
        form: {
          Did:'',
          Name: '',
          Dtype: '',
          BuyDate: '',
          Supplier: '',
          Price: '',
        
      },
      noticeId:'',
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
    
  }
},
methods:{
  onSubmit(){
    if (this.form.Did.length < 1){
      this.open3();
      return false
    }
    
    axios({
      url:url.insertNewDevice,
      method:'post',
      data:{
        Did:this.form.Did,
        Name:this.form.Name,
        Dtype:this.form.Dtype,
        BuyDate:this.form.BuyDate,
        Supplier:this.form.Supplier,
        Price:this.form.Price
      }
    }).then(response=>{
      console.log(response)
      this.noticeId=response.data.message.Did
      if(response.data.code==200){
        // 成功的提示
          this.open2();
          this.resetForm('form');
          setTimeout(()=>{
          this.noticeOpen1();
          },1000)
      }else if(response.data.code==500){
        this.open4();
      }
    }).catch(error=>{
      console.log(error)
    })

  },
  resetForm(formName) {
        this.$refs[formName].resetFields();
      },
   open2() {
        this.$message({
          message: '设备编号为[  '+this.noticeId+'  ]的新设备登记成功,',
          type: 'success'
        });
      },

      open3() {
        this.$message({
          message: '设备编号不能为空！！',
          type: 'warning'
        });
      },

      open4() {
        this.$message.error('登记失败，此已经被登记');
      },
      noticeOpen1() {
        this.$notify({
          title: '提示',
          message: '您可以在“实验设备管理”中查看到您新登记的设备',
          type: 'success'
        });
      },
}

}
</script>

<style>

</style>