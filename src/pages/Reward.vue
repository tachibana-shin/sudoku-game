<template>
  <v-card flat class="wrap fill-height">
    <v-app-bar app fixed color="white-f5">
      <v-btn icon @click="hasHistory ? $router.back() : $router.replace('/')">
        <v-icon> mdi-close </v-icon>
      </v-btn>
      <v-toolbar-title> Phần thưởng </v-toolbar-title>
      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title color="blue">
          <v-tabs-slider color="blue"></v-tabs-slider>
          <v-tab>
            Thử thách
          </v-tab>
          <v-tab>
            Sự kiện
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-container fluid>
            <v-row>
              <v-col cols="4" md="3" xl="2" xs="1" v-for="(item, index) in cups" :key="index" class="d-flex align-end">
                <div class="text-center cup" :class="{ active: checkCup(index) }">
                  <img :src="item">
                  </v-img>
                  Tháng {{ index + 1 }}
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item class="fill-height">
        <v-card flat class="fill-height">
          <v-container fluid class="fill-height">
            <v-row align="center" justify="space-between" class="fill-height">
              <v-col cols="12">
                <div class="text-center">
                  <v-img width="3em" :src="require('@/assets/badge.png')" class="mx-auto" />
                  <h2 class="text-h6 mt-3"> Bạn chưa có huy hiệu nào </h2>
                  <small class="text-secondary"> Tham gia các sự kiện để nhận huy chương </small>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
  const cups = []

  for (let index = 0; index < 12; index++) {
    cups.push(
      require(`@/assets/cup_${index + 1}.png`)
    )
  }

  function countDaysOfMonth(month) {
    if (month == 1) {
      return 31
    }
    if (month == 2) {
      return (new Date().getFullYear() % 4 == 0 || new Date().getFullYear() % 100) ? 29 : 28
    }
    if (month > 2 && month < 8) {
      return month % 2 ? 31 : 30
    }
    return month % 2 ? 30 : 31
  }

  export default {
    data: () => ({
      tab: null,
      cups
    }),
    methods: {
      checkCup(month) {
        return this.$store.state.playgroundChallenges.history.filter(item => item.typeName.split("-")[1] == month) == countDaysOfMonth(month)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .wrap {
    .cup {
      margin: {
        left: 15px;
        right: 15px;
        top: auto;
        bottom: 0;
      }

      ;

      img {
        display: block;
        margin: auto;
        width: 100%;
        max-width: 100px;
        max-height: 160px;
        filter: opacity(.2) drop-shadow(0 0 0 #d0d6f2);
      }

      &.active {
        img {
          filter: none;
        }
      }
    }

    &>>>.v-window__container,
    &>>>.v-window {
      height: 100%
    }
  }
</style>