<template>
  <header>
    <div @click="back">
      <i class="iconfont icon-fanhui back"></i>
    </div>
    <div>
      <slot>
        <span>登录</span>
      </slot>
    </div>
    <div>
      <i class="iconfont icon-kefu kefu"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  line-height: 1.173333rem;
  color: #fff;
  background-color: #b0352f;
  span {
    font-size: 0.48rem;
  }
  .back {
    padding: 0 0.4rem;
    font-size: 0.4rem;
  }
  .kefu {
    padding: 0 0.4rem;
    font-size: 0.48rem;
  }
}
</style>
