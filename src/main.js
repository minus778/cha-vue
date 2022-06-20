import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入公共样式文件
import '@/assets/css/common.css'
//引入阿里字体图标css文件
import '@/assets/css/iconfont.css'
//引入淘宝适配js文件
import '@/assets/js/flexible'
//引入首页头部tabbar切换栏
import LyTab from 'ly-tab'
Vue.use(LyTab)

//引入vue-lazyload图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('./assets/images/placeholder.jpg')
})

//按需引入vantUI
import { Checkbox, CheckboxGroup, Stepper, AddressEdit, RadioGroup, Radio, Toast, NoticeBar, Dialog, Swipe, SwipeItem } from 'vant';

Vue.use(Checkbox).use(CheckboxGroup).use(Stepper).use(AddressEdit).use(RadioGroup).use(Radio).use(Toast).use(NoticeBar).use(Dialog).use(Swipe).use(SwipeItem);

//定义全局组件
import Tabbar from "@/components/common/Tabbar.vue"
Vue.component(Tabbar.name, Tabbar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
