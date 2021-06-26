import Vue from 'vue'
import Vuex from 'vuex'
import task from './modules/task'
import snackbar from './modules/snackbar'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    task, snackbar
  }
})
