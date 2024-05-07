import request from '@/utils/request'
// 获取所有标签
export const getTags = () => {
  return request.get('/tags')
}
