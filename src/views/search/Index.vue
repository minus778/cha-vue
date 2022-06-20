<template>
  <div class="search-index">
    <Header />
    <Scroll class="wrapper">
      <section>
        <div class="search-history" v-if="historyList.length != 0">
          <h2>
            <i class="iconfont icon-shijian"></i>
            <span>历史搜索</span>
            <span @click="clearHistory"
              ><i class="iconfont icon-shanchu"></i>清空历史记录</span
            >
          </h2>
          <ul>
            <li
              v-for="(item, i) in historyList"
              :key="i"
              @click="toSearchList(item)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div v-else class="noSearch">暂无搜索历史记录...</div>
        <span class="tuijian"
          ><i class="iconfont icon-tuijian"></i>推荐商品</span
        >
        <Like :likeList="likeList" class="like" />
      </section>
    </Scroll>
  </div>
</template>

<script>
import Header from "@/components/search/Header.vue";
import Like from "@/components/home/Like.vue";
import Scroll from "@/components/common/Scroll.vue";
import { getHomeOneInfo } from "@/network";
export default {
  name: "Index",
  components: {
    Header,
    Like,
    Scroll,
  },
  data() {
    return {
      historyList: JSON.parse(localStorage.getItem("searchList") || "[]"),
      likeList: [],
    };
  },
  mounted() {
    this.getOneInfo();
  },
  methods: {
    clearHistory() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定执行此操作?",
          showCancelButton: true,
        })
        .then((res) => {
          if (res === "confirm") {
            this.historyList = [];
            localStorage.setItem("searchList", "[]");
          }
        });
    },
    toSearchList(item) {
      //跳转页面
      this.$router.push({
        name: "list",
        query: { mes: item },
      });
    },
    async getOneInfo() {
      let res = await getHomeOneInfo();
      res.data.forEach((item) => {
        switch (item.type) {
          case "likeList":
            this.likeList = item.data;
            break;
          default:
            console.log("没有数据");
            break;
        }
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.search-index {
  height: 100%;
  background-color: #f5f5f5;
  .wrapper {
    position: relative;
    // height: calc(100% - 2.7733rem);
    height: 15.0133rem;
    overflow: hidden;
  }
}
section {
  flex: 1;
  background-color: #f5f5f5;
  overflow: hidden;
  .tuijian {
    padding: 0.5333rem;
    font-size: 0.4rem;
    i {
      font-size: 0.4533rem;
      color: #b0352f;
      margin-right: 0.0533rem;
    }
  }
  .like ::v-deep li {
    background-color: white;
  }
  .noSearch {
    width: 100%;
    padding: 0.5333rem 0;
    text-align: center;
    font-size: 0.48rem;
    color: gray;
  }
}
.search-history {
  margin-bottom: 2.6667rem;
}
.search-history h2 {
  position: relative;
  padding: 0.533333rem;
  font-weight: 400;
  font-size: 0.4rem;
}
.search-history h2 i {
  padding-right: 0.08rem;
  color: #b0352f;
  font-size: 0.48rem;
}
.search-history h2 span:last-child {
  position: absolute;
  right: 0.533333rem;
}
.search-history ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.266666rem;
}
.search-history ul li {
  margin: 0.266666rem;
  padding: 0.08rem 0.12rem;
  font-size: 0.373333rem;
  border: 0.0267rem solid #ccc;
}
</style>
