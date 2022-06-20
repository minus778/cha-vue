<template>
  <header>
    <i class="iconfont icon-fanhui search-return" @click="goBack"></i>
    <div class="search-main">
      <i class="iconfont icon-sousuo"></i>
      <form action="" onsubmit="return false">
        <input
          type="search"
          placeholder="搜索您喜欢的产品..."
          v-model="searchVal"
          @keyup.enter="toSearchList"
        />
      </form>
    </div>
    <div class="serach-btn" @click="toSearchList">搜索</div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      historyList: [],
      searchVal: this.$route.query.mes || "",
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    toSearchList() {
      //如果搜索的关键字是没有的，那就直接return
      if (!this.searchVal) return;
      //判断之前有没有搜索的本地存储
      if (!localStorage.getItem("searchList")) {
        //没有
        localStorage.setItem("searchList", "[]");
      } else {
        //之前有
        this.historyList = JSON.parse(localStorage.getItem("searchList"));
      }
      //增加数据
      this.historyList.unshift(this.searchVal);
      //ES6去重
      let newArr = new Set(this.historyList);
      //给本地存储赋值
      localStorage.setItem("searchList", JSON.stringify(Array.from(newArr)));
      if (this.searchVal === this.$route.query.mes) return;
      //跳转页面
      this.$router.push({
        name: "list",
        query: { mes: this.searchVal },
      });
    },
  },
};
</script>

<style scoped>
input {
  font-size: 0.3733rem;
  color: #666666;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  line-height: 1.173333rem;
  color: #fff;
  background-color: #b0352f;
}
.serach-btn {
  padding: 0 0.266666rem;
}
.search-return {
  padding: 0 0.266666rem;
  font-size: 0.4rem;
}
.search-main {
  display: flex;
  align-items: center;
  width: 7.2rem;
  height: 0.8rem;
  border-radius: 0.8rem;
  background-color: #ffffff;
}
.search-main i {
  padding: 0 0.266666rem;
  color: #666666;
}
.search-main form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.search-main form input {
  width: 100%;
}
.serach-btn {
  font-size: 0.426666rem;
}
</style>