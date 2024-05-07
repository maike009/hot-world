import request from '@/utils/request'

export const getMyFriends = () => {
  return request.get('/friend/getMyFriend')
}
