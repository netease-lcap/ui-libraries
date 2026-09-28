<template>
  <div>
    <van-cell title="打开通知" @click="showNotify" />
    <van-notify ref="notifyRef" color="#1989fa" background="#ffe1e1" position="bottom">
      <span>通知内容</span>
    </van-notify>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const notifyRef = ref();

const showNotify = () => {
  notifyRef.value.open();
  setTimeout(() => {
    notifyRef.value.close();
  }, 1000);
};

</script>