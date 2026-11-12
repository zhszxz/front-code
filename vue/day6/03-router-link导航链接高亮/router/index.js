// 抽取路由模块

import Vue from 'vue'

// @ : 代表 src目录
import Find from '@/views/Find.vue'
import Friend from '@/views/Friend.vue'
import My from '@/views/My.vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)
const router = new VueRouter({
  // 路由规则
  routes: [
    { path: '/find', component: Find },
    { path: '/friend', component: Friend },
    { path: '/my', component: My }
  ]
})

export default router