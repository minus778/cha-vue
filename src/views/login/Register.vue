<template>
  <div class="login container">
    <Header>
      <span>注册</span>
    </Header>
    <section>
      <div class="login-tel">
        <input
          type="text"
          v-model="userTel"
          placeholder="请输入手机号"
          pattern="[0-9]*"
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
          :disabled="disable"
          @click="getCode"
          :style="{ backgroundColor: mesCol }"
        >
          {{ codeMes }}
        </button>
      </div>
      <div class="login-tel">
        <input
          type="text"
          v-model="userPwd"
          placeholder="请设置密码"
          pattern="[0-9]*"
        />
      </div>
      <div class="login-btn" @click="register">注 册</div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "./Header";
import { saveUserRegister, getUserCode } from "@/network";
export default {
  data() {
    return {
      disable: false,
      userTel: "",
      userPwd: "",
      userCode: "",
      //验证规则
      rules: {
        //手机号验证
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: "手机号不能为空，并且是11位数字",
        },
        userPwd: {
          rule: /^\w{6,12}$/,
          msg: "密码不能为空，并且是6-12位",
        },
      },
      codeNum: 60,
      codeMes: "获取短信验证码",
      code: "",
      mesCol: "rgb(176,53,47)",
    };
  },
  components: {
    Header,
  },
  methods: {
    //点击获取短信验证码按钮
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
    //点击注册
    async register() {
      //验证密码
      if (!this.validate("userPwd")) return;

      //判断验证码是否正确
      if (this.code != this.userCode) {
        this.$toast("验证码不正确");
        return;
      }
      //如果正确，进行注册
      let data = {
        phone: this.userTel,
        pwd: this.userPwd,
      };
      let res = await saveUserRegister(data);
      this.$toast(res.msg);
      this.$router.push("/userLogin");
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
    margin-top: 0.4rem;
    input {
      width: 8.933333rem;
    }
  }
  .login-code {
    margin-top: 0.4rem;
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
}
</style>
