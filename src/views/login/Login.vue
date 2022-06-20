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
        <input
          type="text"
          placeholder="请输入短信验证码"
          pattern="[0-9]*"
          v-model="userCode"
        />
        <button
          @click="getCode"
          :disabled="disable"
          :style="{ backgroundColor: mesCol }"
        >
          <span>{{ codeMes }}</span>
        </button>
      </div>
      <div class="login-btn" @click="login">登 录</div>
      <div class="tab">
        <span @click="goUserLogin"
          ><i class="iconfont icon-mima"></i>密码登录</span
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
import { getUserCode, saveUserInfo } from "@/network";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  components: {
    Header,
  },
  data() {
    return {
      userTel: "",
      userCode: "",
      //验证规则
      rules: {
        //手机号验证
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: "手机号不能为空，并且是11位数字",
        },
      },
      codeMes: "获取短信验证码",
      disable: false,
      codeNum: 60,
      mesCol: "rgb(176,53,47)",
      //保存后端返回的验证码
      code: "",
    };
  },
  methods: {
    ...mapMutations("user", ["saveUserInfo"]),
    toRegister() {
      this.$router.push("/register");
    },
    goUserLogin() {
      this.$router.push("/userLogin");
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
    //点击验证码按钮
    async getCode() {
      //验证
      if (!this.validate("userTel")) return;

      //发请求
      let data = {
        phone: this.userTel,
      };
      let res = await getUserCode(data);
      //保存后端返回的验证码
      this.code = res.data.data;

      this.disable = true;
      this.codeMes = this.codeNum + "s后重新发送";
      this.mesCol = "gray";
      let timer = setInterval(() => {
        this.codeNum--;
        this.codeMes = this.codeNum + "s后重新发送";
        if (this.codeNum === 0) {
          this.codeMes = "获取短信验证码";
          this.codeNum = 60;
          this.mesCol = "rgb(176,53,47)";
          this.disable = false;
          clearInterval(timer);
        }
      }, 1000);
    },
    //用户点击登录
    async login() {
      //验证后端返回的验证码和用户输入的验证码是否一致
      if (this.code === parseInt(this.userCode)) {
        //登录/注册一体化成功后将用户数据存入数据库
        let data = {
          phone: this.userTel,
        };
        let res = await saveUserInfo(data);
        this.$toast(res.msg);
        this.saveUserInfo(res.data);
        this.$router.push("/my");
      } else {
        this.$toast("输入的验证码错误");
        this.userCode = "";
      }
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
      width: 70%;
    }
    button {
      white-space: nowrap;
      padding: 0 0.433333rem;
      line-height: 1.173333rem;
      color: #fff;
      background-color: #b0352f;
      border: 0;
      border-radius: 0.16rem;
      font-size: 0.3733rem;
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
