<template>
  <div class="cart container">
    <header>
      <i class="iconfont icon-fanhui back" @click="goBack"></i>
      <span>购物车</span>
      <i class="iconfont icon-shanchu delete" @click="deleteAll"></i>
    </header>
    <van-notice-bar
      left-icon="volume-o"
      scrollable
      text="感谢您选择茶七网，请理性消费，按需购买"
      v-if="cartList.length"
    />
    <Scroll class="wrapper" :bounce="false">
      <section v-if="cartList.length">
        <div class="cart-title">
          <van-checkbox
            :value="isAllChecked"
            checked-color="#b0352f"
            @click="clickAll"
          ></van-checkbox>
          <span>商品</span>
        </div>
        <ul>
          <li v-for="(item, i) in cartList" :key="i">
            <div class="check">
              <van-checkbox
                :value="item.checked"
                checked-color="#b0352f"
                @click="onclickButton(i)"
              ></van-checkbox>
            </div>
            <div class="image">
              <img :src="item.goods_imgUrl" alt="" />
            </div>
            <div class="goods">
              <div class="goods-title">
                <span>{{ item.goods_name }}</span>
                <i
                  class="iconfont icon-shanchu"
                  @click="deleteGood(item.goods_id)"
                ></i>
              </div>
              <div class="goods-price">¥{{ item.goods_price }}</div>
              <van-stepper
                v-model="item.goods_num"
                integer
                @change="changeNum(item.goods_num, item.goods_id)"
              />
            </div>
          </li>
        </ul>
      </section>
    </Scroll>
    <footer v-if="cartList.length">
      <div class="radio">
        <van-checkbox
          :value="isAllChecked"
          checked-color="#b0352f"
          @click="clickAll"
        ></van-checkbox>
      </div>
      <div class="total">
        <div>
          共有
          <span class="total-active">{{ allNum }}</span>
          件商品
        </div>
        <div>
          <span>总计：</span>
          <span class="total-active">¥{{ allCount }} + 0茶币</span>
        </div>
      </div>
      <div class="order" @click="toOrder">去结算</div>
    </footer>
    <div v-else class="null">
      <img src="@/assets/images/none.png" alt="" />
      <p>购物车空空如也~</p>
      <router-link to="/home">去首页逛逛</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
import {
  deleteCart,
  updateNum,
  getCart,
  getOrder,
  getAddressInfo,
} from "@/network";
import Scroll from "@/components/common/Scroll.vue";
export default {
  name: "Cart",
  components: {
    Scroll,
  },
  data() {
    return {
      goodsId: "",
    };
  },
  mounted() {
    //调用vuex中的发请求方法并且将商品数据存储到vuex中
    this.getCartInfo();
  },
  activated() {
    //如果本地没有购物车商品信息就代表重新登录了，需要重新发一次请求
    if (!localStorage.getItem("cartList")) {
      this.getCartInfo();
    }
  },
  computed: {
    ...mapState("cart", ["cartList"]),
    ...mapGetters("cart", [
      "isAllChecked",
      "allNum",
      "allCount",
      "checkedGood",
    ]),
  },
  methods: {
    ...mapActions("cart", ["clickAll"]),
    ...mapMutations("cart", [
      "changeAllChecked",
      "clickButton",
      "saveCartList",
      "deleteAllShop",
    ]),
    ...mapMutations("user", ["saveOrderInfo", "saveAddress"]),
    goBack() {
      this.$router.push("/home");
    },
    onclickButton(i) {
      this.clickButton(i);
    },
    async deleteGood(i) {
      let res = await deleteCart({ id: i });
      this.$toast(res.msg);
      this.getCartInfo();
    },
    async changeNum(value, id) {
      await updateNum({ newNum: value, id: id });
      this.getCartInfo();
    },
    async getCartInfo() {
      let { data } = await getCart();
      this.saveCartList(data);
    },
    async toOrder() {
      if (this.checkedGood.length > 0) {
        //进入订单页之前先发请求获取地址信息，以保证地址信息存在
        let resu = await getAddressInfo();
        this.saveAddress(resu.data);
        //将订单信息整理好后发请求生成订单
        let goodsName = [];
        this.checkedGood.forEach((item) => {
          goodsName.push(item.goods_name);
        });
        let data = {
          goods_name: goodsName,
          goods_price: this.allCount,
          goods_num: this.allNum,
        };
        let res = await getOrder(data);
        //生成订单后将订单信息保存到仓库中
        this.saveOrderInfo(res.data);
        this.$router.push("/order");
      } else {
        this.$toast("请至少选择一件商品");
      }
    },
    //清空购物车
    deleteAll() {
      console.log(1111);
      this.$dialog
        .confirm({
          title: "是否确认清空购物车？",
        })
        .then(async () => {
          let res = await deleteCart();
          this.$toast(res.msg);
          this.deleteAllShop();
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped lang="scss">
.null {
  font-size: 0.4533rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.173333rem;
  color: #fff;
  background-color: #b0352f;
  .back {
    padding: 0 0.4rem;
    font-size: 0.4rem;
  }
  .delete {
    padding: 0 0.4rem;
    font-size: 0.48rem;
  }
  span {
    padding: 0 0.4rem;
    font-size: 0.426666rem;
  }
}
.wrapper {
  // height: calc(100vh - 3.52rem);
  height: 14.2667rem;
  overflow: hidden;
  section {
    background-color: #f5f5f5;
    .cart-title {
      display: flex;
      padding: 0.533333rem;
      span {
        padding: 0 0.4rem;
        font-weight: 500;
        font-size: 0.48rem;
      }
    }
    ul {
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.16rem 0.533333rem;
        margin: 0 0 0.213333rem;
        background-color: #fff;
        .check {
          padding-right: 0.373333rem;
        }
        .goods {
          display: flex;
          flex-direction: column;
          padding-left: 0.4rem;
          font-size: 0.32rem;
          .goods-title {
            display: flex;
            i {
              font-size: 0.4533rem;
            }
          }
          .goods-price {
            padding: 0.08rem 0;
            color: #b0352f;
          }
          ::v-deep .van-stepper {
            text-align: right;
          }
        }
        img {
          width: 1.973333rem;
          height: 1.973333rem;
        }
      }
    }
  }
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.28rem;
  box-shadow: 0 -0.0533rem 0.16rem #efefef;
  .radio {
    padding: 0 0.4rem;
  }
  .total {
    flex: 1;
    font-size: 0.32rem;
    .total-active {
      color: #b0352f;
    }
  }
  .order {
    width: 3.2rem;
    line-height: 1.28rem;
    color: #fff;
    text-align: center;
    font-size: 0.426666rem;
    background-color: #b0352f;
  }
}
</style>