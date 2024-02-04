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
  return request.get('/post', {
    params: {
      page,
      pageSize
    }
  })
}
