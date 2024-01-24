<!-- 基本用法 -->

<template>
  <van-checkbox-group direction="horizontal" converter="none">
  <template #item="current">
    <van-checkbox
      shape="square"
      vusion-disabled-cut
      vusion-disabled-copy
    ></van-checkbox>
  </template>
</van-checkbox-group>
</template>