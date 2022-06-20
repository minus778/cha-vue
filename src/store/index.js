import Vue from 'vue'
import Vuex from 'vuex'

//引入子仓库
import userModule from './modules/user'
import cartModule from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    //挂载子仓库
    //起别名
    user: userModule,
    cart: cartModule
  }
})