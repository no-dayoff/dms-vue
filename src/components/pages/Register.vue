<!--
 * @Author: lihuazheng
 * @Date: 2020-12-18 22:37:54
 * @LastEditTime: 2020-12-24 22:17:37
 * @FilePath: \dms-vue\src\components\pages\Register.vue
-->
<template>
  <el-container>
  
  <el-main>
<el-row>
<el-col :span="15" :offset="7">
  <h1>设备管理系统注册页面</h1>
    <div class="register-box">
      <el-form
        :rules="rules"
        label-width="100px"
        :model="ruleForm"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="账户名" prop="username">
          <el-input
            placeholder="请输入内容"
            v-model="ruleForm.username"
            clearable
            autofocus
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="ruleForm.password"
            show-password
          ></el-input>
        </el-form-item>

        <el-button
          type="primary"
          @click="registerAction"
          :loading="openLoading"
          class="botton-sub"
          >注册</el-button
        >
      </el-form>
    </div>
</el-col>
    </el-row>
  </el-main>
</el-container>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
export default {
  data() {
    return {
      openLoading: false, //是否开启用户的Loading
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名！", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 9 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码！", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 9 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    registerAction() {
      this.checkForm() && this.axiosRegisterUser();
    },
    axiosRegisterUser() {
      this.openLoading = true;
      axios({
        url: url.registerUser,
        method: "post",
        data: {
          userName: this.ruleForm.username,
          password: this.ruleForm.password
        }
      })
        .then(response => {
          //*如果返回code为200，代表注册成功，我们给用户作提示
          if (response.data.code == 200) {
            this.open2();
              this.$router.push('/')
            this.openLoading = false;
          } else {
            this.open4()
            this.openLoading = false;
          }
        })
        .catch(error => {
          this.open4()
          this.openLoading = false;
        });
    },
    checkForm() {
      let isOk = true;
      if (
        this.ruleForm.username.length < 3 || this.ruleForm.password.length < 3
      ) {
        isOk = false;
        this.open3();
      }else if (this.ruleForm.username.length > 9 || this.ruleForm.password.length > 9){
        isOk = false;
        this.open3();
      }
      return isOk;
    },
    open2() {
      this.$message({
        message: "注册成功",
        type: "success"
      });
    },

    open3() {
      this.$message({
        message: "请按照正确的格式填入数据",
        type: "warning"
      });
    },

    open4() {
      this.$message.error("注册失败,用户名 "+this.ruleForm.username+" 已经被注册");
    }
  }
};
</script>

<style scoped>

.el-main {
background: rgb(224,213,228);
background: radial-gradient(circle, rgba(224,213,228,1) 18%, rgba(148,170,233,1) 95%);
height: 100vh;
  margin: 0;
}
.botton-sub {
  margin-left: 170px;
  margin-top: 20px;
  width: 300px;
}
.el-input{
  width: 50%;
}
.el-form{
  margin-top: 70px;
}
h1{
  margin-left: 200px;

}

</style>
