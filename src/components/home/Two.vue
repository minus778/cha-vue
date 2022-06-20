<template>
  <div class="two">
    <Ad :adList="adList" />
    <Like :likeList="likeList" />
  </div>
</template>

<script>
import Ad from "@/components/home/Ad.vue";
import Like from "@/components/home/Like.vue";
import { getHomeTwoInfo } from "@/network";
export default {
  name: "Two",
  components: {
    Ad,
    Like,
  },
  data() {
    return {
      adList: [],
      likeList: [],
    };
  },
  mounted() {
    this.getTwoInfo();
  },
  methods: {
    async getTwoInfo() {
      let res = await getHomeTwoInfo();
      res.data.forEach((item) => {
        switch (item.type) {
          case "adList":
            this.adList = item.data;
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