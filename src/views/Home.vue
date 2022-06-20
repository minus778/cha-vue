<template>
  <div class="home">
    <Header />
    <!-- ly-tab插件实现头部切换导航栏 -->
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="changeTab"
    >
    </ly-tab>
    <!-- 滚动区域 -->
    <Scroll class="wrapper">
      <!-- 首页推荐界面 -->
      <One v-if="checkItem === '推荐'" />
      <!-- 首页大红袍界面 -->
      <Two v-else-if="checkItem === '大红袍'" />
      <!-- 首页铁观音界面 -->
      <Three v-else-if="checkItem === '铁观音'" />
      <Nothing v-else></Nothing>
    </Scroll>
    <Tabbar />
  </div>
</template>

<script>
import Header from "@/components/home/Header.vue";
import Scroll from "@/components/common/Scroll.vue";
import One from "@/components/home/One.vue";
import Two from "@/components/home/Two.vue";
import Three from "@/components/home/Three.vue";
import Nothing from "@/components/home/Nothing.vue";

import { getTopMes } from "@/network";
export default {
  name: "Home",
  components: {
    Header,
    Scroll,
    One,
    Two,
    Three,
    Nothing,
  },
  data() {
    return {
      selectedId: 0,
      options: {
        //文本颜色
        activeColor: "#b0352f",
        // 可在这里指定labelKey为你数据里文字对应的字段
      },
      //切换导航栏数据
      items: [],
      //切换导航栏当前选中项
      checkItem: "推荐",
    };
  },
  mounted() {
    this.getTopInfo();
  },
  methods: {
    changeTab(item) {
      this.checkItem = item.label;
    },
    //获取首页头部导航栏数据
    async getTopInfo() {
      let res = await getTopMes();
      this.items = res.data;
    },
  },
};
</script>

<style scoped lang="scss">
.ly-tab {
  position: fixed;
  top: 1.6rem;
  left: 0;
  z-index: 999;
  background-color: white;
}
::v-deep .ly-tabbar {
  box-shadow: none;
  border-bottom: none;
}
.home {
  position: relative;
  height: 100vh;
}
.wrapper {
  position: relative;
  // height: calc(100vh - 4.4533rem);
  height: 13.3333rem;
  overflow: hidden;
  margin-top: 2.8533rem;
}
</style>