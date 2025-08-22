<template>
  <div>
    <van-cell title="顶部弹出" is-link @click="showTop = true" />
    <van-cell title="底部弹出" is-link @click="showBottom = true" />
    <van-cell title="左侧弹出" is-link @click="showLeft = true" />
    <van-cell title="右侧弹出" is-link @click="showRight = true" />

    <!-- 顶部弹出 -->
    <van-popup v-model:show="showTop" position="top" :style="{ height: '30%' }" />

    <!-- 底部弹出 -->
    <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '30%' }" />

    <!-- 左侧弹出 -->
    <van-popup v-model:show="showLeft" position="left" :style="{ width: '30%', height: '100%' }" />

    <!-- 右侧弹出 -->
    <van-popup v-model:show="showRight" position="right" :style="{ width: '30%', height: '100%' }" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showTop = ref(false);
const showBottom = ref(false);
const showLeft = ref(false);
const showRight = ref(false);
</script>
