<!--
 * @Author: lihuazheng
 * @Date: 2020-12-25 17:34:47
 * @LastEditTime: 2020-12-26 18:55:24
 * @FilePath: \dms-vue\src\components\pages\StudentIndex.vue
-->
<template>
  <el-container>
  <el-aside width="200px">
    
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
       
       
          <el-menu-item index="2" @click="goBorrow">

          
            <i class="el-icon-sold-out"></i>
            <span>实验设备借用</span>
          </el-menu-item>
          <el-menu-item index="3" @click="goReturn">

          
            <i class="el-icon-sell"></i>
            <span>实验设备归还</span>
          </el-menu-item>
            
                       
  
      <el-menu-item index="4" disabled>
        <i class="el-icon-setting"></i>
        <span slot="title">退出系统</span>
      </el-menu-item>
    </el-menu>
</div>
  
    </el-aside>
  <el-container>
    <el-header>
      
        <div class="navbar">
  <el-page-header @back="goBack" content="详情页面" >
</el-page-header>
 <el-menu class="el-menu-demo" mode="horizontal">
  <el-submenu index="1">
    <template slot="title" >{{$store.state.user.name}}</template>
    <el-menu-item index="1-1" @click="logout">退出登陆</el-menu-item>
  </el-submenu>
</el-menu>
<el-divider></el-divider>
</div>
    
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>import store from '../../vuex/store'
export default {
  store,
  created(){
    this.goDefault();
  },
methods:{
  goBack(){
      this.$router.go(-1)
    }, 
    logout(){
      this.$router.push('/')
    },
    goBorrow(){
      this.$router.push('/studentborrow')
    },
    goReturn(){
      this.$router.push('/studentreturn')

    },
    goDefault(){
      this.$router.push('/studentdefault')

    }
}
}
</script>

<style>
.el-header{
  background-color: rgb(255, 255, 255);
}
.el-menu-demo{
  margin-left: 1200px ;
}
.el-page-header{
 position: absolute;
 top:20px
}
.el-divider{
  margin-top: 0px;
}
.el-aside{
  background-color: #304156;
}
html{
  font-family:"PingFang SC", "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 18px;
}
.el-main{
  height: 92vh;
}
body{
  margin: 0;
}
</style>