import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 全局注册自定义指令
// Vue.directive('focus', {
//   // 当元素插入到 DOM 中时执行
//   inserted(el) {
//     //el：指定作用的元素
//     el.focus()
//   }
// })


new Vue({
  render: h => h(App),
}).$mount('#app')
