import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    // 个人token
    return {
      userInfo: {
        info: {},
        token: getInfo()
      }
    }
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo.info
    }
  },
  mutations: {
    setUserToken (state, token) {
      state.userInfo.token = token
      setInfo(token)
    },
    setUserInfo (state, userInfoObj) {
      console.log('???????????')
      state.userInfo.info = userInfoObj
    }

  },
  actions: {

  }

}
