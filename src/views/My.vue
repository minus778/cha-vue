<template>
  <div class="my container">
    <header>
      <div class="user-info" v-if="loginStatus">
        <img :src="userInfo.imgUrl" alt="" />
        <span>{{ userInfo.nickName }}</span>
      </div>
      <div class="login" @click="goLogin" v-else>登录/注册</div>
    </header>
    <section>
      <div class="info" v-if="loginStatus">
        <div class="item">
          <p>个人中心</p>
          <div class="info-mes" @click="$router.push('/address')">
            <i class="iconfont icon-shouye left-one"></i>
            <div class="right">
              <span>地址管理</span>
              <i class="iconfont icon-arrow-right"></i>
            </div>
          </div>
        </div>
        <div class="item">
          <p>状态管理</p>
          <div class="info-mes" @click="loginout">
            <i class="iconfont icon-tuichu left-two"></i>
            <div class="right">
              <span>退出登录</span>
              <i class="iconfont icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "My",
  methods: {
    ...mapMutations("user", ["loginOut"]),
    goLogin() {
      this.$router.push("/login");
    },
    loginout() {
      this.loginOut();
    },
  },
  computed: {
    ...mapState("user", ["userInfo", "loginStatus"]),
  },
};
</script>
<style scoped lang='scss'>
.my {
  background-color: #efefef;
}
header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.266666rem;
  background-image: url("~@/assets/images/bg.jpg");
  .login {
    padding: 0.16rem 0.4rem;
    font-size: 0.426666rem;
    color: #fff;
    background-color: #f6ab32;
    border-radius: 0.16rem;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 1.76rem;
      height: 1.76rem;
      border-radius: 50%;
    }
    span {
      padding: 0.533333rem 0;
      font-size: 0.48rem;
      color: #fff;
    }
  }
}
section {
  flex: 1;
  overflow: hidden;
  .info {
    .item {
      background-color: white;
      margin-bottom: 0.2667rem;
      p {
        padding: 0.2667rem;
        font-size: 0.3733rem;
        color: gray;
        border-bottom: 0.0267rem solid #efefef;
      }
      .info-mes {
        padding: 0 0.2667rem;
        display: flex;
        align-items: center;
        .left-one {
          font-size: 0.5333rem;
          color: red;
        }
        .left-two {
          font-size: 0.5333rem;
          color: green;
        }
        .right {
          flex: 1;
          padding: 0.2667rem 0 0.2667rem 0.2667rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.3733rem;
        }
      }
    }
  }
}
</style>
