<template>
  <v-card class="wrap" outlined>
    <v-app-bar class="border-0 shadow-none appbar" app fixed color="blue" dark>
      <v-toolbar-title> Thử thách hảng ngày </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon> mdi-trophy </v-icon>
      </v-btn>
    </v-app-bar>
    <v-card-text class="card-text pt-0 px-0">
      <div class="header blue">
        <div class="bg">
          <img class="bg-1" :src="require('@/assets/rays_circle_1_5x.png')" />
          <img class="bg-2" :src="require('@/assets/rays_circle_2_5x.png')" />
          <img class="bg-3" :src="require('@/assets/rays_circle_dark_1_5x.png')" />
          <img class="bg-4" :src="require('@/assets/rays_circle_dark_2_5x.png')" />
        </div>
        <h2 class="text--h5"> Tháng 12 2020 </h2>
        <img class="cup" :src="cupImage">
      </div>
      <v-date-picker :allowed-dates="filterDate" class="mx-auto" :min="`${now.year}-01-01`" :max="`${now.year}-12-31`" v-model="date" no-title full-width reactive :locale="$store.state.lang" :picker-date.sync="picker"></v-date-picker>
      <div class="play-btn">
        <v-btn color="blue" block dark large @click="playChallenges">
          Chơi
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
  function toFixed(number, length) {
    const len = number.toString().length

    return len < length ? "0".repeat(length - len) + number : number
  }

  function now() {
    const date = new Date()
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      toString() {
        return `${this.year}-${toFixed(this.month, 2)}-${toFixed(this.day, 2)}`
      }
    }
  }
  const $cupsBase64 = []

  for (let index = 0; index < 12; index++) {
    $cupsBase64.push(
      require(`@/assets/cup_${index + 1}.png`)
    )
  }

  export default {
    $cupsBase64,
    data() {
      return {
        date: now().toString(),
        picker: [now().year, toFixed(now().month, 2)].join("-")
      }
    },
    computed: {
      now,
      cupImage() {
        const [, month] = this.picker.split("-")
        return this.$options.$cupsBase64[month - 1]
      }
    },
    methods: {
      filterDate(e) {
        const [year, month, day] = e.split("-")

        return new Date(`${month}/${day}/${year}`).getTime() <= new Date(`${this.now.month}/${this.now.day}/${this.now.year}`).getTime()
      },
      playChallenges() {
        this.$store.commit("setPlaygroundChallengesTaskNow", this.date)
        this.$router.push("/playground-challenges")
      }
    }
  }
</script>
<style lang="scss" scoped>
  .wrap {
    border: 0;

    .appbar {
      z-index: 7;
    }

    .card-text {
      .header {
        height: 250px;
        padding-top: (250 / 360 * 100%);
        overflow: hidden !important;
        position: relative;

        .bg {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          top: 0;
          left: 0;

          * {
            position: absolute;
            left: -10%;
            width: 120%;
            top: -36.4%;
            opacity: .8;
            //filter: blur(1px);
          }

          .bg-3 {
            z-index: 1;
          }

          .bg-1 {
            z-index: 2;
          }

          .bg-4 {
            z-index: 3;
          }

          .bg-2 {
            z-index: 4;
          }

          .bg-1,
          .bg-3 {
            animation: rotate-360 20s linear infinite;
          }

          .bg-2,
          .bg-4 {
            animation: rotate-360 20s reverse linear infinite;
          }

          @keyframes rotate-360 {
            from {
              transform: rotate(0);
            }

            to {
              transform: rotate(360deg);
            }
          }
        }

        .cup {
          position: absolute;
          bottom: 15px;
          max-width: 150px;
          max-height: 200px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 6;
        }
      }

      .play-btn {
        margin: 10px 15px;
      }
    }
  }
</style>