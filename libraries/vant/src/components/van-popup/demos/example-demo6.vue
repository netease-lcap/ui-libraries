<template>
  <div>
    <van-cell title="监听显示事件" is-link @click="show = true" />
    <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }" @open="showToast('open')"
      @opened="showToast('opened')" @close="showToast('close')" @closed="showToast('closed')"  @beforeClose="onBeforeClose"/>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';

const show = ref(false);

const onBeforeClose = () => {
  console.log('onBeforeClose');
  return true;
};
</script>
