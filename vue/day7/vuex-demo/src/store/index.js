import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import setting from './modules/setting.js'

// 注册vuex插件
Vue.use(Vuex)
// 创建vuex实例对象
const store = new Vuex.Store({
  // 开启严格模式
  strict: true,
  // 利用 state 状态对象提供共享数据
  state: {
    title: '大标题',
    count: 100
  },
  // mutations 提供同步修改 state 的方法
  mutations: {
    // 自定义参数不能多于一个
    addCount (state, n) {
      state.count += n
    },
    setCount (state, n) {
      state.count = n
    },
    setTitle (state, title) {
      state.title = title
    }
  },
  // actions 提供异步修改 state 的方法
  actions: {
    setTitle (context, title) {
      setTimeout(() => {
        // actions 仍需要通过 mutations 来修改 state
        context.commit('setTitle', title)
      }, 1000)
    }
  },
  // modules 注册vuex子模块到根store中
  modules: {
    user,
    setting
  }
})
// 导出store对象
export default store
