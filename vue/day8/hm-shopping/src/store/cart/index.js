// 购物车模块
import { getCartList, changeCount, delSelect } from '@/api/cart'
import { Toast } from 'vant'
import store from '@/store/index'

export default {
  namespaced: true,
  state () {
    return {
      // 购物车商品列表
      cartList: []
    }
  },
  mutations: {
    setCartList (state, list) {
      state.cartList = list
    },
    toggle (state, goodsId) {
      const item = state.cartList.find(item => item.goods_id === goodsId)
      item.isChecked = !item.isChecked
    },
    selectAll (state, checked) {
      state.cartList.forEach(item => {
        item.isChecked = checked
      })
    },
    setGoodsNum (state, { goodsNum, goodsId }) {
      const item = state.cartList.find(item => item.goods_id === goodsId)
      item.goods_num = goodsNum
    }
  },
  actions: {
    async getCartList (context) {
      // 未登录直接设空列表，避免无效请求
      if (!store.getters.token) {
        context.commit('setCartList', [])
        return
      }
      try {
        const res = await getCartList()
        res.data.list.forEach(item => {
          // 商品默认选中
          item.isChecked = true
        })
        context.commit('setCartList', res.data.list)
      } catch (e) {
        context.commit('setCartList', [])
      }
    },
    async changeCountAction (context, { goodsNum, goodsId, goodsSkuId }) {
      changeCount(goodsId, goodsNum, goodsSkuId)
        .then(res => {
          console.log(res)
          context.commit('setGoodsNum', { goodsNum, goodsId })
        }).catch(err => {
          console.log(err)
        })
    },
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      await delSelect(cartIds)
      Toast('删除成功')
      context.dispatch('getCartList')
    }
  },
  getters: {
    // 购物车商品总数
    totalNum (state) {
      return state.cartList.reduce((pre, cur) => pre + cur.goods_num, 0)
    },
    // 选中商品总数
    checkedNum (state) {
      return state.cartList.filter(item => item.isChecked).reduce((pre, cur) => pre + cur.goods_num, 0)
    },
    // 选中商品总价
    checkedPrice (state) {
      return state.cartList.filter(item => item.isChecked).reduce((pre, cur) => pre + cur.goods_num * cur.goods.goods_price_min, 0).toFixed(2)
    },
    // 选中商品列表
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 是否全选
    isAllChecked (state) {
      return state.cartList.length > 0 && state.cartList.every(item => item.isChecked)
    }
  }
}
