<!--
 * @Author: lihuazheng
 * @Date: 2020-12-18 22:37:54
 * @LastEditTime: 2020-12-25 21:46:37
 * @FilePath: \dms-vue\src\components\pages\Login.vue
-->
<template>
  <div class="login-main">
    <particles class="particles"></particles>
    <div class="register-box">
      <el-form
        label-width="100px"
      >
        <el-form-item label="账户名" prop="username">
          <el-input
            placeholder="请输入内容"
            v-model="username"
            clearable
            autofocus
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="学生身份">
        <el-checkbox  v-model="checked"> </el-checkbox>
        </el-form-item>
        <el-button
          type="primary"
          @click="loginAction"
          :loading="openLoading"
          class="botton-sub"
          >登陆</el-button
        >
        <el-button
          type="primary"
          @click="goRegister"
          class="botton-reg"
          >注册</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import particlesJS from "../component/Particles"
import store from '../../vuex/store'
export default {
  store,
  data() {
    return {
      username: "",
      password: "",
      openLoading: false, //是否开启用户的Loading
      checked: false
    };
  },
  components:{
    particles:particlesJS
  },
  // created(){
  //   if(localStorage.userInfo){
  //           Toast.success('您已经登录')
  //            this.$router.push('/')
  //   }
  //   },
  methods: {
    goRegister(){
      this.$router.push('/studentregister')
    },
    loginAction() {
      if(!this.checked){
        this.checkForm() && this.axiosLoginUser();
        
      }else{
        
        this.checkForm() && this.axiosLoginStudent();
        
      }

    },
    axiosLoginUser() {
      this.openLoading = true;
      axios({
        url: url.loginUser,
        method: "post",
        data: {
          userName: this.username,
          password: this.password,
        },
      })
        .then((response) => {
          if (response.data.code == 200 && response.data.message) {
            new Promise((resolve, reject) => {
              // localStorage.userInfo = { userName: this.username };
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                this.open2();
                this.$router.push("/index");
              })
              .catch((err) => {
                this.open3();
                console.log(err);
              });
          } else {
            this.open4();
            this.openLoading = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.open4();
          this.openLoading = false;
        });
    },
    axiosLoginStudent(){
        this.openLoading = true;
      axios({
        url: url.loginStudent,
        method: "post",
        data: {
          userName: this.username,
          password: this.password,
        },
      })
        .then((response) => {
          if (response.data.code == 200 ) {
                let name=response.data.message.name
                let dept=response.data.message.dept
                let user={name:name,dept:dept}
                this.$store.dispatch('saveUserInfo',user);
                this.open2();
                this.$router.push("/studentindex");
              
              
          } else {
            this.open4();
            this.openLoading = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.open4();
          this.openLoading = false;
        });
    },
   checkForm() {
      let isOk = true;
      if (
        this.username.length < 3 || this.password.length < 3
      ) {
        isOk = false;
        this.open3();
      }else if (this.username.length > 9 || this.password.length > 9){
        isOk = false;
        this.open3();
      }
      return isOk;
    },
    open2() {
      this.$message({
        message: "登陆成功",
        type: "success"
      });
    },

    open3() {
      this.$message({
        message: "用户名或者密码格式不对",
        type: "warning"
      });
    },

    open4() {
      this.$message.error("登陆失败，请检查账号名与密码是否正确");
    }
  
  },
};
</script>

<style scoped>
.particles{
  width: 100%;
  height: 100%;
}
.register-box {
  height: 300px;
  width:400px;
  background :#fff;
  opacity:0.9;
  padding: 2em;
  border:#ccc 2px solid;
  position: absolute;
  top: 32vh;
  left : 36vw;
}
.el-button{
position: absolute;
left:120px;
width:220px;
margin-top: 8px;
background-color: #508ec7;
}
.el-input{
  width: 70%;
}
.botton-reg{
  margin-top: 70px;
  margin-left:0px ;
}
</style>
