import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ws: null
  },
  getters: {
    token (state) {
      return state.user.userInfo.token
    }
  },
  mutations: {
    setWs (state, ws) {
      state.ws = ws
    }
  },
  actions: {
    setWsAction ({ commit }, userId) {
      const ws = new WebSocket('ws://localhost:10088/user/ws/' + userId)
      commit('setWs', ws)
    }
  },
  modules: {
    user
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})
