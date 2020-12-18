export default () => ({
  namespaced: true,
  state: {
    config: {
      mapSudoku: null,
      itemHoverOffset: null,
      modeNote: false,
      countSuggest: 5,
      countWrong: 0,
      time: 0,
      id: -1,
      typeName: ""
    },
    history: []
  },
  mutations: {
    "saveData"({ history }, payload) {
      if (!history.find(item => item.id == payload.id)) {
        history.push(payload)
      }
    },
    "setItemInMapSudoku"({ config }, { x, y, payload }) {
      Object.assign(config.mapSudoku[y][x], payload)
    },
    "resetPlayground"(state) {
      state.config = {
        mapSudoku: null,
        itemHoverOffset: null,
        modeNote: false,
        countSuggest: 5,
        countWrong: 0,
        time: 0,
        typeName: ""
      }
    },
    "setPlayground"(state, payload) {
      state.config = {
        ...state.config,
        ...payload
      }
    },
    "setMapSudoku"({ config }, payload) {
      config.mapSudoku = payload
    },
    "setItemHoverOffset"({ config }, payload) {
      config.itemHoverOffset = payload
    },
    "setModeNote"({ config }, payload) {
      config.modeNote = payload
    },
    "setCountSuggest"({ config }, payload) {
      config.countSuggest = payload
    },
    "setCountWrong"({ config }, payload) {
      config.countWrong = payload
    },
    "setTime"(state, time) {
      state.config.time = time
    }
  }
});