import request from '@/utils/request'

// 发送邮箱验证码
export const getEmailCode = (obj) => {
  return request.post('/common/email', obj)
}

// 上传文件
export const uploadFile = (formData) => {
  return request.post('/common/upload', formData)
}
