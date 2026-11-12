// cart 模块
import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  mutations: {
    setList (state, list) {
      state.list = list
    },
    updateItemCount (state, { id, count }) {
      state.list.forEach(item => {
        if (item.id === id) {
          item.count = count
        }
      })
    }
  },
  actions: {
    async getList (context) {
      const res = await axios.get('http://localhost:3000/cart')
      console.log(res)

      context.commit('setList', res.data)
    },
    async updateItemAsync (context, item) {
      const res = await axios.patch(`http://localhost:3000/cart/${item.id}`, {
        count: item.count
      })
      console.log(res)
      if (res.status !== 200) {
        throw new Error('更新失败')
      }
      context.commit('updateItemCount', {
        id: item.id,
        count: item.count
      })
    }
  },
  getters: {
    // 总数
    totalCount (state) {
      return state.list.reduce((total, item) => total + item.count, 0)
    },
    // 总价
    totalPrice (state) {
      return state.list.reduce((total, item) => total + item.count * item.price, 0)
    }
  }
}
