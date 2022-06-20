const state = {
    loginStatus: JSON.parse(localStorage.getItem('userInfo')) ? true : false,  //登录状态
    token: localStorage.getItem('userToken') || '',	//token
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},  //用户信息：用户的头像|用户昵称
    addressList: JSON.parse(localStorage.getItem('addressInfo')) || [],   //用户地址信息
    orderInfo: JSON.parse(localStorage.getItem('orderInfo')) || {},  //用户订单信息(订单号)
}
const mutations = {
    //用户登录成功保存用户信息
    saveUserInfo(state, info) {
        state.userInfo = info
        state.loginStatus = true
        state.token = info.token
        localStorage.setItem('userToken', info.token)
        //持久化存储到localstorage里
        localStorage.setItem('userInfo', JSON.stringify(info))
    },
    //退出登录
    loginOut() {
        //清空localstorage中存储的用户信息
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userToken')
        localStorage.removeItem('addressInfo')
        localStorage.removeItem('cartList')
        localStorage.removeItem('orderInfo')
        state.userInfo = {}
        state.loginStatus = false
        state.token = null
    },
    //保存用户地址信息
    saveAddress(state, info) {
        state.addressList = info
        //持久化存储到localstorage里
        localStorage.setItem('addressInfo', JSON.stringify(info))
    },
    //保存用户订单信息
    saveOrderInfo(state, info) {
        state.orderInfo = info
        //持久化存储到localstorage里
        localStorage.setItem('orderInfo', JSON.stringify(info))
    },
}
const getters = {
    //返回当前用户订单的订单编号
    orderId(state) {
        return state.orderInfo.order
    }
}
const actions = {}

export default {
    // 为当前模块开启命名空间
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}