<template>
  <div>
    <van-loading isLoading="true" vertical type='spinner' icon='star-o'>
      <div style="width: 100%; height: 100px; background-color: blueviolet;">
      </div>
      <!-- <template #icon>
        <van-icon name="star-o" size="30" />
      </template> -->
      <template #loadingText>
        <van-text text="加载中..." />
      </template>
    </van-loading>
  </div>
</template>

<script setup>
import { Icon as VanIcon } from 'vant';
</script>