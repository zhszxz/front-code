// vuex分模块 user模块
const state = {
  userInfo: {
    name: 'zs',
    age: 18
  },
  score: 80
}
const mutations = {
  setUser (state, newUserInfo) {
    state.userInfo = newUserInfo
  }
}
const actions = {
  setUserSecond (context, newUserInfo) {
    // 将异步在action中进行封装
    setTimeout(() => {
      // 调用mutation   context上下文，默认提交的就是自己模块的action和mutation
      context.commit('setUser', newUserInfo)
    }, 1000)
  }
}
const getters = {
  UpperCaseName (state) {
    return state.userInfo.name.toUpperCase()
  }
}

export default {
  // 开启命名空间,避免子模块mutations,actions,getters直接合并到全局命名空间
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
