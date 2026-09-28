<template>
  <div>
    <van-loading isLoading="true">
      <div style="width: 100%; height: 100px; background-color: #f5f5f5; border-radius: 10px;"></div>
    </van-loading>
    <van-loading type="spinner" isLoading="true" vertical>
      <template #loadingText>
        <van-text>加载中...</van-text>
      </template>
      <div style="width: 100%; height: 100px; background-color: #f5f5f5; border-radius: 10px; margin-top: 10px;"></div>
    </van-loading>
  </div>
</template>