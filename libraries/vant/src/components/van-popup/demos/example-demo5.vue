<template>
<div>
  <van-cell title="监听点击事件" is-link @click="show = true" />
  <van-popup
    v-model:show="show"
    position="bottom"
    :style="{ height: '30%' }"
    closeable
    @click-overlay="onClickOverlay"
    @click-close-icon="onClickCloseIcon"
  />
</div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';

const show = ref(false);

const onClickOverlay = () => {
  console.log('点击遮罩层');
  showToast('click-overlay');
};

const onClickCloseIcon = () => {
  console.log('点击关闭图标');
  showToast('click-close-icon');
};

</script>
