<template>
  <div id="app">
    <keep-alive include="Detail,Address,Cart">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(process.env);
  },
};
</script>


<style>
</style>
