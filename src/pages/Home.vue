<template>
  <v-card flat color="lighten" class="wrap">
    <v-app-bar app flat fixed color="lighten">
      <v-spacer />
      <v-spacer />
      <v-btn icon to="/reward">
        <v-icon> mdi-trophy </v-icon>
      </v-btn>
      <app-bar-menu />
    </v-app-bar>
    <v-card-text class="card-text">
      <v-card class="mx-auto challenges-days" width="160px" color="white">
        <v-img class="mx-auto" width="35px" height="35px" :src="require('@/assets/cal-star.png')" />
        <p class="v-title"> Thử thách hàng ngày </p>
        <p class="v-subtitle"> Tháng {{ new Date().getMonth() + 1 }} {{ new Date().getDate() }} </p>
        <v-btn class="blue--text play" outlined to="/playground"> Chơi </v-btn>
      </v-card>
      <h1 class="title text-h4 text-center dark--text"> Sudoku.com </h1>
      <div class="btns">
        <v-btn class="item" color="blue" dark block large to="/playground" v-if="playing">
          <div class="text-center">
            Tiếp tục trò chơi
            <small class="d-block font-weight-normal grey--text text--lighten-3 text-capitalize">
              <v-icon size="1em">
                mdi-clock-outline
              </v-icon>
              {{ playing.time | time }} {{ playing.typeName }}
            </small>
          </div>
        </v-btn>
        <bottom-sheet-play-game>
          <v-btn class="item play-game blue--text" color="white" block large @click="sheet = true" slot="activator" slot-scope="{ on }" v-on="on"> Ván mới </v-btn>
        </bottom-sheet-play-game>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
  import AppBarMenu from "@/components/AppBarMenu"
  import BottomSheetPlayGame from "@/components/BottomSheet-PlayGame"
  import { time } from "@/filters"

  export default {
    components: {
      AppBarMenu,
      BottomSheetPlayGame
    },
    computed: {
      playing() {
        if (this.$store.state.playground.mapSudoku) {
          return this.$store.state.playground
        }
      }
    },
    filters: {
      time
    }
  }
</script>
<style lang="scss" scoped>
  .wrap {
    border: 0;

    .challenges-days {
      padding: 15px 5px;

      .v-title {
        font-size: 14px;
        font-family: sans-serif;
        font-weight: 500;
        text-align: center;
        margin-top: 10px !important;
      }

      .v-subtitle {
        font-size: 12px;
        color: #646869;
        text-align: center;
      }

      .play {
        background-color: #f3f8fc !important;
        display: block;
        margin-top: 15px;
        margin-left: auto;
        margin-right: auto;
        border: 0;
      }
    }

    .title {
      margin-top: 100px;
      color: #344760;
      font-weight: 500;
    }

    .btns {
      margin: {
        left: 25px;
        right: 25px;
        top: 30px;
      }

      ;

      .item {
        margin-top: 10px;

        &:first-child {
          margin-top: 15px;
        }
      }

      .play-game {
        min-width: 0 !important;
        display: block;
        width: 100%;
      }
    }
  }
</style>