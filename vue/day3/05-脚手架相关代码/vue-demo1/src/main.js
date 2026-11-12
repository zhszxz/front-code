import Vue from 'vue'
import App from './App.vue'
// 全局注册组件，注册后可以在任何组件中使用
import HmButton from './components/HmButton.vue'

Vue.component('HmButton', HmButton);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
