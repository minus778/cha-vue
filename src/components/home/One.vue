<template>
  <div class="one">
    <Swiper :swiperList="swiperList" />
    <Icons :iconsList="iconsList" />
    <Recommend :recommendList="recommendList" />
    <Like :likeList="likeList" />
  </div>
</template>

<script>
import Swiper from "@/components/home/Swiper.vue";
import Icons from "@/components/home/Icons.vue";
import Recommend from "@/components/home/Recommend.vue";
import Like from "@/components/home/Like.vue";

import { getHomeOneInfo } from "@/network";
export default {
  name: "One",
  components: {
    Swiper,
    Icons,
    Recommend,
    Like,
  },
  data() {
    return {
      swiperList: [],
      iconsList: [],
      recommendList: [],
      likeList: [],
    };
  },
  mounted() {
    this.getOneInfo();
  },
  methods: {
    async getOneInfo() {
      let res = await getHomeOneInfo();
      res.data.forEach((item) => {
        switch (item.type) {
          case "swiperList":
            this.swiperList = item.data;
            break;
          case "iconsList":
            this.iconsList = item.data;
            break;
          case "recommendList":
            this.recommendList = item.data;
            break;
          case "likeList":
            this.likeList = item.data;
            break;
          default:
            console.log("没有数据");
            break;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>