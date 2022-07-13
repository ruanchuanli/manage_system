import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/api/user'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null
  },
  getters: {
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    async login (context, data) {
      const res = await login(data)
      console.log(res.token)
      context.commit('setToken', res.token)
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
