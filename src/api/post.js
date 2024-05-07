import request from '@/utils/request'

// 获取自己作品接口
export const getMyPost = (page, pageSize) => {
  return request.get('/post/myself', {
    params: {
      page,
      pageSize
    }
  })
}

// 获取所有作品
export const getPostList = (page, pageSize) => {
  return request.get('/post/all', {
    params: {
      page,
      pageSize
    }
  })
}

// 获取点赞过的作品
export const getMyLike = () => {
  return request.get('/post/getMyLike')
}

// 获取收藏过的作品
export const getMyColl = () => {
  return request.get('/post/getMyColl')
}

// 根据tag获取作品
export const getPostByTag = (page, pageSize, tagId) => {
  return request.get('/post/byTag', {
    params: {
      page,
      pageSize,
      tagId
    }
  })
}

// 根据id获取作品
export const getPostById = (postId) => {
  return request.get(`/post/postDetail/${postId}`)
}
// 获取某个用户的作品
export const getPostByUser = (userId) => {
  return request.get(`/post/byUser/${userId}`)
}

// 发布作品接口
export const addPost = (postObj) => {
  return request.post('/post', postObj)
}

// 点赞接口
export const like = (postId) => {
  return request.get(`/like/${postId}/byId`)
}

// 获取点赞状态
export const getIsLiked = (postId) => {
  return request.get(`/like/${postId}`)
}

// 获取点赞数量
export const getLikeCount = (postId) => {
  return request.get(`/post/likes/${postId}`)
}

// 收藏接口
export const collection = (postId) => {
  return request.get(`/collection/${postId}`)
}
// 搜索帖子
export const queryLikePost = (keyWord) => {
  return request.get('/post/queryLike', {
    params: {
      keyWord
    }
  })
}

// 获取作品详情
export const getPostDetail = (postId) => {
  return request.get(`/post/postDetail/${postId}`)
}
// 添加浏览记录
export const addHistory = (postId) => {
  return request.get(`/b-history/${postId}`)
}
// 获取浏览记录
export const getBrowsHistory = () => {
  return request.get('/b-history/getPostHistory')
}
// 删除浏览记录
export const delHistory = (postId) => {
  return request.delete(`/b-history/${postId}`)
}
// 获取点赞最高的10个帖子
export const getBestLike = () => {
  return request.get('/post/getBestLike')
}

// 删除帖子
export const deletePost = (postId) => {
  return request.delete(`/post/${postId}`)
}
