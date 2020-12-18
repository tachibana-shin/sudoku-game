<template>
  <v-card flat class="wrap fill-height">
    <v-app-bar app fixed color="white-f5">
      <v-toolbar-title> Thống kê </v-toolbar-title>
      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title color="blue">
          <v-tabs-slider color="blue"></v-tabs-slider>
          <v-tab>
            Trò chơi
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-container fluid>
            <v-row>
              <v-col>
                <v-list>
                  <v-subheader> Game </v-subheader>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-apps
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      Trò chơi đã bắt đầu
                    </v-list-item-content>
                    <v-list-item-actions>
                      0.0
                    </v-list-item-actions>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-flag
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      Tỉ lệ thắng
                    </v-list-item-content>
                    <v-list-item-actions>
                      0%
                    </v-list-item-actions>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      tab: null
    })
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