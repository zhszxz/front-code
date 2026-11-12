import Vue from 'vue'
import App from './App.vue'
// 导入组件
import Find from './views/Find.vue'
import Friend from './views/Friend.vue'
import My from './views/My.vue'


Vue.config.productionTip = false

// 路由的使用步骤 5 + 2

// 基础5步
// 1.下载  yarn add vue-router@3.6.5
// 2.引入
// 3.注册
// 4.创建路由对象
// 5.将路由对象挂载到Vue实例上

// 关键两步
// 1.创建组件，配置路由规则
// 2.配导航，配路由出口

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
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
