<template>
  <div class="search-list">
    <Header></Header>
    <div class="headers">
      <ul>
        <li v-for="(item, i) in tablist" :key="i" @click="changeTab(i)">
          <div :class="{ active: currentIndex === i }">{{ item.name }}</div>
          <div class="search-filter" v-if="item.status">
            <i
              class="iconfont icon-xiangshang1"
              :class="{ active: currentIndex === i && item.status === 'up' }"
            ></i>
            <i
              class="iconfont icon-xiangxia1"
              :class="{ active: currentIndex === i && item.status === 'down' }"
            ></i>
          </div>
        </li>
      </ul>
    </div>
    <Scroll class="wrapper">
      <section>
        <ul>
          <li
            v-for="(item, i) in goodslist"
            :key="i"
            @click="toDetail(item.id)"
          >
            <img v-lazy="item.imgUrl" alt="" />
            <h3>{{ item.name }}</h3>
            <div class="price">
              <div>
                <span>¥</span>
                <b>{{ item.price }}</b>
              </div>
              <div>立即购买</div>
            </div>
          </li>
        </ul>
      </section>
    </Scroll>
  </div>
</template>

<script>
import Header from "@/components/search/Header.vue";
import Scroll from "@/components/common/Scroll.vue";
import { getGoodsList } from "@/network";
export default {
  name: "SearchList",
  components: {
    Header,
    Scroll,
  },
  data() {
    return {
      goodslist: [],
      tablist: [
        { name: "综合", key: "all" },
        { name: "价格", key: "price", status: "down" },
        { name: "销量", key: "num", status: "down" },
      ],
      currentIndex: 0,
    };
  },
  mounted() {
    this.getGoods();
  },
  methods: {
    async getGoods() {
      let res = await getGoodsList({
        name: this.$route.query.mes,
        ...this.tabOrder,
      });
      this.goodslist = res;
    },
    changeTab(i) {
      this.currentIndex = i;
      if (this.currentIndex === 1 || this.currentIndex === 2) {
        let status = this.tablist[this.currentIndex].status;
        this.tablist[this.currentIndex].status =
          status === "up" ? "down" : "up";
      }
      this.getGoods();
    },
    toDetail(cid) {
      this.$router.push({
        path: "/detail",
        query: { cid },
      });
    },
  },
  computed: {
    tabOrder() {
      let type = this.tablist[this.currentIndex];
      let key = type.key;
      let value = type.status === "up" ? "asc" : "desc";
      return {
        [key]: value,
      };
    },
  },
  watch: {
    $route() {
      this.getGoods();
    },
  },
};
</script>

<style scoped lang='scss'>
.active {
  color: red;
}
.wrapper {
  // height: calc(100% - 4.72rem);
  height: 13.0667rem;
  overflow: hidden;
}
.search-list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.headers ul {
  display: flex;
  justify-content: space-around;
  padding: 0.2667rem 0 0 0;
  font-size: 0.426666rem;
}
.headers ul li {
  display: flex;
  align-items: center;
}
.headers ul li > div {
  padding: 0 0.08rem;
}
.headers ul li .search-filter {
  display: flex;
  flex-direction: column;
  i {
    &:first-child {
      position: relative;
      top: 0.0533rem;
    }
    &:last-child {
      position: relative;
      top: -0.0533rem;
    }
  }
}
section {
  flex: 1;
  overflow: hidden;
}
section ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
section ul li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 50%;
  padding: 0.266666rem;
}
section ul li img {
  width: 4.533333rem;
  height: 4.533333rem;
}
section ul li h3 {
  width: 100%;
  font-size: 0.373333rem;
  color: #222;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
section ul li .price {
  display: flex;
  justify-content: space-between;
  padding: 0.266666rem 0;
  width: 100%;
  font-size: 0.3733rem;
}
section ul li .price div:first-child span {
  font-size: 0.32rem;
  color: #b0352f;
}
section ul li .price div:first-child b {
  color: #b0352f;
  font-size: 0.426666rem;
}
section ul li .price div:last-child {
  padding: 0.08rem 0.16rem;
  color: #fff;
  background-color: #b0352f;
  border-radius: 0.16rem;
}
</style>
