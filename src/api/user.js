import request from '@/utils/request.js'

// 登录接口调用
export const loginByUser = (obj) => {
  return request.post('/user/login', obj)
}
// 获取当前用户信息
export const getUserInfo = () => {
  return request.get('/user/getUserInfo')
}

// 根据id获取个人用户信息
export const getUserInfoById = (userId) => {
  return request.get(`/user/${userId}/byId`)
}

// 根据用户昵称查询
export const getUserInfoByNick = (keyWord) => {
  return request.get('/user/queryNickname', {
    params: {
      keyWord
    }
  })
}

// 注册接口调用
export const register = (userinfo) => {
  return request.post('/user/register', userinfo)
}

// 修改个人信息
export const updateUser = (user) => {
  return request.put('/user/updateUser', user)
}
export const updateUserInfo = (user) => {
  return request.put('/user/updateUserInfo', user)
}
