import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

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
      state.user = user
    },
  },
  actions: {
    updateUser({ commit }, user) {
      commit('setUser', user)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
