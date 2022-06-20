<template>
  <div class="ad">
    <ul>
      <li v-for="(item, index) in adList" :key="index">
        <img :src="item.imgUrl" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Ad",
  props: {
    adList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
li {
  width: 100%;
  height: 2.986666rem;
}
li img {
  width: 100%;
  height: 100%;
}
</style>
