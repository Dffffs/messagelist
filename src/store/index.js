import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginInfo: {}
  },
  mutations: {
    loginInfo(state, value){
      state.loginInfo = value
    }
  },
  actions: { 
    aEdit(context,payload){
      return new Promise((resolve,reject)=>{
        context.commit('loginInfo',payload)
        resolve()
      })
    }
  },
  modules: {
  }
})
