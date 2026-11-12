// vuex分模块 setting模块
const state = {
  theme: 'light', // 主题色
  desc: '测试demo'
}
const mutations = {
  setTheme (state, newTheme) {
    state.theme = newTheme
  }
}
const actions = {}
const getters = {}

export default {
  // 开启命名空间,避免子模块mutations,actions,getters直接合并到全局命名空间
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
