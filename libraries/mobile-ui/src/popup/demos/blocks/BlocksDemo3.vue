<!-- 弹出位置左 -->

<template>
  <van-popup
    safeAreaInsetBottom
    position="left"
    evn="picker"
  >
    <div
      vusion-slot-name="default"
      style="min-width: 200px; min-height: 200px; width: 100%; height: 100%;"
      :vusion-disabled-cut="true"
    >
    </div>
  </van-popup>
</template>
