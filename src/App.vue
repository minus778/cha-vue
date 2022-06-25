<template>
  <div id="app">
    <keep-alive include="Detail,Address,Cart">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {};
</script>


<style>
</style>
