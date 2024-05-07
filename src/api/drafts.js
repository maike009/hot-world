import request from '@/utils/request'

export const getMyDrafts = () => {
  return request.get('/drafts/myDraft')
}

export const addDraft = (postObj) => {
  return request.post('/drafts/addDraft', postObj)
}

// 删除草稿
export const delDra = (postId) => {
  return request.delete(`/drafts/${postId}`)
}
