<template>
  <v-bottom-sheet :value="value" @input="$emit('input', $event)">
    <template #activator="{ on, attrs }">
      <slot name="activator" :on="on" :attrs="attrs" />
    </template>
    <v-list>
      <v-subheader> Dữ liệu cũ sẽ bị xóa </v-subheader>
      <v-list-item v-for="(value, index) in levels" :key="tile" @click="sheet = false; newGame(value)">
        <v-list-item-title> {{ names[ index ] }} </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-bottom-sheet>
</template>
<script>
  import generateNewMapSudoku from "@/js/generateNewMapSudoku.js"
  export default {
    props: {
      value: Boolean
    },
    data: () => ({
      levels: [24, 37, 45, 57, 49, 58],
      names: ["Cơ bản", "Dễ", "Trung bình", "Khó", "Chuyên gia", "Khổng lồ"]
    }),
    methods: {
      async newGame(level) {
        this.$store.commit("playground/resetPlayground")
        this.$store.commit("playground/setPlayground", {
          mapSudoku: generateNewMapSudoku(level),
          typeName: "Chuyên gia",
          id: await this.$store.dispatch("system/uuid")
        })

        this.$router.push("/playground")
      }
    }
  }
</script>