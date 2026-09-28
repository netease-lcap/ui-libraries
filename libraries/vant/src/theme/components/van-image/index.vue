<template>
  <div>
    <van-row gutter="24">
      <van-col span="8">
        <van-image width="100" height="100" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
          <van-text style="font-size: 12px;">默认</van-text>
        </van-image>
      </van-col>
      <van-col span="8">
        <van-image width="100" height="100" src="http://x" />
        <van-text style="font-size: 12px;">加载失败</van-text>
      </van-col>
    </van-row>
    <van-row gutter="24" style="margin-top: 24px;">
      <van-col span="8">
        <van-image width="100" height="100" alt="加载中" />
        <van-text style="font-size: 12px;">加载中-图标场景</van-text>
      </van-col>
      <van-col span="8">
        <van-image width="100" height="100" alt="加载中">
          <template #loading>
            <van-text>加载中</van-text>
          </template>
        </van-image>
        <van-text style="font-size: 12px;">加载中-占位符场景</van-text>
      </van-col>
    </van-row>
  </div>
</template>
