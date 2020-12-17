import Vue from "vue"
import Vuex from "vuex"
import playground from "./modules/playground"
import settings from "./modules/settings"
import createPersistedstate from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dark: false
  },
  modules: { playground, settings },
  plugins: [
    createPersistedstate({
      paths: ["playground", "settings.config", "dark"]
    })
  ],
  strict: process.env.NODE_ENV !== 'production'
});