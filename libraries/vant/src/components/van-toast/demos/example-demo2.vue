<template>
  <div>
    <van-cell title="打开弹窗" @click="handleOpen" />
    <van-toast v-model:show="show" :forbid-click="true" type="loading">
      <template #message>
        加载中...
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