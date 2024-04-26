<!-- 基础用法 -->

<template>
  <van-form>
  <van-field required drole="other">
    <template #title>
      <van-text text="名称"></van-text>
    </template>
    <template #input>
      <van-fieldinput placeholder="请输入" clearable></van-fieldinput>
    </template>
  </van-field>
  <van-field name="radio" drole="other">
    <template #title>
      <van-text text="单选框"></van-text>
    </template>
    <template #input>
      <van-radio-group direction="horizontal" isNew icon="sure">
        <van-radio :name="1" icon="sure">
          <van-text text="单选框 1"></van-text>
        </van-radio>
        <van-radio :name="2" icon="sure">
          <van-text text="单选框 2"></van-text>
        </van-radio>

        <template #item="current">
          <van-radio vusion-disabled-cut vusion-disabled-copy></van-radio>
        </template>
      </van-radio-group>
    </template>
  </van-field>
  <div style="margin: 16px 16px 0">
    <van-button
      round
      block="blockb"
      type="info"
      nativeType="submit"
      text="提交"
    >
    </van-button>
  </div>
</van-form>
</template>
