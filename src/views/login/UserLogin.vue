<template>
  <div class="login container">
    <Header></Header>
    <section>
      <div class="login-tel">
        <input
          type="text"
          placeholder="请输入手机号"
          pattern="[0-9]*"
          v-model="userTel"
        />
      </div>
      <div class="login-code">
        <input type="text" placeholder="请输入密码" v-model="userPwd" />
      </div>
      <div class="login-btn" @click="login">登 录</div>
      <div class="tab">
        <span @click="goLogin"
          ><i class="iconfont icon-shouji"></i>短信登录</span
        >
        <span @click="toSearchPwd"
          ><i class="iconfont icon-mima"></i>找回密码</span
        >
        <span @click="toRegister"
          ><i class="iconfont icon-shouji"></i>快速注册</span
        >
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "./Header";
import { getUserLogin } from "@/network";
import { mapMutations } from "vuex";
export default {
  name: "UserLogin",
  components: {
    Header,
  },
  data() {
    return {
      userTel: "",
      userPwd: "",
      //验证规则
      rules: {
        //手机号验证
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: "手机号不能为空，并且是11位数字",
        },
        //密码验证
        userPwd: {
          rule: /^\w{6,12}$/,
          msg: "密码不能为空，并且要求6,12位",
        },
      },
    };
  },
  methods: {
    ...mapMutations("user", ["saveUserInfo"]),
    toSearchPwd() {
      this.$router.push("/searchPwd");
    },
    toRegister() {
      this.$router.push("/register");
    },
    goLogin() {
      this.$router.push("/login");
    },
    async login() {
      //前端验证
      if (!this.validate("userTel")) return;
      if (!this.validate("userPwd")) return;
      //发送请求，后端验证
      let UserInfo = {
        userTel: this.userTel,
        userPwd: this.userPwd,
      };
      let res = await getUserLogin(UserInfo);
      this.$toast(res.msg);
      if (res.success) {
        //登录成功保存用户信息到仓库，跳转到my我的页面并展示用户信息
        this.$router.push("/my");
        this.saveUserInfo(res.data);
      } else {
        this.userPwd = "";
      }
    },
    //验证信息提示
    validate(key) {
      let bool = true;
      if (!this.rules[key].rule.test(this[key])) {
        //提示信息
        this.$toast(this.rules[key].msg);
        bool = false;
        return false;
      }
      return bool;
    },
  },
};
</script>

<style scoped lang='scss'>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  div {
    margin: 0.266666rem 0;
    width: 8.933333rem;
    height: 1.173333rem;
  }
  input {
    box-sizing: border-box;
    padding: 0 0.266666rem;
    line-height: 1.173333rem;
    background-color: #ffffff;
    border: 0.0267rem solid #ccc;
    border-radius: 0.16rem;
    font-size: 0.3733rem;
  }
  .login-tel {
    margin-top: 0.8rem;
    input {
      width: 8.933333rem;
    }
  }
  .login-code {
    display: flex;
    input {
      flex: 1;
    }
  }
  .login-btn {
    font-size: 0.5333rem;
    line-height: 1.1733rem;
    color: #fff;
    text-align: center;
    background-color: #b0352f;
    border-radius: 0.16rem;
  }
  .tab {
    display: flex;
    justify-content: space-between;
    font-size: 0.373333rem;
  }
}
</style>