<template>
  <v-card class="wrap fill-height" outlined>
    <v-app-bar class="border-0 shadow-none" app flat fixed color="lighten">
      <v-btn icon @click="hasHistory ? $router.back() : $router.replace('/')">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title> Sudoku </v-toolbar-title>
      <v-spacer />
      <v-dialog v-model="optTheme">
        <template #activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon> mdi-palette </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            Chọn giao diện
          </v-card-title>
          <v-card-text class="text-center">
            <v-row class="ma-0">
              <v-col class="px-0" v-if="$vuetify.theme.dark">
                <v-btn fab color="white-real" @click="$vuetify.theme.dark = false"></v-btn>
              </v-col>
              <v-col class="px-0" v-else>
                <v-btn fab color="black-real" @click="$vuetify.theme.dark = true"></v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-spacer />
            <v-btn text color="blue" @click="optTheme = false"> OK </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn icon @click="paused ? playGame() : pauseGame()" :disabled="!mapSudoku">
        <v-icon> {{ paused ? "mdi-play" : "mdi-pause" }} </v-icon>
      </v-btn>
      <app-bar-menu />
    </v-app-bar>
    <v-card-text class="card-text">
      <div class="status d-flex align-center justify-space-between">
        <span> Chuyên gia </span>
        <span v-if="$store.state.settings.config.DEBUG"> Số lỗi {{ countWrong }}/3 </span>
        <span v-if="$store.state.settings.config.SHOW_POINT">
          <v-icon size="1em"> mdi-star-outline </v-icon>
          0
        </span>
        <span v-if="$store.state.settings.config.TIMER">
          <v-icon size="1em"> mdi-clock-outline </v-icon>
          {{ time | time }}
        </span>
      </div>
      <v-row class="mx-0">
        <v-col cols="12" md="6" class="pa-0">
          <div class="board">
            <div class="board-inner" v-if="mapSudoku && !paused">
              <template v-for="(item, y) in mapSudoku">
                <div class="item" v-for="(item2, x) in item" :class="{
              readonly: item2.readOnly,
              'value-equal': $store.state.settings.config.HIGHLIGHT_EQAL && itemValueEqual(item2),
              'exact-active': itemIsSelect(x, y),
              hover: $store.state.settings.config.HIGHLIGHT_TRELLO && (itemOfRow(x, y) || itemOfCol(x, y) || itemOfGroup(x, y)),
              failed: itemIsWrong(x, y, item2) && (itemIsSelect(x, y) ? $store.state.settings.config.AUTO_CHECK_BUG : $store.state.settings.config.HIGHLIGHT_NUM_REPEAT),
              suggest: item2.isSuggest,
              'mode-note': modeNoteActive(item2),
              correct: item2.value == item2.valueNow
            }" @mouseover="itemHoverOffset = { x, y }">
                  <div class="item-inner">
                    <template v-show="!modeNoteActive(item2)">
                      <span> {{ item2.valueNow }} </span>
                    </template>
                    <template v-show="modeNoteActive(item2)">
                      <div class="item-inner--row" v-for="i in 3">
                        <div class="item-inner--col" v-for="j in 3">
                          <span v-show="item2.notes.indexOf((i - 1) * 3 + j) > -1"> {{ (i - 1) * 3 + j }} </span>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
              <div class="board-paused">
                <v-btn icon @click="playGame" class="play-game" v-show="paused" outlined large>
                  <v-icon> mdi-play </v-icon>
                </v-btn>
              </div>
            </div>
            <div class="board-inner" v-else>
              <template v-for="y in 9">
                <div class="item" v-for="x in 9">
                  <div class="item-inner"></div>
                </div>
              </template>
              <div v-show="paused" class="board-paused">
                <v-btn icon @click="playGame" class="play-game" outlined large>
                  <v-icon> mdi-play </v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="pa-0">
          <div class="footer">
            <div class="tools d-flex align-center justify-space-between">
              <v-btn class="btn" @click="$logs.mapSudoku.back()" :disabled="paused || !$logs.mapSudoku.size">
                <span> Hoàn tác </span>
                <span>
                  <v-icon>mdi-undo</v-icon>
                  <small class="text" v-show="$logs.mapSudoku.size > 0"> {{ $logs.mapSudoku.size }} </small>
                </span>
              </v-btn>
              <v-btn class="btn" @click="removeItemSelect" :disabled="paused || !itemSelect || itemSelect.readOnly || itemSelect.valueNow == null">
                <span> Tẩy </span>
                <v-icon>mdi-eraser</v-icon>
              </v-btn>
              <v-btn class="btn" @click="modeNote = !modeNote" :disabled="paused">
                <span> Ghi chú </span>
                <span>
                  <v-icon>mdi-pencil</v-icon>
                  <small class="text"> {{ modeNote ? "ON" : "OFF" }} </small>
                </span>
              </v-btn>
              <v-btn class="btn" @click="addSuggest" :disabled="paused || countSuggest <= 0">
                <span> Gợi ý </span>
                <span>
                  <v-icon>mdi-lightbulb-outline</v-icon>
                  <small class="text blue--text"> {{ countSuggest }} </small>
                </span>
              </v-btn>
            </div>
            <div class="keyboard text-center">
              <v-btn v-for="i in 9" class="mr-2 mt-2" :key="i" :active="itemSelect && itemSelect.valueNow == i" @click="inputValue(i)" :disabled="paused || !itemSelect"> {{ i }} </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <bottom-sheet-play-game v-model="sheet" />
      <v-dialog :value="!!alert" @input="alert = null" persistent v-if="alert">
        <v-card>
          <v-card-title class="headline">
            {{ alert.title }}
          </v-card-title>
          <v-card-text class="text-center">
            {{ alert.message }}
            <div class="mt-5">
              <v-btn v-for="({ text, attrs, click }, index) in alert.buttons" :key="index" v-bind="attrs" @click="click"> {{ text }} </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="alertPauseGame" v-if="alertPauseGame" class="font-size-1rem" persistent>
        <v-card>
          <v-card-title class="headline text-center">
            Tạm dừng
          </v-card-title>
          <v-card-text>
            <v-row class="ma-0">
              <v-col cols="4" class="px-0 text-center">
                <small class="text--secondary">
                  Thời gian
                </small>
                <div class="font-weight-bold"> {{ time | time }} </div>
              </v-col>
              <v-col cols="4" class="px-0 text-center">
                <small class="text--secondary">
                  Số lỗi
                </small>
                <div class="font-weight-bold"> {{ countWrong }}/3 </div>
              </v-col>
              <v-col cols="4" class="px-0 text-center">
                <small class="text--secondary">
                  Độ khó
                </small>
                <div class="font-weight-bold"> {{ typeName }} </div>
              </v-col>
            </v-row>
            <div class="mt-3 text-center">
              <v-img width="32px" :src="require('@/assets/tips.png')" class="mx-auto" />
              <div class="font-weight-bold font-size-1rem text-h6 mt-1"> Gợi ý </div>
              <p class="ma-0 pa-0 text--secondary mt-1"> Sử dụng gợi ý làm tăng cơ hội qua một cấp độ </p>
            </div>
            <v-btn color="blue" block dark class="mt-3" @click="playGame"> Tiếp tục </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>
