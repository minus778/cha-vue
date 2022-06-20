import request from './request'
import qs from 'qs'
//获取首页头部导航栏数据
export const getTopMes = () => request({ url: '/home/topMes', method: "get" })
//获取首页推荐数据
export const getHomeOneInfo = () => request({ url: "/home/index_list/0/data/1", method: "get" })
//获取首页大红袍数据
export const getHomeTwoInfo = () => request({ url: "/home/index_list/1/data/1", method: "get" })
//获取首页铁观音数据
export const getHomeThreeInfo = () => request({ url: "/home/index_list/2/data/1", method: "get" })

//获取商品列表页数据
export const getGoodsList = (params) => request({ url: "/goods/goodslist", method: "get", params })

//获取列表页数据
export const getListInfo = () => request({ url: '/list', method: 'get' })
//根据id获取商品详情页数据
export const getGoodsDetail = (cid) => request({ url: "/goods/goodsdetail", method: "get", params: { id: cid } })

//验证用户密码登录操作
export const getUserLogin = (data) => request({ url: "/user/login", method: "post", data })

//获取用户短信登录验证码
export const getUserCode = (data) => request({ url: '/user/login/code', method: "post", data })

//登录注册成功保存用户信息
export const saveUserInfo = (data) => request({ url: "/user/login/saveInfo", method: "post", data })

//保存注册用户信息
export const saveUserRegister = (data) => request({ url: '/user/login/register', method: "post", data })

//验证用户输入手机号是否存在
export const searchTel = (data) => request({ url: '/user/searchPwd/selectTel', method: 'post', data })

//用户修改密码
export const resetPwd = (data) => request({ url: "/user/searchPwd/resetPwd", method: "post", data })

//添加商品到购物车
export const addCart = (data) => request({ url: '/goods/addCart', method: "post", data })

//购物车获取所有添加至购物车中的数据
export const getCart = () => request({ url: "/goods/getFromCart", method: "get" })

//删除购物车数据
export const deleteCart = (data) => request({ url: "/goods/deleteGood", method: "post", data })

//修改购物车商品数量
export const updateNum = (data) => request({ url: '/goods/updateNum', method: "post", data })

//保存/修改地址信息
export const saveAddressInfo = (data) => request({ url: "/user/saveAdrInfo", method: "post", data })

//获取用户地址信息
export const getAddressInfo = () => request({ url: "/user/getAdrInfo", method: "get" })

//删除用户地址信息
export const deleteAdressInfo = (data) => request({ url: "/user/deleteAdrInfo", method: "post", data })

//生成订单(获取订单号)
export const getOrder = (data) => request({ url: "/user/getOrder", method: "post", data })

//提交订单
export const commitOrderInfo = (data) => request({ url: "/user/commitOrder", method: "post", data })

//支付宝支付(使用qs加密传递数据)
export const aliPay = (data) => request({ url: "/user/aliPay", method: "post", data: qs.stringify(data), headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })

//获取支付状态并更新订单状态
export const getaliPayStatus = (data) => request({ url: "/user/getPayStatus", method: "post", data: qs.stringify(data) })