import Vue from "vue"
import Vuex from "vuex"
import playground from "./modules/playground"
import settings from "./modules/settings"
import system from "./modules/system"
import createPersistedstate from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    playground: playground(),
    settings,
    playgroundChallenges: playground(),
    system
  },
  plugins: [
    createPersistedstate({
      paths: ["playground", "settings.config", "system"]
    }),
    createPersistedstate({
      storage: sessionStorage,
      paths: ["playgroundChallenges"]
    })
  ],
  strict: process.env.NODE_ENV !== 'production'
});