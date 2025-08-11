<template>
  <div>
    <van-cell title="打开弹窗" @click="handleOpen" />
    <van-toast v-model:show="show" position="top">
      <template #message>
        提示
      </template>
    </van-toast>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const show = ref(false);

const handleOpen = () => {
  show.value = true;
};

</script>