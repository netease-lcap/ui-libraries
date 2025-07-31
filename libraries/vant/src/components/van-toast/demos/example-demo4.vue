<template>
  <div>
    <van-cell title="打开弹窗" @click="handleOpen" />
    <van-toast v-model:show="show" :icon="icon" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const show = ref(false);
const icon = ref('https://fastly.jsdelivr.net/npm/@vant/assets/logo.png')

const handleOpen = () => {
  show.value = true;
};

</script>