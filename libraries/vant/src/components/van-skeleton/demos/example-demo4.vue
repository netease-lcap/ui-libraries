<template>
  <div>
    <button @click="handleClick">切换自定义骨架屏</button>
    <van-skeleton :isCustomSkeleton="isCustomSkeleton" :row="3" title avatar>
      <template #template>
        <div :style="{ display: 'flex', width: '100%' }">
          <van-skeleton-image />
          <div :style="{ flex: 1, marginLeft: '16px' }">
            <van-skeleton-title />
            <van-skeleton-paragraph row-width="60%" />
            <van-skeleton-paragraph />
            <van-skeleton-paragraph />
            <van-skeleton-paragraph />
          </div>
        </div>
      </template>
    </van-skeleton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isCustomSkeleton = ref(true);

const handleClick = () => {
  isCustomSkeleton.value = !isCustomSkeleton.value;
};
</script>