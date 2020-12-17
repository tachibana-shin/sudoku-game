<template>
  <v-menu left bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon> mdi-cog </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in menu" :key="index" :to="item.to">
        <v-list-item-title> {{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
  export default {
    data: () => ({
      menu: [
        {
          text: "Cài đặt",
          to: "/settings"
        },
        {
          text: "Luật chơi Sudoku",
          to: "/"
        },
        {
          text: "Trợ giúp",
          to: "/"
        },
        {
          text: "Giới thiệu trò chơi",
          to: "/"
        }
      ]
    })
  }
</script>