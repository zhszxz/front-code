import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// 修改组件引入方式为懒加载动态引入,加快首屏加载速度
const layout = () => import('@/views/layout')
const login = () => import('@/views/login')
const myorder = () => import('@/views/myorder')
const pay = () => import('@/views/pay')
const prodetail = () => import('@/views/prodetail')
const search = () => import('@/views/search/index.vue')
const searchList = () => import('@/views/search/list.vue')
const user = () => import('@/views/layout/user.vue')
const category = () => import('@/views/layout/category.vue')
const cart = () => import('@/views/layout/cart.vue')
const home = () => import('@/views/layout/home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layout,
    children: [
      { path: '/home', component: home },
      { path: '/category', component: category },
      { path: '/cart', component: cart },
      { path: '/user', component: user }
    ],
    redirect: '/home'
  },
  { path: '/login', component: login },
  { path: '/myorder', component: myorder },
  { path: '/pay', component: pay },
  { path: '/prodetail/:id', component: prodetail },
  { path: '/search', component: search },
  { path: '/searchlist', component: searchList }
]

const router = new VueRouter({
  routes
})

const authUrls = ['/pay', '/myorder']

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next()
  } else {
    const token = store.getters.token
    console.log(token)
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
