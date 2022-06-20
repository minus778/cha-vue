<template>
  <div class="address">
    <keep-alive include="Index">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "Address",
};
</script>

<style scoped lang='scss'>
</style>