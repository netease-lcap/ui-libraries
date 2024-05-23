<!-- 基本用法 -->

<template>
  <van-for-components>
  <template #default="current">
    <van-row gutter="0"  :vusion-disabled-copy="current" :vusion-disabled-addslot="current" :vusion-disabled-cut="current">
      <van-col :span="24" :vusion-disabled-copy="current" :vusion-disabled-cut="current">
      </van-col>
    </van-row>
  </template>

  <template #item="current">
    <van-row gutter="0"  vusion-disabled-copy vusion-disabled-addslot vusion-disabled-cut>
      <van-col :span="24" vusion-disabled-copy vusion-disabled-cut>
      </van-col>
    </van-row>
  </template>
</van-for-components>
</template>
