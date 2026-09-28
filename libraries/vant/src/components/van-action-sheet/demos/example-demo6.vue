<template>
  <div>
    <van-cell is-link title="自定义面板" @click="show = true" />
    <van-action-sheet v-model:show="show" title="标题">
      <div class="content">内容</div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
</script>

<style>
.content {
  padding: 16px 16px 160px;
}
</style>
