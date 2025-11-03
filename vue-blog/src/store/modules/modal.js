export default {
  namespaced: true,
  state: {
    isShow: false,
    type: ''
  },
  mutations: {
    CLOSE (state) {
      state.isShow = false
    },
    OPEN (state) {
      state.isShow = true
    },
    CHANGE_TYPE (state, payload) {
      state.type = payload.type
    }
  },
  actions: {
    close ({ commit }) {
      commit('CLOSE')
    },
    open ({ commit }, type) {
      commit('CHANGE_TYPE', { type })
      commit('OPEN')
    },
    confirm () {
      console.log("提交")
    }
  },
  modules: {

  }
}