<template>
  <v-card class="wrap fill-height" flat.>
    <v-app-bar app fixed>
      <v-btn icon @click="hasHistory ? $router.back() : $router.replace('/')">
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-toolbar-title>
        Cài đặt
      </v-toolbar-title>
    </v-app-bar>
    <v-card-text class="pa-0">
      <v-list>
        <template v-for="(item, index) in items">
          <v-divider inset v-if="index" />
          <v-subheader inset> {{ item.title }} </v-subheader>
          <v-list-item v-for="(item, index) in item.items" :key="item.value" :three-line="!!item.sub" :disabled="item.value == 'AUTO_CHECK_BUG' && $store.state.settings.config.DEBUG" @click="$store.commit(`settings/setSettings`, { [item.value]: !$store.state.settings.config[ item.value ] }) ">
            <v-list-item-icon>
              <v-icon> {{ item.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> {{ item.text }} </v-list-item-title>
              <v-list-item-subtitle v-if="item.sub"> {{ item.sub }} </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-switch color="blue" inset :input-value="!!$store.state.settings.config[item.value]" @change="$store.commit(`settings/setSettings`, { [item.value]: $event })" />
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      selectedItem: 1,
      items: [
        {
          title: "Chung",
          items: [
            {
              icon: "mdi-volume-high",
              text: "Hiệu ứng âm thanh",
              value: "SOUND"
            },
            {
              icon: "mdi-timer-sand",
              text: "Thời gian chờ màn hình",
              value: "TIME_WAIT"
            },
            {
              icon: "mdi-timer",
              text: "Đồng hồ bấm giờ",
              value: "TIMER"
            }
          ]
        },
        {
          title: "Sân chơi",
          items: [
            {
              icon: "mdi-eyedropper",
              text: "Hiển thị điểm",
              sub: "Hiển thị số điểm đạt được trong trò chơi",
              value: "SHOW_POINT"
            },
            {
              icon: "mdi-quadcopter",
              text: "Nhập số trước",
              sub: "Nhấn và giữ một số để sử dụng số đó cho nhiều ô",
              value: "QUADCOPTER"
            },
            {
              icon: "mdi-android-debug-bridge",
              text: "Giới hạn lỗi",
              sub: "Giới hạn 3 lỗi trong một ván chơi",
              value: "DEBUG"
            },
            {
              icon: "mdi-check",
              text: "Tự động kiểm tra lỗi",
              sub: "Đánh dấu các ô không khớp với hàng và cột",
              value: "AUTO_CHECK_BUG"
            },
            {
              icon: "mdi-texture",
              text: "Ẩn các số đã dùng",
              sub: "Ẩn các số đã được đặt trong hàng và cột",
              value: "HIDE_NUM_USED"
            },
            {
              icon: "mdi-repeat",
              text: "Bôi đậm số trùng lặp",
              sub: "Bôi đậm các số bị trủng lặp trong hàng và cột",
              value: "HIGHLIGHT_NUM_REPEAT"
            },
            {
              icon: "mdi-trello",
              text: "Tô sáng theo vùng",
              sub: "Tô sáng một khối, cột hay hảng của ô được chọn",
              value: "HIGHLIGHT_TRELLO"
            },
            {
              icon: "mdi-format-bold",
              text: "Tô sáng những số giống nhau",
              sub: "Khi bạn chọn ô có số, những ô khác bằng ô này sẽ được tô sáng",
              value: "HIGHLIGHT_EQAL"
            },
            {
              icon: "mdi-table-row-remove",
              text: "Tự động xóa ghi chú",
              sub: "Khi một số được điền vào ô thì số đó sẽ bị xóa khỏi các ghi chú trong hàng và cột",
              value: "AUTO_RM_NOTE"
            }
          ]
        }
      ]
    })
  }
</script>