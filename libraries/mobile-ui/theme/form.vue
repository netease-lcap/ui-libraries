<template>
<div class="page">
  <div class="header">
    <div class="header-item">
      <van-icon name="arrow-left" />
    </div>
    <div class="title">表单页</div>
    <div class="header-item">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="20" height="20" viewBox="0 0 20 20">
        <g><ellipse cx="10.000390648841858" cy="10.088232636451721" rx="1.600000023841858" ry="1.600000023841858" fill="#333333" fill-opacity="1"/></g><g><ellipse cx="2.500390648841858" cy="10.088232636451721" rx="1.600000023841858" ry="1.600000023841858" fill="#333333" fill-opacity="1"/></g><g><ellipse cx="17.500390648841858" cy="10.088232636451721" rx="1.600000023841858" ry="1.600000023841858" fill="currentColor" fill-opacity="1"/></g>
      </svg>
    </div>
  </div>
  <div class="content">
    <div class="form-card">
      <van-cell :isLink="false" :center="true">
        <template #title>
            <van-text text="访客姓名"></van-text>
        </template>
        <van-fieldinput placeholder="请输入"></van-fieldinput>
      </van-cell>
      <van-cell :isLink="false" :center="true">
        <template #title>
            <van-text text="来访目的"></van-text>
        </template>
        <van-pickerson
          placeholder="请选择"
          type="list"
          :show-toolbar="true"
          :data-source="[{ text: '逛逛', value: 1 }, { text: '看看', value: 3 }, { text: '瞅瞅', value: 2 }]"
        />
      </van-cell>
      <van-cell :isLink="false" :center="true">
        <template #title>
            <van-text text="约见时间"></van-text>
        </template>
        <van-datetime-picker :type="`datetime`" placeholder="请选择时间" :title="`顶部标题`">
          <template #picker-bottom>
              <van-picker-action-slot :targetMethod="`cancel`">
                  <van-button :type="`info_secondary`" :size="`normal`" :text="`取消`" :squareroud="`round`"></van-button>
              </van-picker-action-slot>
              <van-picker-action-slot :targetMethod="`confirm`">
                  <van-button :type="`info`" :size="`normal`" :text="`确认`" :squareroud="`round`"></van-button>
              </van-picker-action-slot>
          </template>
          <template #picker-top>
              <van-picker-action-slot :targetMethod="`cancel`">
                  <van-iconv :name="`left-arrow`" :icotype="`only`"></van-iconv>
              </van-picker-action-slot>
              <van-picker-action-slot :targetMethod="`confirm`"></van-picker-action-slot>
          </template>
        </van-datetime-picker>
      </van-cell>
      <van-cell :isLink="false" :center="true">
        <template #title>
            <van-text text="结束时间"></van-text>
        </template>
        <van-datetime-picker :type="`datetime`" placeholder="请选择时间" :title="`顶部标题`">
          <template #picker-bottom>
              <van-picker-action-slot :targetMethod="`cancel`">
                  <van-button :type="`info_secondary`" :size="`normal`" :text="`取消`" :squareroud="`round`"></van-button>
              </van-picker-action-slot>
              <van-picker-action-slot :targetMethod="`confirm`">
                  <van-button :type="`info`" :size="`normal`" :text="`确认`" :squareroud="`round`"></van-button>
              </van-picker-action-slot>
          </template>
          <template #picker-top>
              <van-picker-action-slot :targetMethod="`cancel`">
                  <van-iconv :name="`left-arrow`" :icotype="`only`"></van-iconv>
              </van-picker-action-slot>
              <van-picker-action-slot :targetMethod="`confirm`"></van-picker-action-slot>
          </template>
        </van-datetime-picker>
      </van-cell>
      <van-cell :isLink="false" :center="true">
        <template #title>
            <van-text text="联系电话"></van-text>
        </template>
        <van-fieldinput placeholder="请输入"></van-fieldinput>
      </van-cell>
    </div>
    <div class="form-card">
      <div class="card-label">
        来访理由
      </div>
      <div class="card-content">
        <van-fieldtextarea :placeholder="`请输入来访理由`" :maxlength="150" :showWordLimit="true"></van-fieldtextarea>
      </div>
    </div>
    <div class="form-card">
      <div class="card-label">
        上传附件
      </div>
      <div class="card-content">
        <van-uploader :converter="`json`" :url="`/upload`" :urlField="`filePath`"></van-uploader>
      </div>
    </div>
    <div class="form-card">
      <van-cell :isLink="false" :center="true">
        <template #title>
            <van-text text="审批人"></van-text>
        </template>
        <van-pickerson
          placeholder="请选择"
          :show-toolbar="true"
          :data-source="[{ text: '审批人1', value: 1 }, { text: '审批人2', value: 3 }, { text: '审批人3', value: 2 }]"
        />
      </van-cell>
    </div>
  </div>
  <div class="footer">
    <div class="bottom-bar">
      <van-button type="info" :square="false" size="middle" :squareroud="`round`" text="提交" :block="`blockb`"></van-button>
    </div>
  </div>
</div>
</template>
<style>
.page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  height: 100vh;
  background-color: var(--van-component-background-color);
}

.header,
.footer {
  flex-shrink: 0;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06),0px 4px 8px 0px rgba(187, 197, 201, 0.25);
}

.content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: var(--van-space-base);
  gap: var(--van-space-small);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

.content > * {
  flex-shrink: 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 44px;
  font-size: var(--van-font-size-lg);
  background-color: #fff;
  padding: 0 var(--van-space-base);
  color: var(--van-font-color);
}

.header-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--van-font-color);
  font-size: 24px;
  line-height: 1;
}

.bottom-bar {
  padding: var(--van-space-small) var(--van-space-base);
  background-color: #fff;
}

.form-card {
  background-color: #fff;
  border-radius: var(--van-border-radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.form-card .card-label{
  padding: var(--van-space-mini) var(--van-space-base);
  font-size: var(--van-text-font-size);
  color: var(--van-font-color);
}

.form-card .card-content {
  padding: var(--van-space-mini) var(--van-space-base);
}
</style>
