<template>
<div class="page">
    <div class="header">
      <div class="header-item"></div>
      <div class="title">首页</div>
      <div class="header-item">
        <van-icon name="question-o" />
      </div>
    </div>
    <div class="content">
      <div class="statist-card-list">
        <div class="statist-card-item primary">
          <div class="statist-info">
            <div class="number">43</div>
            <div class="desc">邀请人数</div>
          </div>
          <div class="statist-icon">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="24" height="24" viewBox="0 0 24 24">
              <g><path d="M14,14.252L14,16.3414C13.3744,16.1203,12.7013,16,12,16C8.68629,16,6,18.6863,6,22L4,22C4,17.5817,7.58172,14,12,14C12.6906,14,13.3608,14.0875,14,14.252ZM12,13C8.684999999999999,13,6,10.315,6,7C6,3.685,8.684999999999999,1,12,1C15.315,1,18,3.685,18,7C18,10.315,15.315,13,12,13ZM12,11C14.21,11,16,9.21,16,7C16,4.79,14.21,3,12,3C9.79,3,8,4.79,8,7C8,9.21,9.79,11,12,11ZM17.7929,19.9142L21.3284,16.378700000000002L22.7426,17.7929L17.7929,22.7426L14.2574,19.2071L15.6716,17.7929L17.7929,19.9142Z" fill="currentColor" fill-opacity="1"/></g>
            </svg>
          </div>
        </div>
        <div class="statist-card-item">
          <div class="statist-info">
            <div class="number">38</div>
            <div class="desc">登记人数</div>
          </div>
          <div class="statist-icon primary">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="24" height="24" viewBox="0 0 24 24">
              <g><path d="M21,6.75736L19,8.75736L19,4L10,4L10,9L5,9L5,20L19,20L19,17.2426L21,15.2426L21,21.0082C21,21.556,20.5551,22,20.0066,22L3.9934,22C3.44476,22,3,21.5501,3,20.9932L3,8L9.00319,2L19.9978,2C20.5513,2,21,2.45531,21,2.9918L21,6.75736ZM21.7782,8.80761L23.1924,10.2218L15.4142,18L13.9979,17.9979L14,16.5858L21.7782,8.80761Z" fill="currentColor" fill-opacity="1"/></g>
            </svg>
          </div>
        </div>
        <div class="statist-card-item">
          <div class="statist-info">
            <div class="number">24</div>
            <div class="desc">入园人数</div>
          </div>
          <div class="statist-icon success">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="24" height="24" viewBox="0 0 24 24">
              <g><path d="M12,22C6.47715,22,2,17.5228,2,12C2,6.47715,6.47715,2,12,2C17.5228,2,22,6.47715,22,12C22,17.5228,17.5228,22,12,22ZM12,20C16.418300000000002,20,20,16.418300000000002,20,12C20,7.58172,16.418300000000002,4,12,4C7.58172,4,4,7.58172,4,12C4,16.418300000000002,7.58172,20,12,20ZM11.0026,16L6.75999,11.7574L8.17421,10.3431L11.0026,13.1716L16.6595,7.51472L18.0737,8.928930000000001L11.0026,16Z" fill="currentColor" fill-opacity="1"/></g>
            </svg>
          </div>
        </div>
        <div class="statist-card-item">
          <div class="statist-info">
            <div class="number">22</div>
            <div class="desc">离场人数</div>
          </div>
          <div class="statist-icon danger">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="24" height="24" viewBox="0 0 24 24">
              <g><path d="M12,22C6.47715,22,2,17.5228,2,12C2,6.47715,6.47715,2,12,2C15.2713,2,18.1757,3.57078,20.0002,5.99923L17.2909,5.9993099999999995C15.8807,4.754989999999999,14.0285,4,12,4C7.58172,4,4,7.58172,4,12C4,16.418300000000002,7.58172,20,12,20C14.029,20,15.8816,19.2446,17.2919,17.9998L20.0009,17.9998C18.1765,20.4288,15.2717,22,12,22ZM19,16L19,13L11,13L11,11L19,11L19,8L24,12L19,16Z" fill="currentColor" fill-opacity="1"/></g>
            </svg>
          </div>
        </div>
      </div>
      <div class="sub-header">待审批</div>
      <van-linear-layout type="flex" direction="vertical" gap="small" >
        <div class="info-card">
          <div class="info-card-header">
            <div class="title">访客1</div>
            <van-tag type="primary">待审批</van-tag>
          </div>
          <div class="info-card-content">
            <div class="info-list-item">
              <div class="label">来访目的</div>
              <div class="value">商谈</div>
            </div>
            <div class="info-list-item">
              <div class="label">访客单位</div>
              <div class="value">杭州电子科技有限公司</div>
            </div>
            <div class="info-list-item">
              <div class="label">电话</div>
              <div class="value">130-0000-0000</div>
            </div>
            <div class="info-list-item">
              <div class="label">约见时间</div>
              <div class="value">2024-01-04 09:56:00</div>
            </div>
          </div>
          <div class="info-card-footer">
            <van-button type="info_secondary" size="small" text="取消" squareroud="round" destination="" :loading="false" :disabled="false" :replace="false"></van-button>
            <van-button type="info" size="small" text="确定" squareroud="round" destination="" :loading="false" :disabled="false" :replace="false"></van-button>
          </div>
        </div>

        <div class="info-card">
          <div class="info-card-header">
            <div class="title">访客2</div>
            <van-tag type="primary">待审批</van-tag>
          </div>
          <div class="info-card-content">
            <div class="info-list-item">
              <div class="label">来访目的</div>
              <div class="value">商谈</div>
            </div>
            <div class="info-list-item">
              <div class="label">访客单位</div>
              <div class="value">杭州电子科技有限公司</div>
            </div>
            <div class="info-list-item">
              <div class="label">电话</div>
              <div class="value">130-0000-0000</div>
            </div>
            <div class="info-list-item">
              <div class="label">约见时间</div>
              <div class="value">2024-01-04 09:56:00</div>
            </div>
          </div>
          <div class="info-card-footer">
            <van-button type="info_secondary" size="small" text="取消" squareroud="round" destination="" :loading="false" :disabled="false" :replace="false"></van-button>
            <van-button type="info" size="small" text="确定" squareroud="round" destination="" :loading="false" :disabled="false" :replace="false"></van-button>
          </div>
        </div>
      </van-linear-layout>
    </div>
    <div class="footer">
      <div class="bottom-bar">
        <van-button type="info" :square="false" size="middle" squareroud="round" text="邀请访客" block="blockb"></van-button>
      </div>
      <van-tabbar>
        <van-tabbar-item icon="frontpage" style="font-size:24px">
            <van-text text="首页"></van-text>
        </van-tabbar-item>
        <van-tabbar-item icon="contact" style="font-size:24px">
            <van-text text="标签"></van-text>
        </van-tabbar-item>
        <van-tabbar-item icon="location" style="font-size:24px">
            <van-text text="标签"></van-text>
        </van-tabbar-item>
    </van-tabbar>
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
  background-color: var(--van-component-background-color);font-family: var(--van-base-font-family);
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

