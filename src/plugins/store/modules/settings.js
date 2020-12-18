export default {
  namespaced: true,
  state: {
    config: {
      SOUND: true,
      TIME_WAIT: false,
      TIMER: true,


      SHOW_POINT: true,
      QUADCOPTER: false,
      DEBUG: true,
      AUTO_CHECK_BUG: true,
      HIDE_NUM_USED: true,
      HIGHLIGHT_NUM_REPEAT: true,
      HIGHLIGHT_TRELLO: true,
      HIGHLIGHT_EQAL: true,
      AUTO_RM_NOTE: true
    }
  },
  mutations: {
    setSettings({ config }, payload) {
      Object.assign(config, payload)
      if ( config.DEBUG ) {
        config.AUTO_CHECK_BUG = true
      }
    }
  }
};