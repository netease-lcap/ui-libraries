<!-- 基础使用 -->

<template>
<demo-section>
  <demo-block card title="基础使用">
    <van-button @click="show = true">click</van-button>
    <van-popup v-model="show" position="left">
      <van-popup-combination style="--popup-background: red;">
        <template #reference>
          <van-button type="primary" text="触发弹出框组件"></van-button>
        </template>
        <van-text text="内容"></van-text>
      </van-popup-combination>
    </van-popup>
  </demo-block>

  <demo-block card title="样式增强">
    <van-popup-combination
      class="cw-css-rule-popover1___asada"
      style="--popup-background: red;"
    >
      <template #reference>
        <van-button type="primary" text="触发弹出框组件"></van-button>
      </template>
      <van-text text="内容"></van-text>
    </van-popup-combination>
  </demo-block>
</demo-section>
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
