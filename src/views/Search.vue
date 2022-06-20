<template>
  <div class="search">
    <router-view></router-view>
    <Tabbar />
  </div>
</template>

<script>
export default {
  name: "Search",
};
</script>

<style scoped>
.search {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>