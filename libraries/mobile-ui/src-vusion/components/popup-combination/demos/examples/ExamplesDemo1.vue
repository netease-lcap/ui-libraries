<!-- 基础使用 -->

<template>
  <div>
    <van-button @click="show = true">click</van-button>
    <van-popup v-model="show" position="left">
      <van-popup-combination style="--popup-background: red;">
        <template #reference>
          <van-button type="primary" text="触发弹出框组件"></van-button>
        </template>
        <van-text text="内容"></van-text>
      </van-popup-combination>
    </van-popup>
</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>