.sub-header {
  height: 44px;
  display: flex;
  align-items: center;
  font-size: var(--van-font-size-md);
  color: var(--van-font-color);
  font-weight: var(--van-font-weight-bold);
}

.statist-card-list {
  display: flex;
  gap: var(--van-space-small);
  flex-wrap: wrap;
}

.statist-card-item {
  width: calc((100% - var(--van-space-small)) / 2);
  padding: var(--van-space-base);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0px 4px 8px 0px rgba(187, 197, 201, 0.25);
  border-radius: var(--van-border-radius-lg);
}

.statist-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--van-space-mini);
}

.statist-info .number {
  font-size: 28px;
  line-height: 32px;
  text-align: center;
  color: var(--van-font-color);
  font-weight: var(--van-font-weight-bold);
}

.statist-info .desc {
  font-size: var(--van-font-size-sm);
  color: var(--van-text-color-secondary);
  text-align: center;
  line-height: 1;
}

.statist-icon.primary {
  color: var(--van-brand-primary);
}

.statist-icon.success {
  color: var(--van-brand-success);
}

.statist-icon.danger {
  color: var(--van-brand-error);
}

.statist-card-item.primary {
  background-color: var(--van-brand-primary);
}
.statist-card-item.primary .number,
.statist-card-item.primary .desc,
.statist-card-item.primary .statist-icon {
  color: #fff;
}

.info-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background-color: #fff;
  box-shadow: 0px 4px 8px 0px rgba(187, 197, 201, 0.25);
  border-radius: var(--van-border-radius-lg);
}

.info-card-header {
  min-height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--van-space-mini) var(--van-space-base);
  border-bottom: 1px solid var(--van-border-color);
}

.info-card-header .title {
  color: var(--van-font-color);
  font-weight: var(--van-font-weight-bold);
  font-size: var(--van-font-size-md);
  line-height: 1.5;
}

.info-list-item {
  min-height: 44px;
  padding: var(--van-space-small) var(--van-space-base);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.info-list-item .label,
.info-list-item .value {
  font-size: var(--van-font-size-md);
  line-height: 1.5;
}

.info-list-item .label {
  color: var(--van-text-color-secondary);
}

.info-list-item .value {
  color: var(--van-font-color);
}

.info-card-footer {
  min-height: 44px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--van-space-small);
  padding: var(--van-space-small) var(--van-space-base);
}
</style>
