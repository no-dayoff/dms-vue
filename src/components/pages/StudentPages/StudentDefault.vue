<!--
 * @Author: lihuazheng
 * @Date: 2020-12-25 20:00:30
 * @LastEditTime: 2020-12-26 18:10:08
 * @FilePath: \dms-vue\src\components\pages\StudentPages\StudentDefault.vue
-->
<template>
  <div>
    <h1>你好！来自 {{$store.state.user.dept}} 的 {{$store.state.user.name}} 同学！，以下是申请使用设备的步骤，请仔细阅读！</h1>
    <el-steps :active="active" finish-status="success">
  <el-step title="申请借用设备"></el-step>
  <el-step title="等待管理员审核"></el-step>
  <el-step title="使用设备"></el-step>
  <el-step title="归还设备"></el-step>
</el-steps>

<el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>

<script>
import store from '../../../vuex/store'
export default {
store,
data() {
  return {
     active: 0
  }
},
 methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      }
    }
}
</script>

<style>

</style>