<template>
  <div>
    <van-cell title="圆角弹窗（居中）" is-link @click="showCenter = true" />
    <van-cell title="圆角弹窗（底部）" is-link @click="showBottom = true" />

    <!-- 圆角弹窗（居中） -->
    <van-popup v-model:show="showCenter" round :style="{ padding: '64px' }" />

    <!-- 圆角弹窗（底部） -->
    <van-popup v-model:show="showBottom" round position="bottom" :style="{ height: '30%' }" />

  </div>
</template>
<script setup>
import { ref } from 'vue';

const showCenter = ref(false);
const showBottom = ref(false);
</script>