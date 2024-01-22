<!-- 基本用法 -->

<template>
  <van-area title="标题" inputAlign="left" converter="name">
  <template #title>
    <van-text text="标题"></van-text>
  </template>
  <template #pannel-title>
    <van-text text="标题"></van-text>
  </template>
  <template #picker-top>
    <van-picker-action-slot targetMethod="cancel">
      <van-iconv name="left-arrow" icotype="only"></van-iconv>
    </van-picker-action-slot>
    <van-picker-action-slot targetMethod="confirm"></van-picker-action-slot>
  </template>
  <template #picker-bottom>
    <van-picker-action-slot targetMethod="cancel">
      <van-button
        type="info_secondary"
        size="normal"
        text="取消"
        squareroud="round"
      ></van-button>
    </van-picker-action-slot>
    <van-picker-action-slot targetMethod="confirm">
      <van-button
        type="info"
        size="normal"
        text="确认"
        squareroud="round"
      ></van-button>
    </van-picker-action-slot> 
  </template>
</van-area>
</template>