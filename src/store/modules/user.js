import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    // 个人token
    return {
      userInfo: {
        info: {},
        token: ''
      }
    }
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo.info
    }
  },
  mounted () {
    console.log(getInfo())
  },
  mutations: {
    setUserToken (state, userObj) {
      state.userInfo.token = userObj.jwt
      setInfo(JSON.stringify(userObj))
    },
    setUserInfo (state, userInfoObj) {
      state.userInfo.info = userInfoObj
    }

  },
  actions: {

  }

}
