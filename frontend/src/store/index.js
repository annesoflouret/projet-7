import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // création d'un modele d'user dans la bibliothèque
    user: {
      username: null,
      userId: null,
      token: null,
      email: null,
      isAdmin: null
    },
  },
  mutations: {
    setUser(state, user) {
      state.user.username = user.username,
        state.user.token = user.token,
        state.user.userId = user.userId,
        state.user.email = user.email,
        state.user.isAdmin = user.isAdmin
    },
  },
  actions: {
    updateUser({ commit }, user) {
      commit('setUser', user)
    }
  },
  modules: {
  }
})
