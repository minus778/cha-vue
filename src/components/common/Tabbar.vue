<template>
  <div class="tabbar">
    <ul>
      <li v-for="(item, i) in routerList" :key="i" @click="switchTo(item)">
        <img :src="$route.path === item.path ? item.selected : item.active" />
        <span :class="{ active: $route.path === item.path }">{{
          item.title
        }}</span>
      </li>
    </ul>
    <div class="goodsnum">{{ allNum }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Tabbar",
  data() {
    return {
      routerList: [
        {
          title: "首页",
          path: "/home",
          active: require("@/assets/images/home.png"),
          selected: require("@/assets/images/home-select.png"),
        },
        {
          title: "分类",
          path: "/list",
          active: require("@/assets/images/list.png"),
          selected: require("@/assets/images/list-select.png"),
        },
        {
          title: "购物车",
          path: "/cart",
          active: require("@/assets/images/cart.png"),
          selected: require("@/assets/images/cart-select.png"),
        },
        {
          title: "我的",
          path: "/my",
          active: require("@/assets/images/my.png"),
          selected: require("@/assets/images/my-select.png"),
        },
      ],
    };
  },
  methods: {
    switchTo(item) {
      if (this.$route.path === item.path) return;
      this.$router.push(item.path);
    },
  },
  computed: {
    ...mapGetters("cart", ["allNum"]),
  },
};
</script>

<style scoped lang='scss'>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.6rem;
  background-color: #fff;
  z-index: 999;
  box-shadow: 0 -0.0533rem 0.16rem #efefef;
  .goodsnum {
    width: 0.4rem;
    line-height: 0.4rem;
    border-radius: 50%;
    position: absolute;
    background-color: #b0352f;
    top: 0.0533rem;
    right: 3.0667rem;
    font-size: 0.32rem;
    text-align: center;
    color: white;
  }
}
.tabbar ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
}
.tabbar ul li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tabbar ul li img {
  width: 0.826666rem;
  height: 0.826666rem;
}
.tabbar ul li span {
  font-size: 0.426666rem;
}
.active {
  color: red;
}
</style>