/*
 * @Author: lihuazheng
 * @Date: 2020-12-25 20:44:55
 * @LastEditTime: 2020-12-25 21:34:37
 * @FilePath: \dms-vue\src\vuex\store.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
// const state={
//   count:1
// },


 const state={
    user:""
  }

  const mutations={
  USER_INFO(state,info){
    state.user = info
  }
}
const actions={
  saveUserInfo({ commit },data){
    commit('USER_INFO',data)
 }
}

export default new Vuex.Store({
  state,mutations,actions

})