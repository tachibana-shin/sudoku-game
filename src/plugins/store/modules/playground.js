export default {
  state: {
    mapSudoku: null,
    itemHoverOffset: null,
    modeNote: false,
    countSuggest: 5,
    countWrong: 0,
    time: 0,
    
    typeName: "Chuyên gia"
  },
  mutations: {
    "resetPlayground"(state) {
      Object.assign(state, {
        mapSudoku: null,
        itemHoverOffset: null,
        modeNote: false,
        countSuggest: 5,
        countWrong: 0,
        time: 0
      })
    },
    "setMapSudoku"(state, payload) {
      state.mapSudoku = payload
    },
    "setItemHoverOffset"(state, payload) {
      state.itemHoverOffset = payload
    },
    "setModeNote"(state, payload) {
      state.modeNote = payload
    },
    "setCountSuggest"(state, payload) {
      state.countSuggest = payload
    },
    "setCountWrong"(state, payload) {
      state.countWrong = payload
    },
    "setTime"(state, payload) {
      state.time = payload
    }
  }
};