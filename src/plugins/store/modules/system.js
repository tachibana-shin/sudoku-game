export default {
  namespaced: true,
  state: {
    dark: false,
    lang: navigator.language,
    __uuid: 0
  },
  mutations: {
    plusUUID: (state) => state.__uuid++
  },
  actions: {
    uuid({ commit, state }) {
      commit("plusUUID")
      return state.__uuid
    }
  }
}