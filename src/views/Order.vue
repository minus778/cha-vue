<template>
  <div class="order container">
    <header>
      <i class="iconfont icon-fanhui back" @click="$router.push('/cart')"></i>
      <span>提交订单</span>
      <i class="iconfont icon-kefu kefu"></i>
    </header>
    <van-notice-bar
      left-icon="info-o"
      :scrollable="false"
      text="此订单在10分钟之内未支付将自动关闭"
    />
    <Scroll class="wrapper" :bounce="false">
      <section>
        <div class="path" @click="toAddress">
          <div class="payment-title">收货信息</div>
          <div class="path-content">
            <div>
              <span>{{ startAdr.name }}</span>
              <span>{{ startAdr.tel }}</span>
            </div>
            <div>
              <span>{{ startAdr.province }}</span>
              <span>{{ startAdr.city }}</span>
              <span>{{ startAdr.county }}</span>
              <span>{{ startAdr.addressDetail }}</span>
            </div>
          </div>
        </div>
        <div class="payment">
          <div class="payment-title">支付方式</div>
          <van-radio-group v-model="radioPayment" checked-color="#b0352f">
            <van-radio name="wx">微信支付</van-radio>
            <van-radio name="ali">支付宝支付</van-radio>
          </van-radio-group>
        </div>
        <div class="goods">
          <div class="payment-title">订单商品</div>
          <ul>
            <li v-for="(item, i) in checkedGood" :key="i">
              <div>
                <img :src="item.goods_imgUrl" alt="" />
              </div>
              <div class="goods-content">
                <span class="info">{{ item.goods_name }}</span>
                <div class="goods-total">
                  <span class="price">¥{{ item.goods_price }}</span>
                  <span class="num">x{{ item.goods_num }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </Scroll>
    <footer>
      <div class="order-total">
        <span>共</span>
        <b>{{ allNum }}</b>
        <span>件,</span>
        <span>总金额：</span>
        <em>¥{{ allCount }}</em>
      </div>
      <div class="order-topay" @click="commitOrder">提交订单</div>
    </footer>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { commitOrderInfo, aliPay } from "@/network";
import Scroll from "@/components/common/Scroll.vue";
export default {
  name: "Order",
  components: {
    Scroll,
  },
  data() {
    return {
      radioPayment: "wx",
      startAdr: {},
    };
  },
  computed: {
    ...mapGetters("cart", ["allNum", "allCount", "checkedGood"]),
    ...mapState("user", ["addressList"]),
    ...mapGetters("user", ["orderId"]),
  },
  mounted() {
    //进入地址页后选择的新地址
    if (this.$route.query.index) {
      this.startAdr = this.addressList[this.$route.query.index];
    } else {
      //没有进入地址页选择新地址就使用默认地址
      this.startAdr = this.addressList.filter((item) => {
        return item.isDefault === "1";
      })[0];
    }
  },
  methods: {
    toAddress() {
      this.$router.push({ path: "/address", query: { type: "select" } });
    },
    async commitOrder() {
      if (!this.startAdr) {
        this.$toast("请选择收货地址");
        return;
      }
      if (this.radioPayment === "wx") {
        this.$toast("微信支付功能暂未开发，请使用支付宝支付");
        return;
      }
      //提交订单->修改订单状态(1->2)、删除购物车中对应在订单中的商品
      let goodsIdList = [];
      this.checkedGood.forEach((item) => {
        goodsIdList.push(item.goods_id);
      });
      let data = {
        goodsIdList,
        orderId: this.orderId,
      };
      let res = await commitOrderInfo(data);
      //提交订单成功，发送支付宝支付请求
      if (res.success) {
        this.$toast(res.msg);
        //支付请求发送数据:订单号、订单商品名称(所有商品转为字符串)、订单总价格
        let goodsNameList = [];
        this.checkedGood.forEach((item) => {
          goodsNameList.push(item.goods_name);
        });
        let data = {
          orderId: this.orderId,
          goodsName: goodsNameList.join(" | "),
          goodsPrice: this.allCount,
        };
        let res2 = await aliPay(data);
        console.log(res2);
        //进入支付页面
        window.location.href = res2.data;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.173333rem;
  color: #fff;
  background-color: #b0352f;
  .back {
    font-size: 0.4rem;
    padding: 0 0.2667rem;
  }
  .kefu {
    font-size: 0.48rem;
    padding: 0 0.2667rem;
  }
  span {
    font-weight: 300;
    font-size: 0.48rem;
  }
}
.wrapper {
  // height: calc(100vh - 3.44rem);
  height: 14.3467rem;
  overflow: hidden;
  section {
    background-color: #f7f7f7;
    .payment-title {
      font-size: 0.4267rem;
      padding: 0.2667rem;
      border-bottom: 0.0267rem solid #efefef;
    }
    .path-content {
      padding: 0.16rem 0.4rem;
      font-size: 0.373333rem;
      background-color: #ffffff;
      span {
        padding-right: 0.16rem;
      }
    }
    .payment {
      .van-radio-group {
        display: flex;
        padding: 0.4rem;
        font-size: 0.426666rem;
        background-color: #ffffff;
        .van-radio {
          padding-right: 0.266666rem;
        }
      }
    }
    .goods {
      ul {
        padding: 0.4rem;
        font-size: 0.426666rem;
        background-color: #ffffff;
        li {
          display: flex;
          padding: 0.4rem 0;
          border-bottom: 0.0267rem solid #efefef;
          &:last-child {
            border: none;
          }
          img {
            border: 0.0267rem solid #efefef;
            width: 1.973333rem;
            height: 1.973333rem;
          }
          .goods-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-left: 0.4rem;
            .info {
              font-size: 0.3733rem;
            }
            .goods-total {
              display: flex;
              justify-content: space-between;
              .price {
                font-size: 0.4267rem;
                color: #b0352f;
                font-weight: 600;
              }
              .num {
                font-size: 0.4267rem;
                font-weight: 600;
              }
            }
          }
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1.2rem;
  box-shadow: 0 -0.0533rem 0.16rem #efefef;
  z-index: 999;
  background-color: white;
  .order-total {
    font-size: 0.426666rem;
    span {
      padding: 0 0.16rem;
    }
    b {
      color: #b0352f;
    }
    em {
      font-size: 0.48rem;
      color: #b0352f;
    }
  }
  .order-topay {
    width: 3.2rem;
    line-height: 1.2rem;
    color: #fff;
    font-size: 0.426666rem;
    text-align: center;
    background-color: #b0352f;
  }
}
</style>
