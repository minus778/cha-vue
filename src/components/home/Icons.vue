<template>
  <div class="icons">
    <ul>
      <li v-for="item in iconsList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Icons",
  data() {
    return {};
  },
  props: {
    iconsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.icons ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.4rem 0;
}
.icons ul li {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.icons img {
  width: 1.013333rem;
  height: 1.013333rem;
}
.icons span {
  padding: 0.16rem 0;
  font-size: 0.426666rem;
}
</style>