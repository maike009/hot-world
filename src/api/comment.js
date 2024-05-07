import request from '@/utils/request'

// 获取对应帖子的评论
export const getComment = (postId) => {
  return request.get(`/comment/${postId}`)
}

// 发布顶级评论
export const sendTopCom = (comment) => {
  return request.post('/comment/sendComTop', comment)
}

export const sendReply = (comment) => {
  return request.post('/comment/sendComTop', comment)
}

// 删除评论
export const delCom = (commentId) => {
  return request.delete(`/comment/${commentId}`)
}
