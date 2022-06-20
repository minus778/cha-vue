<template>
  <div class="path-index container">
    <Header @back="$router.push('/my')"></Header>
    <Scroll class="wrapper">
      <section>
        <ul v-if="addressList.length">
          <li
            v-for="(item, i) in addressList"
            :key="i"
            @click="toUpdateAdr('edit', i)"
          >
            <div>
              <span>{{ item.name }}</span>
              <span>{{ item.tel }}</span>
            </div>
            <div class="adrText">
              <span class="active" v-if="item.isDefault === '1'">[默认]</span>
              <span>{{ item.province }}</span>
              <span>{{ item.city }}</span>
              <span>{{ item.county }}</span>
              <span>{{ item.addressDetail }}</span>
            </div>
          </li>
        </ul>
        <div class="noAddress" v-else>
          <div class="adr-img">
            <img src="@/assets/images/address.png" alt="" />
          </div>
          <div class="text">快递小哥找不到你,留个地址呗~</div>
        </div>
        <div class="add-path" @click="toUpdateAdr('add')">添加地址</div>
      </section>
    </Scroll>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "@/components/address/Header.vue";
import Scroll from "@/components/common/Scroll.vue";
import { getAddressInfo } from "@/network";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Index",
  components: {
    Header,
    Scroll,
  },
  mounted() {
    //使用了keep-alive缓存组件，只有第一次进入会发请求获取地址信息
    this.getAdr();
  },
  activated() {
    //显示地址首页时判断是否传入路由参数的change为true，为true则代表修改/删除地址成功，此时需要发请求重新获取地址信息
    if (this.$route.query.change) {
      console.log("修改地址成功，重新发请求");
      this.getAdr();
    }
    //如果本地没有地址信息就代表重新登录了，需要重新发一次请求
    if (!localStorage.getItem("addressInfo")) {
      this.getAdr();
    }
  },
  methods: {
    ...mapMutations("user", ["saveAddress"]),
    toUpdateAdr(type, i) {
      //如果是从订单页过来的话，点击地址会返回订单页并将当前点击的地址信息传给订单页
      if (this.$route.query.type === "select" && type === "edit") {
        this.$router.push({ path: "/order", query: { index: i } });
      } else {
        this.$router.push({
          path: "/address/editAdr",
          query: { type, index: i },
        });
      }
    },
    async getAdr() {
      let res = await getAddressInfo();
      //保存至仓库
      this.saveAddress(res.data);
    },
  },
  computed: {
    ...mapState("user", ["addressList"]),
  },
};
</script>

<style lang='scss' scoped>
.wrapper {
  // height: calc(100vh - 2.7733rem);
  height: 15.0133rem;
  overflow: hidden;
  background-color: #f5f5f5;
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    .noAddress {
      width: 100%;
      height: 5.3333rem;
      text-align: center;
      position: relative;
      .text {
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 0;
        font-size: 0.4rem;
      }
      .adr-img {
        position: absolute;
        width: 4rem;
        height: 4rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    ul {
      width: 100%;
      li {
        padding: 0.266666rem 0.4rem;
        margin-bottom: 0.16rem;
        background-color: #ffffff;
        span {
          padding-right: 0.4rem;
          font-size: 0.426666rem;
        }
        .active {
          color: #b0352f;
        }
        .adrText {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          span {
            padding-right: 0.1rem;
          }
        }
      }
    }
    .add-path {
      margin-top: 0.8rem;
      margin-bottom: 0.8rem;
      width: 3.2rem;
      line-height: 1.066666rem;
      font-size: 0.48rem;
      text-align: center;
      color: #ffffff;
      background-color: #b0352f;
      border-radius: 0.16rem;
    }
  }
}
</style>
