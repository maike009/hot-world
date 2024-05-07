import request from '@/utils/request'

// 获取消息列表
export const getMyReq = () => {
  return request.get('/friend/queryMyReq')
}

// 添加朋友
export const addFriend = (friObj) => {
  return request.post('/friend/addFriend', friObj)
}
// 根据id获取消息
export const getReqById = (reqId) => {
  return request.get(`/friend/queryReqById/${reqId}`)
}
