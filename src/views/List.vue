<template>
  <div class="list">
    <header v-if="isShow">
      <i class="iconfont icon-fanhui returns" @click="$router.back()"></i>
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <span>搜您喜欢的...</span>
      </div>
      <div class="go-home" @click="$router.replace('/')">
        <i class="iconfont icon-fangzi"></i>
      </div>
    </header>
    <section>
      <div class="list-l">
        <ul class="l-item">
          <li
            :class="{ active: currentIndex === i }"
            v-for="(item, i) in leftData"
            :key="i"
            @click="goScroll(i)"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <Scroll
        class="wrapper"
        :probetype="3"
        @onScroll="onScroll"
        ref="scroll"
        :bounce="false"
      >
        <div class="list-r" ref="right">
          <ul v-for="(item, i) in rightData" :key="i" class="shop-list">
            <li v-for="(item2, i2) in item" :key="i2">
              <div class="name">
                <div></div>
                <h2>{{ item2.name }}</h2>
                <div></div>
              </div>
              <ul class="r-content">
                <li v-for="(item3, i3) in item2.list" :key="i3">
                  <img :src="item3.imgUrl" alt="" />
                  <span>{{ item3.name }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </Scroll>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import { getListInfo } from "@/network";
import Scroll from "@/components/common/Scroll.vue";
export default {
  name: "List",
  data() {
    return {
      rightData: [],
      leftData: [],
      //保存右侧不同板块的高度
      allHeight: [],
      currentIndex: 0,
      isShow: true,
    };
  },
  components: {
    Scroll,
  },
  mounted() {
    //注意：此时由于请求未结束，ref获取不到dom，getElementsByClassName获取到的dom为空
    //解决办法：使用then方法在请求结束之后再调用ref
    this.getInfo().then(() => {
      //计算右侧滚动模块的高度
      setTimeout(() => {
        this.$nextTick(() => {
          this.getHeight();
        });
      }, 0);
    });
  },
  methods: {
    async getInfo() {
      let { data: res } = await getListInfo();
      res.forEach((item) => {
        this.rightData.push(item.data);
        this.leftData.push(item.name);
      });
    },
    //点击左侧实现右侧滚动（左侧点击影响右侧滚动位置）
    goScroll(i) {
      this.currentIndex = i;
      this.$refs.scroll.scrollTo(0, -this.allHeight[i]);
    },
    //计算右侧区域模块高度
    getHeight() {
      //获取右侧每一块高度
      let uls = this.$refs.right.getElementsByClassName("shop-list");
      //把dom对象转换成功真正的数组
      Array.from(uls).forEach((v) => {
        //将每个块的头部偏移量（即这个块上方的元素卷去的头部距离）存放到一个数组中
        this.allHeight.push(v.offsetTop);
      });
    },
    //触发滚动事件
    onScroll(position) {
      //根据块滚动的位置与每个块对应的头部偏移量来判断当前处于哪个list然后影响左边的列表
      this.isShow = position > 50 ? false : true;
      for (let i = 0; i < this.allHeight.length; i++) {
        //单独判断最后一个list（因为没有下一个this.allHeight[i + 1]可供他比较）
        if (i == this.allHeight.length - 1 && position >= this.allHeight[i]) {
          this.currentIndex = i;
        } else if (
          position >= this.allHeight[i] &&
          position < this.allHeight[i + 1]
        ) {
          this.currentIndex = i;
          break;
        }
      }
    },
  },
};
</script>
<style scoped lang='scss'>
.wrapper {
  height: calc(100% - 1.6rem);
  overflow: hidden;
}
.list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.173333rem;
  background-color: #b0352f;
  .returns {
    line-height: 1.173333rem;
    padding: 0 0.2667rem;
    color: #fff;
    font-size: 0.4rem;
  }
  .search {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0.16rem 0.266666rem;
    background-color: #ffffff;
    border-radius: 0.64rem;
    i {
      padding-right: 0.16rem;
      color: #666;
      font-size: 0.48rem;
    }
    span {
      color: #666;
      font-size: 0.373333rem;
    }
  }
  .go-home {
    padding: 0 0.1333rem;
    i {
      font-size: 0.9067rem;
      color: white;
    }
  }
}
section {
  display: flex;
  position: relative;
  flex: 1;
  overflow: hidden;
}
.list-l {
  width: 2.7rem;
  background-color: #fff;
  border-right: 0.0267rem solid #cccccc;
  overflow: hidden;
  .l-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    li {
      width: 100%;
      line-height: 1.333333rem;
      text-align: center;
      font-size: 0.373333rem;
      &.active {
        color: #b54f4a;
        border-left: 0.16rem solid #b54f4a;
      }
    }
  }
}

.list-r {
  flex: 1;
  overflow: hidden;
  .shop-list {
    text-align: center;
    &:last-child {
      height: 100vh;
    }
    .name {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 1.6rem;
      div {
        height: 0.0533rem;
        width: 1.0667rem;
        background-color: #efefef;
      }
    }
    h2 {
      padding: 0.533333rem 0;
      font-size: 0.5333rem;
      font-weight: 400;
    }
    .r-content {
      display: flex;
      flex-wrap: wrap;
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 33.33%;
        padding: 0.266666rem 0;
        img {
          width: 1.413333rem;
          height: 1.413333rem;
        }
        span {
          font-size: 0.3733rem;
        }
      }
    }
  }
}
::v-deep.tabbar {
  border-top: 0.0267rem solid #cccccc;
}
</style>


