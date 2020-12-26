<!--
 * @Author: lihuazheng
 * @Date: 2020-12-26 18:20:07
 * @LastEditTime: 2020-12-26 18:54:25
 * @FilePath: \dms-vue\src\components\pages\DeviceBorrow\DeviceGetReturn.vue
-->
<template>
  <div>
    <h1>以下是已经归还的设备！</h1>
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
      prop="Dept"
      label="借用人部门"
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
      label="借用日期">
    </el-table-column>
    <el-table-column
      prop="State"
      label="状态">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import url from '../../../serviceAPI.config'
export default {
  created(){
    this.axiosGetAllBorrow();
   } ,
data() {
  return {
    tableBorrow: [],
  }
},
methods:{
  axiosGetAllBorrow(){
    axios({
      url:url.GetReturnAlready,
      method:'get',
    }).then(response=>{
      this.tableBorrow=response.data.message
    })
  }

}
}
</script>

<style>

</style>