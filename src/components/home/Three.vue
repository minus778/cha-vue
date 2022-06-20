<template>
  <div class="three">
    <Ad :adList="adList" />
    <Icons :iconsList="iconsList" />
    <Like :likeList="likeList" />
  </div>
</template>

<script>
import Ad from "@/components/home/Ad.vue";
import Icons from "@/components/home/Icons.vue";
import Like from "@/components/home/Like.vue";
import { getHomeThreeInfo } from "@/network";
export default {
  name: "Three",
  components: {
    Ad,
    Icons,
    Like,
  },
  data() {
    return {
      adList: [],
      iconsList: [],
      likeList: [],
    };
  },
  mounted() {
    this.getThreeInfo();
  },
  methods: {
    async getThreeInfo() {
      let res = await getHomeThreeInfo();
      res.data.forEach((item) => {
        switch (item.type) {
          case "adList":
            this.adList = item.data;
            break;
          case "iconsList":
            this.iconsList = item.data;
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