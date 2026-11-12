import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store/index'

const instance = axios.create({
  baseURL: 'https://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: {
    platform: 'H5'
  }
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
  }
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁用背景点击
    duration: 0 // 持续时间，0表示持续显示
  })
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  const res = response.data
  if (res.status !== 200) {
    Toast.fail(res.message || '请求失败')
    return Promise.reject(res)
  }
  Toast.clear() // 关闭加载提示
  return res
}, function (error) {
  return Promise.reject(error)
})

export default instance
