<template>
  <div class="nothing">
    <div class="image">
      <img src="@/assets/images/none.png" />
    </div>
    <span>这里空空如也~</span>
  </div>
</template>

<script>
export default {
  name: "Nothing",
  data() {
    return {};
  },
};
</script>

<style scoped lang='scss'>
.nothing {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  .image {
    width: 8rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  span {
    font-size: 0.5333rem;
    color: gray;
  }
}
</style>