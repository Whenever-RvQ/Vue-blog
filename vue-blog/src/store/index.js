import Vue from 'vue'
import Vuex from 'vuex'
import store from 'store'
import base from '@/config/base.config'
import http from '@/api/http'

import modal from './modules/modal'

const { TOKEN_NAME } = base

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: store.get(TOKEN_NAME) || "",
    userInfo: store.get('userInfo') || "",
    username: store.get('username') || "",
    welcome: store.get('welcome') || false,
  },
  getters: {
    userInfo(state) {
      if (state.token) {
        return state.userInfo
      }
    }
  },
  mutations: {
    SET_TOKEN(state) {
      state.token = store.get(TOKEN_NAME)
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
      store.set('userInfo', userInfo)
    },

    SET_USERNAME(state, username) {
      state.username = username
      store.set('username', username)
    },
    SET_WELCOME(state, welcome) {
      state.welcome = welcome
      store.set('welcome', welcome)
    }
  },
  actions: {
    async login({ dispatch, commit }) {
      commit('SET_TOKEN')
      dispatch('getUserInfo')


    },
    async getUserInfo({ commit, state }) {
      try {
        let userList = await http({ type: 'getUsers' })
        userList = userList.list
        let username = state.username
        let userInfo

        if (userList && Array.isArray(userList)) {
          userList.forEach(item => {
            if (item.username === username) {
              userInfo = item
            }
          })
        }

        commit('SET_USERNAME', state.username)
        commit('SET_USERINFO', userInfo)

        if (!state.welcome && userInfo) {
          commit('SET_WELCOME', true)
          Vue.prototype.$notify.success({
            title: '登录成功',
            message: `欢迎你 ${userInfo.nikname}`
          })
        }

        return userInfo // 返回用户信息
      } catch (err) {
        console.log(err)
        return null
      }
    }
  },
  modules: {
    modal
  }
})
