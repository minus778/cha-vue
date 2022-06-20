<template>
  <div>
    <span v-if="payStatus">支付成功</span>
    <span v-else>支付失败</span>
  </div>
</template>

<script>
import { getaliPayStatus } from "@/network";
export default {
  name: "Payment",
  data() {
    return {
      payStatus: false,
    };
  },
  created() {
    this.getPayStatus();
  },
  methods: {
    async getPayStatus() {
      //传递数据(从路由参数中获取)(后端跳转到这个页面时传递了一些query参数)订单号
      let data = {
        out_trade_no: this.$route.query.out_trade_no, //订单号
        trade_no: this.$route.query.trade_no,
      };
      let res = await getaliPayStatus(data);
      //支付成功
      if (res.data.code === 2) {
        this.payStatus = true;
      }
    },
  },
};
</script>

<style scoped lang='scss'>
div {
  text-align: center;
}
</style>