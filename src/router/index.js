import Vue from 'vue'
import VueRouter from 'vue-router'
import { Toast } from 'vant'

Vue.use(VueRouter)

//解决路由版本更新出现的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import('@/views/Home.vue')
  },
  {
    path: "/list",
    name: "list",
    component: () => import('@/views/List.vue')
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import('@/views/Cart.vue')
  },
  {
    path: "/my",
    name: "my",
    component: () => import('@/views/My.vue')
  },
  {
    path: "/search",
    component: () => import('@/views/Search.vue'),
    children: [
      {
        path: "/",
        name: "serIndex",
        component: () => import('@/views/search/Index.vue')
      },
      {
        path: "list",
        name: "list",
        component: () => import('@/views/search/List.vue')
      }
    ]
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import('@/views/Detail.vue')
  },
  {
    path: "/login",
    name: "login",
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: "/userLogin",
    name: "userLogin",
    component: () => import('@/views/login/UserLogin.vue')
  },
  {
    path: "/register",
    name: "register",
    component: () => import('@/views/login/Register.vue')
  },
  {
    path: "/searchPwd",
    component: () => import('@/views/SearchPwd.vue'),
    children: [
      {
        path: '/',
        name: 'one',
        component: () => import('@/views/searchPwd/SearchPwdOne.vue')
      },
      {
        path: 'reinputPwd',
        name: 'reinputPwd',
        component: () => import('@/views/searchPwd/SearchPwdTwo.vue')
      }
    ]
  },
  {
    path: "/address",
    component: () => import('@/views/Address.vue'),
    children: [
      {
        path: '/',
        name: 'adrIndex',
        component: () => import('@/views/address/Index.vue')
      },
      {
        path: 'editAdr',
        name: 'editAdr',
        component: () => import('@/views/address/UpdateAdr.vue')
      },
    ]
  },
  {
    path: "/order",
    name: "Order",
    component: () => import('@/views/Order.vue')
  },
  {
    path: "/payment",
    name: "payment",
    component: () => import('@/views/Payment.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

//路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('userToken') ? true : false
  if (to.path === '/cart') {
    if (isLogin) {
      next()
    } else {
      //没有处于登录状态
      localStorage.removeItem('cartList')
      Toast('请先登录后再查看购物车')
      next('/login')
    }
  } else {
    next()
  }
})


export default router
