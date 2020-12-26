<!--
 * @Author: lihuazheng
 * @Date: 2020-12-17 14:31:49
 * @LastEditTime: 2020-12-22 23:22:22
 * @FilePath: \dms-vue\src\App.vue
-->
<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide (){
     return {
       reload:this.reload
     }
  },
  data(){
    return {
       isRouterAlive:true
    }
  },
  methods:{
    reload (){
       this.isRouterAlive = false
       this.$nextTick(function(){
          this.isRouterAlive = true
       })
    }
  },
  components:{
  }
}
</script>