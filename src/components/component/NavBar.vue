<!--
 * @Author: lihuazheng
 * @Date: 2020-12-21 17:53:00
 * @LastEditTime: 2020-12-25 16:13:03
 * @FilePath: \dms-vue\src\components\component\NavBar.vue
-->
<template>
  
<div class="navbar">
  <el-page-header @back="goBack" content="详情页面" >
</el-page-header>
 <el-menu class="el-menu-demo" mode="horizontal">
  <el-submenu index="1">
    <template slot="title" >用户</template>
    <el-menu-item index="1-1" @click="logout">退出登陆</el-menu-item>
  </el-submenu>
</el-menu>
<el-divider></el-divider>
</div>
</template>

<script>
export default {
  methods:{
    goBack(){
      this.$router.go(-1)
    }, 
    logout(){
      this.$router.push('/')
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
</style>