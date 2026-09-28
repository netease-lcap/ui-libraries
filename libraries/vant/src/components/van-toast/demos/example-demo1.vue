<template>
  <div>
    <van-cell title="打开弹窗" @click="handleOpen" />
    <van-cell title="关闭" @click="handleClose" />
    <van-toast v-model:show="show" ref="toastRef">
      <template #message>
        文字提示
      </template>
    </van-toast>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const show = ref(false);
const toastRef = ref();

const handleOpen = () => {
  // show.value = true;
  toastRef.value.open();
};

const handleClose = () => {
  toastRef.value.close();
};
</script>