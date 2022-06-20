<template>
  <div class="detail">
    <header>
      <div class="header-returns" v-show="isShow">
        <div @click="goBack">
          <i class="iconfont icon-fanhui back"></i>
        </div>
        <div>
          <i class="iconfont icon-kefu kefu"></i>
        </div>
      </div>

      <div class="header-bar" v-show="!isShow" :style="styleOption">
        <div @click="goBack">
          <i class="iconfont icon-fanhui back"></i>
        </div>
        <div>
          <span>商品详情</span>
          <span>商品评价</span>
        </div>
        <div>
          <i class="iconfont icon-kefu kefu"></i>
        </div>
      </div>
    </header>
    <Scroll class="wrapper" :bounce="false" :probetype="3" @onScroll="onScroll">
      <section>
        <div class="swiper-main">
          <!-- <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in swiperList" :key="index">
              <img :src="item.imgUrl" alt="" />
            </swiper-slide>
          </swiper> -->
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in swiperList" :key="index">
              <img v-lazy="item.imgUrl" alt="" />
            </van-swipe-item>
          </van-swipe>
          <div class="swiper-pagination"></div>
        </div>
        <div class="goods-name">
          <h1>{{ detailInfo.name }}</h1>
          <div>性价首选，茶感十足、鲜醇耐泡的大众口粮茶</div>
        </div>
        <div class="goods-price">
          <div class="oprice">
            <span>¥</span>
            <span>{{ detailInfo.price }}</span>
          </div>
          <div class="pprice">
            <span>价格:</span>
            <del>¥{{ detailInfo.price }}</del>
          </div>
        </div>
        <div class="goods-img">
          <img
            style="width: 100%; height: 13.3rem"
            :src="detailInfo.imgUrl"
            alt=""
          />
          <img
            style="width: 100%; height: 13.3rem"
            :src="detailInfo.imgUrl"
            alt=""
          />
        </div>
      </section>
    </Scroll>
    <footer>
      <div class="add-cart" @click="addToCart">加入购物车</div>
      <div>立即购买</div>
    </footer>
  </div>
</template>

<script>
import Scroll from "@/components/common/Scroll.vue";
import { getGoodsDetail, addCart, getCart } from "@/network";
import { mapMutations } from "vuex";
export default {
  name: "Detail",
  components: {
    Scroll,
  },
  data() {
    return {
      //头部导航栏的切换
      isShow: true,
      //导航栏透明度的变化值
      styleOption: {},
      //详情页当前商品数据
      detailInfo: [],
      //当前商品id
      id: 0,
      swiperList: [
        {
          imgUrl: require("@/assets/images/goods1.jpg"),
        },
        {
          imgUrl: require("@/assets/images/goods3.jpg"),
        },
        {
          imgUrl: require("@/assets/images/goods4.jpg"),
        },
      ],
    };
  },
  mounted() {
    //由于开启了keep-alive，mounted函数只在最开始执行一次，后面进入该组件不会执行
    this.id = this.$route.query.cid;
    this.getDetailInfo();
  },
  //开启keep-alive后进入组件就会执行这个周期函数
  activated() {
    //如果当前组件商品id和传入的id不一致才发请求，id一致说明重复点击相同商品，则不发请求，减少请求次数
    if (this.id !== this.$route.query.cid) {
      this.id = this.$route.query.cid;
      this.getDetailInfo();
    }
  },
  methods: {
    ...mapMutations("cart", ["saveCartList"]),
    onScroll(pos) {
      //实现导航栏切换透明度跟随滚动高度进行变化
      let opacity = pos / 180;
      opacity = opacity > 1 ? 1 : opacity;
      this.styleOption = {
        opacity: opacity,
      };
      //根据滚动高度切换导航栏
      if (pos > 50) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
    goBack() {
      this.$router.back();
    },
    async getDetailInfo() {
      let res = await getGoodsDetail(this.$route.query.cid);
      this.detailInfo = res[0];
    },
    async addToCart() {
      let data = {
        id: this.id,
      };
      let res = await addCart(data);
      if (res.success) {
        //点击加入购物车后更新仓库购物车数据
        getCart().then((ress) => {
          this.saveCartList(ress.data);
          setTimeout(() => {
            this.$toast(res.msg);
          }, 100);
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.detail {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.wrapper {
  // height: calc(100% - 1.3067rem);
  height: 15.0133rem;
  overflow: hidden;
}
header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 1.173333rem;
  .header-returns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.173333rem;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin: 0 0.266666rem;
      width: 0.933333rem;
      height: 0.933333rem;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      .back {
        font-size: 0.4rem;
        color: #fff;
      }
      .kefu {
        font-size: 0.48rem;
        color: #fff;
      }
    }
  }
  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.173333rem;
    font-size: 0.426666rem;
    background-color: #fff;
    span {
      padding: 0 0.266666rem;
    }
    .back {
      font-size: 0.4rem;
      padding: 0.2667rem;
    }
    .kefu {
      font-size: 0.48rem;
      padding: 0.2667rem;
    }
  }
}
.swiper-main {
  position: relative;
  width: 100%;
  height: 10rem;
  overflow: hidden;
}
.swiper-container {
  width: 100%;
  height: 10rem;
}
.swiper-container img {
  width: 100%;
  height: 10rem;
}
.swiper-pagination {
  bottom: 0.266666rem;
  width: 100%;
  text-align: right;
  color: #ffffff;
  font-size: 0.426666rem;
}
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  left: -0.533333rem;
}
.goods-name {
  padding: 0.533333rem 0.266666rem;
  border-bottom: 0.0267rem solid #cccccc;
  h1 {
    font-size: 0.533333rem;
    font-weight: 500;
  }
  div {
    padding: 0.08rem 0;
    font-size: 0.373333rem;
    color: #999999;
  }
}
.goods-price {
  padding: 0.533333rem 0.266666rem;
  .oprice {
    color: red;
    font-size: 0.5333rem;
    font-weight: 600;
  }
  .pprice {
    color: #999999;
    font-size: 0.373333rem;
  }
}
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.306666rem;
  border-top: 0.0267rem solid #cccccc;
  background-color: #fff;
  div {
    width: 50%;
    line-height: 1.306666rem;
    font-size: 0.426666rem;
    text-align: center;
    color: #fff;
    background-color: red;
    &.add-cart {
      background-color: #ff9500;
    }
  }
}
</style>
