<template>
  <div>
    <van-cell title="展示弹出层" is-link @click="showPopup" />
    <van-popup v-model:show="show" :style="{ padding: '64px' }">
      <template #overlay-content>
          <span>额外操作</span>
      </template>
      内容
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);

const showPopup = () => {
  show.value = true;
};
</script>