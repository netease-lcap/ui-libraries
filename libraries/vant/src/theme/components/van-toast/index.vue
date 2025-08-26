<template>
  <div class="toast-container">
    <van-toast :show="true" type="text" :forbid-click="false" :close-on-click="false" :close-on-click-overlay="false" position="top">
      <template #message>
        文字提示-top
      </template>
    </van-toast>
    <van-toast :show="true" type="loading" :forbid-click="false" :close-on-click="false"
      :close-on-click-overlay="false">
      <template #message>
        加载中...
      </template>
    </van-toast>
    <van-toast :show="true" type="success" :forbid-click="false" :close-on-click="false"
      :close-on-click-overlay="false">
      <template #message>
        成功
      </template>
    </van-toast>
    <van-toast :show="true" type="fail" :forbid-click="false" :close-on-click="false" :close-on-click-overlay="false" position="bottom">
      <template #message>
        失败-bottom
      </template>
    </van-toast>
  </div>
</template>

<style>
.toast-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  height: fit-content;
  align-items: center;
}

.toast-container .van-toast {
  position: relative !important;
  transform: none !important;
}
</style>