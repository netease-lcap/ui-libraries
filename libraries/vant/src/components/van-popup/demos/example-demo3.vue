<template>
  <div>
    <van-cell title="可关闭" is-link @click="show1 = true" />
    <van-cell title="自定义图标" is-link @click="show2 = true" />
    <van-cell title="图标位置" is-link @click="show3 = true" />

    <van-popup v-model:show="show1" closeable position="bottom" :style="{ height: '30%' }" />
    <!-- 自定义图标 -->
    <van-popup v-model:show="show2" closeable close-icon="close" position="bottom" :style="{ height: '30%' }" />
    <!-- 图标位置 -->
    <van-popup v-model:show="show3" closeable close-icon-position="top-left" position="bottom" 
      :style="{ height: '30%' }" />

  </div>
</template>

<script setup>
import { ref } from 'vue';

const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
</script>

