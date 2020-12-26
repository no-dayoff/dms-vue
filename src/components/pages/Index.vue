<!--
 * @Author: lihuazheng
 * @Date: 2020-12-21 16:50:17
 * @LastEditTime: 2020-12-25 19:11:57
 * @FilePath: \dms-vue\src\components\pages\Index.vue
-->
<template>
  <el-container>
  <el-aside width="200px">
    <side-bar></side-bar>
    </el-aside>
  <el-container>
    <el-header>
      <nav-bar></nav-bar>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import NavBar from '../component/NavBar.vue'
import SideBar from '../component/SideBar.vue'
export default {
  components: { SideBar, NavBar },
}
</script>

<style>
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