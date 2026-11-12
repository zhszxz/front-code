// 用户模块
import { getUserInfo } from '@/utils/storge'

export default {
  namespaced: true,
  state () {
    return {
      userInfo: getUserInfo()
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      context.commit('cart/setCartList', [], { root: true })
    }
  }
}
