/*
 * @Author: lihuazheng
 * @Date: 2020-12-17 14:31:49
 * @LastEditTime: 2020-12-25 21:05:57
 * @FilePath: \dms-vue\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  * as echarts from 'echarts';
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

