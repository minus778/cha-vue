<template>
  <div class="swiper-main">
    <!-- <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in swiperList" :key="index">
        <img :src="item.imgUrl" alt="" />
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination"></div> -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in swiperList" :key="index">
        <img v-lazy="item.imgUrl" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  data() {
    return {};
  },
  props: {
    swiperList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.swiper-main {
  position: relative;
  width: 100%;
  height: 4.4rem;
}
.swiper-container {
  width: 100%;
  height: 4.4rem;
}
.swiper-main img {
  width: 100%;
  height: 4.4rem;
}
.swiper-pagination {
  width: 100%;
  bottom: 0rem;
}
::v-deep .swiper-pagination-bullet-active {
  background-color: #b0352f;
}
::v-deep .swiper-pagination-bullet {
  margin: 0 0.08rem;
}
</style>
