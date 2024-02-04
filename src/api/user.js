import request from '@/utils/request.js'

// 登录接口调用
export const loginByUser = (obj) => {
  return request.post('/user/login', obj)
}
// 获取个人用户信息
export const getUserInfo = () => {
  return request.get('/user/getUserInfo')
}

// 注册接口调用
export const register = (userinfo) => {
  return request.post('/user/register', userinfo)
}
