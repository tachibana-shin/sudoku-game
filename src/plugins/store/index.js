import Vue from "vue"
import Vuex from "vuex"
import playground from "./modules/playground"
import settings from "./modules/settings"
import playgroundChallenges from "./modules/playground-challenges"
import createPersistedstate from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dark: false,
    lang: navigator.language
  },
  modules: { playground, settings, playgroundChallenges },
  plugins: [
    createPersistedstate({
      paths: ["playground", "settings.config", "dark"]
    }),
    createPersistedstate({
      storage: sessionStorage,
      paths: ["playgroundChallenges.taskNow"]
    })
  ],
  strict: process.env.NODE_ENV !== 'production'
});