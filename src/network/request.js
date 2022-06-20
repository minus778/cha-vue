import axios from 'axios'
import { Toast } from 'vant';
import store from '@/store'

const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
})

//2、配置请求拦截器
requests.interceptors.request.use(config => {
    //config内主要是对请求头Header配置
    //比如添加token
    //操作涉及购物车时在请求头添加token验证是否登录
    // let urlList = ['/goods/addCart', '/goods/getFromCart', '/goods/deleteGood',
    //     '/goods/updateNum', '/user/saveAdrInfo', '/user/getAdrInfo', '/user/deleteAdrInfo',
    //     '/user/getOrder', '/user/commitOrder', '/user/aliPay', '/user/getPayStatus']
    // if (urlList.includes(config.url)) {
    //如果处于登录状态就添加请求头验证登录是否过期,如果有token就在所有请求的请求头都带上token，是否判断token交给node后端
    if (localStorage.getItem('userToken')) {
        config.headers.token = localStorage.getItem('userToken')
    }
    // }
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
    });
    return config;
})
//3、配置响应拦截器
requests.interceptors.response.use((res) => {
    Toast.clear();
    //成功的回调函数
    return res.data;
}, (error) => {
    //返回401错误则代表token过期
    if (error.response.status === 401) {
        Toast('登录状态过期，请重新登录');
        // Toast('登录状态过期，请重新登录')
        //token过期后清除localStorage存储的token和用户信息
        store.commit('user/loginOut')
        // localStorage.removeItem('userToken')
        // localStorage.removeItem('userInfo')
        // localStorage.removeItem('cartList')
        // localStorage.removeItem('addressInfo')
        Toast.clear();
        //跳转到登录页
        setTimeout(() => {
            window.location.href = '/userLogin'
        }, 700);
    } else {
        //失败的回调函数
        Toast.fail('请求异常');
        Toast.clear();
        console.log("响应失败" + error)
        return Promise.reject(new Error('fail'))
    }
})
//4、对外暴露
export default requests;
