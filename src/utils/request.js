// 创建axios实例，将创建出来的实例进行自定义配置
// 不会污染原始的 axios实例
import axios from 'axios'
import router from '@/router'
import { Toast } from 'vant'
import { getInfo } from './storage'

// const ServerUrl = 'http://192.168.0.185:10088/user'
// const CommonUrl = 'http://192.168.0.185:10088'

const ServerUrl = 'http://localhost:10088/user'
const CommonUrl = 'http://localhost:10088'

const instance = axios.create({
  baseURL: ServerUrl,
  timeout: 20000
})
// 自定义配置 请求/响应 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启loading，禁止背景点击，（节流处理，防止多次无效触发）
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
    loadingType: 'spinner'
  })
  if (config.url.includes('common')) {
    config.baseURL = CommonUrl
  }
  let token
  try {
    const jStr = getInfo()
    token = JSON.parse(jStr).jwt
  } catch (error) {
    console.log(error)
  }
  if (token !== null && token !== '') {
    config.headers.authentication = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.data.code !== 1) {
    // 给提示
    Toast.fail(response.data.msg)
    // 抛出一个错误的promise
    return response
  } else {
    Toast.clear()
  }
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  Toast.clear()
  if (error.code === 'ERR_NETWORK') {
    Toast.fail('网络错误')
    return Promise.reject(error)
  }
  // 检查错误类型并给出相应提示
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 身份验证失败的错误处理
        Toast.fail('身份验证失败，请重新登录!')
        router.push('/login')
        break
      // 可以根据需要处理更多的HTTP错误状态码
      case 'ERR_NETWORK':
        Toast.fail('网络错误')
        break
      default:
        Toast.fail('发生错误')
        console.log(error)
        break
    }
  } else {
    // 不是来自HTTP响应的错误
    Toast.fail('服务器错误')
    console.log(error)
  }
  return Promise.reject(error)
})
// 导出实例
export default instance
