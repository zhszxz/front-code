import Home from '@/views/Home'
import Search from '@/views/Search'
import NotFound from '@/views/NotFound'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) // VueRouter插件初始化

// 创建了一个路由对象
const router = new VueRouter({
  mode: 'history',
  routes: [
    // 给路由起名字
    { name: 'index', path: '/', redirect: '/home' },
    { name: 'home', path: '/home', component: Home },
    { name: 'search', path: '/search/:words?', component: Search },
    { name: 'notFound', path: '*', component: NotFound }
  ]
})

export default router