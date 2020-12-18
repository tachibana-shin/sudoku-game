<template>
  <v-app id="app">
    <v-main>
      <router-view />
    </v-main>
    <v-bottom-navigation color="blue" grow shift fixed v-if="$route.meta.bottomNavigator" app>
      <v-btn to="/">
        <span> Trang chủ </span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn to="/challenges">
        <span>Thử thách hàng ngày</span>
        <v-icon>mdi-calendar-plus</v-icon>
      </v-btn>
      <v-btn to="/statistical">
        <span>Thống kê</span>
        <v-icon>mdi-chart-bar</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
<style lang="scss">
  #app {
    p {
      margin: 0;
      padding: 0;
    }

    .font-size-1rem {
      font-size: 1rem;
    }
  }
</style>