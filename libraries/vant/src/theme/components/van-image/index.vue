<template>
  <div>
    <van-row gutter="24">
      <van-col span="8">
        <van-image width="100" height="100" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
          <van-text>默认</van-text>
        </van-image>
      </van-col>
      <van-col span="8">
        <van-image width="100" height="100" />
        <van-text>加载中</van-text>
      </van-col>
      <van-col span="8">
        <van-image width="100" height="100" src="http://x" />
        <van-text>加载失败</van-text>
      </van-col>
    </van-row>
  </div>
</template>
