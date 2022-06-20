<template>
  <header>
    <div class="top">
      <img src="@/assets/images/logo.png" alt="" />
    </div>
    <div class="search" @click="toSearch">
      <i class="iconfont icon-sousuo"></i>
      <span>搜您喜欢的...</span>
    </div>
    <i class="iconfont icon-kefu kefu"></i>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    toSearch() {
      this.$router.push("/search");
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.6rem;
  background-color: #b0352f;
}
header .top {
  padding: 0 0.266666rem;
  width: 3.2rem;
  height: 1.333333rem;
}
header .top img {
  width: 100%;
  height: 100%;
}
.search {
  display: flex;
  align-items: center;
  width: 6.56rem;
  height: 0.8rem;
  background-color: #ffffff;
  border-radius: 0.8rem;
}
.search i {
  padding: 0 0.16rem;
  color: #ccc;
}
.search span {
  font-size: 0.373333rem;
  color: #ccc;
}
.kefu {
  padding: 0 0.1867rem;
  font-size: 0.5867rem;
  color: #fff;
}
</style>