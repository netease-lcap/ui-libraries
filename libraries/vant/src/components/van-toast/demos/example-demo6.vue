<template>
  <div>
    <van-cell title="打开弹窗" @click="handleOpen" />
    <van-toast v-model:show="show" wordBreak="break-word">
      <template #message>
        This message will contain a incomprehensibilities long word.
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