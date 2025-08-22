<template>
  <div>
    <van-cell title="打开通知" @click="showNotify" />
    <van-cell title="关闭通知" @click="closeNotify" />
    <van-notify ref="notifyRef">
      <span>通知内容</span>
    </van-notify>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const notifyRef = ref();

const showNotify = () => {
  notifyRef.value.open();
};

const closeNotify = () => {
  notifyRef.value.close();
};
</script>