<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probetype: {
      type: Number,
      //默认
      defluat: 0,
    },
    pullupload: {
      type: Boolean,
      defluat: true,
    },
    bounce: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      //创建bscroll对象
      this.scroll = new BetterScroll(this.$refs.wrapper, {
        click: true,
        observeDOM: true,
        //observeImage: true,
        mouseWheel: true,
        probeType: this.probetype,
        pullUpLoad: this.pullupload,
        bounce: this.bounce,
      });
      //派发滚动事件
      if (this.probetype === 2 || this.probetype === 3) {
        this.scroll.on("scroll", (position) => {
          this.$emit("onScroll", -position.y);
        });
      }
    });
  },
  methods: {
    //对scrollTo函数进行一层封装
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style scoped>
</style>