<script>
  import AppBarMenu from "@/components/AppBarMenu"
  import BottomSheetPlayGame from "@/components/BottomSheet-PlayGame"
  import { time } from "@/filters"

  function isObject(value) {
    return value !== null && typeof value == "object"
  }

  function isArray(value) {
    return isObject(value) && "length" in value
  }

  function cloneObject(object) {
    const isArr = isArray(object)
    const newObject = isArr ? [] : {}

    if (isArr) {
      for (let index = 0, length = object.length; index < length; index++) {
        if (isObject(object[index])) {
          newObject[index] = cloneObject(object[index])
        } else {
          newObject[index] = object[index]
        }
      }
    } else {
      for (const index in object) {
        if (isObject(object[index])) {
          newObject[index] = cloneObject(object[index])
        } else {
          newObject[index] = object[index]
        }
      }
    }

    return newObject
  }

  export default {
    components: {
      AppBarMenu,
      BottomSheetPlayGame
    },
    data: () => ({
      sheet: false,
      dialog: false,
      paused: true,
      mapSudoku: null,
      alert: null,
      alertPauseGame: false,
      optTheme: false
    }),
    logger: {
      mapSudoku: {
        deep: true,
        clone: true,
        immediate: true
      }
    },
    watch: {
      "$store.state.playground.mapSudoku": {
        handler(newVal) {
          this.mapSudoku = cloneObject(newVal)
        },
        immediate: true,
        deep: true
      },
      mapSudoku: {
        handler(newVal) {
          if (JSON.stringify(newVal) != JSON.stringify(this.$store.state.playground.mapSudoku)) {
            this.$store.commit("setMapSudoku", newVal)
          }
        },
        deep: true
      },
      isComplete: {
        handler(newVal) {
          if (newVal) {
            this.endGame(true)
          }
        },
        immediate: true
      },
      countWrong: {
        handler(e) {
          if (this.$store.state.settings.config.DEBUG && e > 3) {
            this.endGame(false)
          }
        },
        immediate: true
      }
    },
    computed: {
      /*
            mapSudoku: {
              get() {
                return this.$store.state.playground.mapSudoku.map(item => [...item])
              },
              set(e) {
                return this.$store.commit("setMapSudoku", e)
              }
            },*/
      typeName() {
        return this.$store.state.playground.typeName
      },
      itemHoverOffset: {
        get() {
          return this.$store.state.playground.itemHoverOffset
        },
        set(e) {
          return this.$store.commit("setItemHoverOffset", e)
        }
      },
      modeNote: {
        get() {
          return this.$store.state.playground.modeNote
        },
        set(e) {
          return this.$store.commit("setModeNote", e)
        }
      },
      countSuggest: {
        get() {
          return this.$store.state.playground.countSuggest
        },
        set(e) {
          return this.$store.commit("setCountSuggest", e)
        }
      },
      countWrong: {
        get() {
          return this.$store.state.playground.countWrong
        },
        set(e) {
          return this.$store.commit("setCountWrong", e)
        }
      },
      time: {
        get() {
          return this.$store.state.playground.time
        },
        set(e) {
          return this.$store.commit("setTime", e)
        }
      },

      itemSelect() {
        return this.itemHoverOffset && this.mapSudoku && this.mapSudoku[this.itemHoverOffset.y][this.itemHoverOffset.x]
      },
      isComplete() {
        return this.mapSudoku && this.mapSudoku.every(item => item.every(item => item.value == item.valueNow))
      }
    },
    methods: {
      itemOfRow(x, y) {
        return this.itemHoverOffset && this.itemHoverOffset.y == y
      },
      itemOfCol(x, y) {
        return this.itemHoverOffset && this.itemHoverOffset.x == x
      },
      itemOfGroup(x, y) {
        if (this.itemHoverOffset) {
          const minX = [6, 3, 0].find(item => item <= this.itemHoverOffset.x),
            minY = [6, 3, 0].find(item => item <= this.itemHoverOffset.y),
            maxX = [2, 5, 8].find(item => item >= this.itemHoverOffset.x),
            maxY = [2, 5, 8].find(item => item >= this.itemHoverOffset.y)
          return x >= minX && x <= maxX && y >= minY && y <= maxY
        } else {
          return false
        }
      },
      itemValueEqual({ valueNow }) {
        return this.itemSelect && this.itemSelect.valueNow != null && valueNow == this.itemSelect.valueNow
      },
      itemIsWrong(x, y, { readOnly, value, valueNow }) {
        if (valueNow != null) {
          return this.mapSudoku[y].some((item, xMov) => xMov != x && (item.valueNow == valueNow || item.value == valueNow)) || this.mapSudoku.some((item, yMov) => yMov != y && (item[x].valueNow == valueNow || item[x].value == valueNow))
        }
      },
      inputValue(value) {
        if (this.itemSelect && !this.itemSelect.readOnly) {
          if (this.modeNote) {
            this.itemSelect.valueNow = null
            const indexThisValue = this.itemSelect.notes.indexOf(value)
            if (indexThisValue > -1) {
              this.itemSelect.notes.splice(indexThisValue, 1)
            } else {
              this.itemSelect.notes.push(value)
            }
          } else {
            if (this.$store.state.settings.config.AUTO_RM_NOTE) {
              this.itemSelect.notes = []
            }
            if (this.itemSelect.valueNow == value) {
              this.itemSelect.valueNow = null
            } else {
              this.itemSelect.valueNow = value
              if (this.itemSelect.valueNow != this.itemSelect.value) {
                this.countWrong++
              }
            }
          }
        }
      },
      itemIsSelect(x, y) {
        return this.itemHoverOffset && this.itemHoverOffset.x == x && this.itemHoverOffset.y == y
      },
      removeItemSelect() {
        if (this.itemSelect && !this.itemSelect.readOnly) {
          this.itemSelect.valueNow = null
          this.itemSelect.notes = []
        }
      },
      addSuggest() {
        if (this.countSuggest-- > 0) {
          const mapOffset = []
          this.mapSudoku.forEach((item, y) => item.forEach((item, x) => {
            if (item.valueNow == null) {
              mapOffset.push({ x, y })
            }
          }))

          const { x, y } = mapOffset[Math.round(Math.random() * (mapOffset.length - 1))]

          this.mapSudoku[y][x].valueNow = this.mapSudoku[y][x].value
          this.mapSudoku[y][x].isSuggest = true
          this.mapSudoku[y][x].readOnly = true
          //this.$forceUpdate()
        }
      },
      modeNoteActive(item) {
        return this.modeNote && item.notes.length
      },
      restartGame() {

      },
      playGame() {
        this.paused = false
        this.alertPauseGame = false
        let date = Date.now()
        this.interval = setInterval(() => {
          const now = Date.now()
          this.time += now - date
          date = now
        }, 1000)
      },
      pauseGame(showAlert = true) {
        this.paused = true
        clearInterval(this.interval)
        if (showAlert) {
          this.alertPauseGame = true
        }
      },
      endGame(success) {
        this.pauseGame(false)
        this.alert = {
          title: "Trò chơi đã kết thúc",
          message: ` Bạn đã mắc ${ this.countWrong } lỗi và ${ success ? "thắng" : "thua" } ván này `,
          buttons: [
            {
              attrs: {
                block: true,
                dark: true,
                color: "blue"
              },
              click: () => {
                this.countWrong = 0
                this.alert = null
                this.playGame()
              },
              text: "Cơ hội nữa"
            },
            {
              attrs: {
                text: true,
                block: true,
                class: "mt-3",
                to: "/"
              },

              text: "Về lại trang chủ"
            }
          ]
        }
      }
    },
    filters: {
      time
    },
    created() {
      if (this.mapSudoku) {
        this.playGame()
      } else {
        this.alert = {
          title: "Lỗi",
          message: "Có vẻ một lỗi hệ thống đã xảy ra khi bạn cố gắng chuyển hướng trực tiếp đến sân chơi",
          buttons: [
            {
              attrs: {
                text: true,
                dark: true,
                block: true,
                color: "blue",
                to: "/"
              },
              text: "Quay về trang chủ"
            }
          ]
        }
      }
    },
    beforeDestroy() {
      this.pauseGame(false)
    }
  }
