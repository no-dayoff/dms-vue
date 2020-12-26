<!--
 * @Author: lihuazheng
 * @Date: 2020-12-21 17:27:17
 * @LastEditTime: 2020-12-26 18:50:50
 * @FilePath: \dms-vue\src\components\component\SideBar.vue
-->
<template>
<div class="sidebar">
   <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#BFCBD9"
      active-text-color="#409EFF"
      >
      <el-menu-item index="1" @click="goDefault">
        <i class="el-icon-s-home"></i>
        <span slot="title" >首页</span>
      </el-menu-item>
       <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-date"></i>
            <span>实验室课程安排</span>
            </template>
          <el-menu-item index="2-1" @click="goTimeTable">课程安排</el-menu-item>
          <el-menu-item index="2-2" @click="goLabAnalyse">实验室使用统计</el-menu-item>

        </el-submenu>
       
          <el-menu-item index="3" @click="goDeviceCheck">

          
            <i class="el-icon-files"></i>
            <span>实验设备管理</span>
          </el-menu-item>
            
                       
       
         <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-sell"></i>
            <span>实验设备借还</span>
            </template>
          <el-menu-item index="4-1" @click="goDeviceBorrow">借用审核</el-menu-item>
          <el-menu-item index="4-2" @click="goDeviceGetBorrow">已借出设备</el-menu-item>
          <el-menu-item index="4-3" @click="goDeviceGetReturn">已归还设备</el-menu-item>

        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-document-copy"></i>
            <span>设备使用统计</span>
            </template>
          <el-menu-item index="5-1" @click="goDeviceScrap">设备报废</el-menu-item>
          <el-menu-item index="5-2" @click="goDeviceMaintain">设备维修</el-menu-item>
          <el-menu-item index="5-3" @click="goDeviceApply">设备申请</el-menu-item>
          <el-menu-item index="5-4" @click="goNewDevice">新购入设备</el-menu-item>

        </el-submenu>
      <el-menu-item index="6" disabled>
        <i class="el-icon-setting"></i>
        <span slot="title">退出系统</span>
      </el-menu-item>
    </el-menu>
</div>
</template>

<script>
export default {
methods: {
      goto(){
        this.$router.push('/timetable')
      },
      goDefault(){
        this.$router.push('/index')
        
      },
      goTimeTable(){
        this.$router.push('/timetable')

      },
      goDeviceCheck(){
        this.$router.push('/devicecheck')

      },
      goNewDevice(){
        this.$router.push('/newdevice')
      },
      goLabAnalyse(){
        this.$router.push('/labanalyse')
      },
      goDeviceBorrow(){
        this.$router.push('/deviceborrow')

      },
      goDeviceGetBorrow(){
        this.$router.push('/devicegetborrow')
      },
      goDeviceGetReturn(){
        this.$router.push('/devicegetreturn')
      },
      goDeviceApply(){
        this.$router.push('/deviceapply')
      },
      goDeviceMaintain(){
        this.$router.push('/devicemaintain')
      },
      goDeviceScrap(){
        this.$router.push('/devicescrap')
      }
      
    }
  
}
</script>

<style>

.el-aside{
  background-color: #304156;
}
</style>