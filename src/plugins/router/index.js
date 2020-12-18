import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("@/pages/Home"),
      meta: {
        bottomNavigator: true
      }
    },
    {
      path: "/playground",
      component: () => import("@/pages/Playground"),
      meta: {
        bottomNavigator: false
      }
    },
    {
      path: "/settings",
      component: () => import("@/pages/Settings"),
      meta: {
        bottomNavigator: false
      }
    },
    {
      path: "/challenges",
      component: () => import("@/pages/Challenges"),
      meta: {
        bottomNavigator: true
      }
    },
    {
      path: "/playground-challenges",
      component: () => import("@/pages/Playground"),
      meta: {
        bottomNavigator: true,
        challenges: true
      }
    }
  ],
  scrollBehavior(from, to, saved) {
    return saved || { x: 0, y: 0 }
  }
});