</script>
<style lang="scss" scoped>
  .wrap {
    .card-text {
      position: relative;
      padding: rem(5) !important;

      .status {
        font-size: rem(14) !important;
        color: #646869;
      }

      .board {
        position: relative;
        max-width: 500;

        .board-inner {
          width: 100%;
          border: 2px solid #616266;
          display: flex;
          position: relative;
          flex-wrap: wrap;

          .board-paused {
            .play-game {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              border: 1px solid rgba(0, 0, 0, .1);
            }
          }

          .item {
            width: (100% / 9);
            padding-top: (100% / 9);
            border: 1px solid #c3c7cf;

            &.hover {
              background-color: #e2e7ed;
            }

            &.value-equal {
              background-color: #c8d0d0;
            }

            &.exact-active {
              background-color: #bbdefa;
            }

            &.failed {
              .item-inner {
                color: #f60305;
              }

              &.readonly,
              &.correct {
                background-color: #ecc6ce;

                .item-inner {
                  color: #e6791e;
                }

                &.correct:not(.readonly) {
                  .item-inner {
                    color: #000;
                  }
                }
              }
            }

            &.readonly {
              .item-inner {
                color: #e6791e;
              }
            }

            &.suggest {
              .item-inner {
                color: #19E136;
              }
            }

            position: relative;

            &:hover {
              .item-inner {
                font-size: rem(23);
              }

              //background-color: #bbdefa;
            }

            .item-inner {
              display: inline-block;
              position: absolute;
              text-align: center;
              top: 0;
              left: 0;
              font-size: rem(20);
              font-weight: 500;
              color: #000; //#0e46a1;
              transition: font-size .15s, background-color .15s;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;

              span {
                display: inline-block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }

              .item-inner--row {
                display: flex;
                position: relative;
                width: 100%;
                height: (100% / 3);
                flex: 0 0 (100% / 3);

                .item-inner--col {
                  height: 100%;
                  width: (100% / 3);
                  flex: 0 0 (100% / 3);
                  font-size: rem(10);
                  position: relative;
                  font-weight: 400;
                  color: #000;
                }
              }
            }

            &:nth-child(3n) {
              border-right: inherit;

              &:nth-child(9n) {
                border-right: 0;
              }
            }

            @for $i from 0 to 2 {
              @for $j from 1 to 10 {
                &:nth-child(#{$j + 18 + $i * 27}) {
                  border-bottom: inherit;
                }

                &:nth-child(#{$j + 18 + $i * 27 + 9}) {
                  border-top: 0;
                }

                &:nth-child(#{$j}) {
                  border-top: 0;
                }

                &:nth-child(#{9 * 8 + $j}) {
                  border-bottom: 0;
                }
              }
            }

            &:nth-child(9n + 1),
            &:nth-child(1),
            &:nth-child(3n + 1) {
              border-left: 0;
            }
          }
        }
      }

      .footer {

        .tools {
          padding: rem(27) rem(5);
          padding-bottom: 0;

          .btn {

            &,
            &.v-btn--disabled {
              background-color: transparent !important;
              border: 0;
              outline: none;
              box-shadow: none;
              vertical-align: baseline;

              &>>>.v-btn__content {
                display: flex;
                flex-direction: column-reverse !important;
                font-weight: normal !important;
                color: #767676;

                i {
                  height: rem(22);
                }

                span {
                  text-transform: initial !important;
                  font-size: rem(14);
                  position: relative;

                  .text {
                    position: absolute;
                    font-size: 80%;
                    top: 50%;
                    left: 100%;
                    transform: translateY(-50%);
                  }
                }
              }
            }
          }
        }

        .keyboard {
          margin-top: 0px;
        }
      }
    }
  }
</style>