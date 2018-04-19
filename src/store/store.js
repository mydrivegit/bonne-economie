import Vue from 'vue'
import Vuex from 'vuex'
import http from './../helper/axois'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: null,
    user: []
  },
  actions: {
    signup: ({commit}, authdata) => http.post('/auth/signup', authdata),
    login: ({commit}, authdata) => http.post('/auth/login', authdata),
    fetchUsersList ({commit}) {
      http.get('/users')
        .then(res => {
          commit('storeUsers', res.data.content)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchUser ({commit}) {
      http.get('/users/profile')
        .then(res => {
          commit('storeUserProfile', res.data.doc[0])
        })
        .catch(err => {
          console.log(err)
        })
    },
    modifyData: ({commit}, userdata) => http.patch('/users', userdata),
    deleteUser: ({commit}) => http.delete('/users'),
    deleteMessage: ({commit}) => http.delete('/messages')
  },
  mutations: {
    storeUsers (state, users) {
      state.users = users
    },
    storeUserProfile (state, user) {
      state.user = user
    }
  },
  getters: {
    users: (state) => state.users,
    user: (state) => state.user
  }
})
