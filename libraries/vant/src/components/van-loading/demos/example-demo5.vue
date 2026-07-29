<template>
  <div>
    <van-loading color="#1989fa" isLoading="true" vertical>
      <div style="width: 100%; height: 100px; background-color: blueviolet;">
      </div>
      <template #loadingText>
        <van-text text="加载中..." />
      </template>
    </van-loading>

  </div>
</template>