<template>
  <div style="height: 240px; position: relative">
    <van-dialog 
      :show="true"
      messageAlign="center"
      :showCancelButton="true"
      overlayClass="dialog-mask-class"
      :closeOnClickOverlay="false"
      :lockScroll="false"
      message="如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。"
    >
    <template #title>
      <van-text>标题</van-text>
    </template>
  </van-dialog>
  </div>
</template>

<style>
.dialog-mask-class {
  position: unset!important;
}
.dialog-mask-class +.van-popup {
  position: absolute!important;
}
</style>