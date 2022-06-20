<template>
  <header>
    <i class="iconfont icon-fanhui" @click="$emit('back')"></i>
    <slot>
      <span>我的地址</span>
    </slot>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang='scss' scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  width: 100%;
  height: 1.173333rem;
  color: #fff;
  background-color: #b0352f;
  i {
    position: absolute;
    left: 0;
    padding: 0 0.4rem;
    font-size: 0.3733rem;
  }
  span {
    font-weight: 300;
    font-size: 0.48rem;
  }
}
</style>
