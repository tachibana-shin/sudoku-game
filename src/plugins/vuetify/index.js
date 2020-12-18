import "@mdi/font/css/materialdesignicons.css" // Ensure you are using css-loader
import Vue from "vue"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
import colors from "vuetify/lib/util/colors"

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: colors.purple,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
        lighten: "#f3f8fc",
        "white-real": "#fff",
        "black-real": "#000",
        "white-f5": "#f5f5f5"
      },
      dark: {
        primary: colors.blue.lighten3,
        lighten: "#222",
        white: "#000",
        dark: "#eee",
        "white-real": "#fff",
        "black-real": "#000"
      },
    }
  }
});