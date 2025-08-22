<template>
  <div>
    <van-row>
      <van-col span="12">
        <van-text text="圆角按钮: "></van-text><van-switch v-model="isRound" size="14px" />
      </van-col>
      <van-col span="12">
        <van-text text="独立头部: "></van-text><van-switch v-model="isIsolated" size="14px" />
      </van-col>
    </van-row>
    <div style="height: 400px; position: relative; margin-top: 20px">
      <van-dialog 
        :show="true"
        messageAlign="center"
        :showCancelButton="true"
        overlayClass="dialog-mask-class"
        :closeOnClickOverlay="false"
        :lockScroll="false"
        :message='isIsolated ? "" : "如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。"'
        :theme="isRound ? 'round-button' : 'default'"
      >
      <template #title>
        <van-text>标题</van-text>
      </template>
    </van-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isRound = ref(false);
const isIsolated = ref(false);
</script>

<style>
.dialog-mask-class {
  position: unset!important;
}
.dialog-mask-class +.van-popup {
  position: absolute!important;
}
</style>