<template>
  <div class="login container">
    <Header>
      <span>找回密码</span>
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
      <div class="login-btn" @click="next">下一步</div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "@/views/login/Header.vue";
import { getUserCode, searchTel } from "@/network";
export default {
  data() {
    return {
      disable: false,
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
    //点击下一步
    async next() {
      //验证
      if (!this.validate("userTel")) return;
      //如果验证码不正确
      if (this.code != this.userCode) {
        this.$toast("验证码不对");
        return;
      }
      let data = {
        phone: this.userTel,
      };
      //告诉后端，用户输入的手机号，存在吗？
      let res = await searchTel(data);
      this.$toast(res.msg);
      //验证成功
      if (res.code === 200) {
        this.$router.push({
          name: "reinputPwd",
          query: {
            phone: this.userTel,
          },
        });
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
}
</style>
