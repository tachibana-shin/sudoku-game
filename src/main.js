import Vue from "vue"
import App from "./App"
import router from "./plugins/router"
import store from "./plugins/store"
import vuetify from "./plugins/vuetify"
import logs from "./plugins/logs"

Vue.use(logs)

Object.defineProperty(Vue.prototype, "hasHistory", {
  get: () => history.length > 2
})

new Vue({
  el: "#app",
  router,
  store,
  vuetify,
  components: { App },
  template: "<App/>"
})
