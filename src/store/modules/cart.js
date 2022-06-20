const state = {
    cartList: JSON.parse(localStorage.getItem('cartList')) || []
}
const mutations = {
    //将数据库获取的数据保存
    saveCartList(state, list) {
        //将checked存储在本地来代替存储在数据库可以减少请求的次数
        //将state和Storage保存购物车的时机错开便于新老购物车数据对比更新checked，确保每次刷新购物车的商品选中都是正确的
        state.cartList = list
        let oldlist = JSON.parse(localStorage.getItem('cartList')) || []
        let idlist = []
        //上一次购物车存在的商品id
        oldlist.forEach(item => {
            idlist.push(item.goods_id)
        })
        //当前购物车与上一次购物车的商品进行比较获取老商品checked，新商品加上checked
        state.cartList.forEach((item) => {
            if (idlist.includes(item.goods_id)) {
                //存在就替换（老商品）
                let res = oldlist.filter(items => { return items.goods_id === item.goods_id })
                item.checked = res[0].checked
            } else {
                //不存在就加上checked属性（新商品）
                item["checked"] = true
            }
        });
        //保存至localStorage
        localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
    //全选
    AllChecked(state) {
        //解决外界检测不到state数据变化的问题
        let cartList = JSON.parse(JSON.stringify(state.cartList))
        cartList.forEach(item => {
            item.checked = true
        })
        state.cartList = cartList
        //更新
        localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
    //全不选
    AllUnChecked(state) {

        let cartList = JSON.parse(JSON.stringify(state.cartList))
        cartList.forEach(item => {
            item.checked = false
        })
        state.cartList = cartList
        //更新
        localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
    //单选按钮的点击
    clickButton(state, i) {
        let cartList = JSON.parse(JSON.stringify(state.cartList))
        cartList[i].checked = !state.cartList[i].checked
        state.cartList = cartList
        //更新
        localStorage.setItem('cartList', JSON.stringify(state.cartList))
    },
    //清空购物车数据
    deleteAllShop(state) {
        state.cartList = []
        localStorage.setItem('cartList', '[]')
    }
}
const getters = {
    //全选按钮的选中
    isAllChecked(state) {
        return state.cartList.every(item => {
            return item.checked
        })
    },
    //总件数
    allNum(state) {
        return state.cartList.reduce((n, item) => {
            return n + (item.checked ? item.goods_num : 0)
        }, 0)
    },
    //总计
    allCount(state) {
        return state.cartList.reduce((n, item) => {
            return n + (item.checked ? (item.goods_num * item.goods_price) : 0)
        }, 0)
    },
    //选中的商品
    checkedGood(state) {
        return state.cartList.filter(item => {
            return item.checked
        })
    }
}
const actions = {
    clickAll({ commit, getters }) {
        getters.isAllChecked ? commit('AllUnChecked') : commit('AllChecked')
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}