<template>
  <div style="height: 300px; position: relative;">
    <van-popup 
      :show="true" 
      :style="{ padding: '64px' }"
      :lock-scroll="false"
      :close-on-click-overlay="false"
      overlayClass="popup-mask-class"
      round
      closeable
    >
      <template #overlay-content>
          <span>遮罩层的额外内容</span>
      </template>
      内容
    </van-popup>
  </div>
</template>

<style>
.popup-mask-class {
  position: unset!important;
}
.popup-mask-class +.van-popup {
  position: absolute!important;
}
</style>