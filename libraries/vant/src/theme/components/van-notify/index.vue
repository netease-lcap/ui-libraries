<template>
  <div style="display: flex; flex-direction: column; gap: 10px;" class="notify-container">
    <van-notify type="primary" :show="true" :lock-scroll="false"> 
      <span>主要通知内容</span>
    </van-notify>
    <van-notify type="success" :show="true" :lock-scroll="false"> 
      <span>成功通知内容</span>
    </van-notify>
    <van-notify type="danger" :show="true" :lock-scroll="false"> 
      <span>危险通知内容</span>
    </van-notify>
    <van-notify type="warning" :show="true" :lock-scroll="false"> 
      <span>警告通知内容</span>
    </van-notify>
  </div>
</template>

<style>
.notify-container .van-notify{
  position: unset!important;
}
</style>