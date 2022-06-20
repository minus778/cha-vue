<template>
  <div class="path-index container">
    <Header @back="$router.push('/address')">
      <span>{{ $route.query.type === "add" ? "添加" : "编辑" }}地址</span>
    </Header>
    <section>
      <van-address-edit
        :area-list="areaList"
        show-set-default
        @save="onSave"
        v-if="type"
      />
      <van-address-edit
        :area-list="areaList"
        :address-info="adrInfo"
        show-delete
        show-set-default
        @save="onSave"
        @delete="onDelete"
        v-else
      />
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "@/components/address/Header.vue";
import { saveAddressInfo, deleteAdressInfo } from "@/network";
import { mapState } from "vuex";
export default {
  name: "UpdateAdr",
  data() {
    return {
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市",
        },
        city_list: {
          110100: "北京市",
          120100: "天津市",
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          120101: "塘沽区",
        },
      },
      adrInfo: {},
      //为true代表添加，false代表修改
      type: "",
      index: -1,
    };
  },
  components: {
    Header,
  },
  mounted() {
    this.type = this.$route.query.type === "add" ? true : false;
    //如果是编辑地址就执行下面代码，防止浏览器报变量不存在的错
    if (!this.type) {
      this.index = this.$route.query.index;
      this.adrInfo = this.addressList[this.index];
      this.adrInfo.isDefault = this.adrInfo.isDefault === "1" ? true : false;
    }
  },
  computed: {
    ...mapState("user", ["addressList"]),
  },
  methods: {
    async onSave(content) {
      let {
        name,
        tel,
        province,
        city,
        county,
        addressDetail,
        isDefault,
        areaCode,
      } = content;
      //方便数据库存储
      isDefault = isDefault ? 1 : 0;
      let data = {
        name,
        tel,
        province,
        city,
        county,
        addressDetail,
        isDefault,
        areaCode,
        //向后端传入操作的是添加还是修改
        type: this.type,
        //如果是修改地址需要传入index
        index: this.index,
      };
      let res = await saveAddressInfo(data);
      this.$toast(res.msg);
      this.$router.push({
        path: "/address",
        query: { change: true },
      });
    },
    async onDelete() {
      let res = await deleteAdressInfo({ index: this.index });
      this.$toast(res.msg);
      this.$router.push({
        path: "/address",
        query: { change: true },
      });
    },
  },
};
</script>

<style lang='scss' scoped>
section {
  background-color: #f7f7f7;
  .van-address-edit {
    padding: 0;
  }
  ::v-deep .van-address-edit__buttons {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  ::v-deep .van-switch--on {
    background-color: #b0352f;
  }
  ::v-deep .van-button--danger {
    width: 8rem;
    height: 1.066666rem;
    background-color: #b0352f;
  }
  ::v-deep .van-button--default {
    width: 8rem;
    height: 1.066666rem;
  }
}
</style>
