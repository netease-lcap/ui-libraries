<template>
  <div class="dashboard">
    <!-- 顶部标题栏 -->
    <van-nav-bar title="首页" :border="false" class="dashboard-header">
      <template #right>
        <van-icon name="question-o" size="20" />
      </template>
    </van-nav-bar>

    <!-- 统计卡片区域 -->
    <div class="stats-section">
      <div class="statist-card-list">
        <div class="statist-card-item primary">
          <div class="statist-info">
            <div class="number">43</div>
            <div class="desc">邀请人数</div>
          </div>
          <div class="statist-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="none"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <g>
                <path
                  d="M14,14.252L14,16.3414C13.3744,16.1203,12.7013,16,12,16C8.68629,16,6,18.6863,6,22L4,22C4,17.5817,7.58172,14,12,14C12.6906,14,13.3608,14.0875,14,14.252ZM12,13C8.684999999999999,13,6,10.315,6,7C6,3.685,8.684999999999999,1,12,1C15.315,1,18,3.685,18,7C18,10.315,15.315,13,12,13ZM12,11C14.21,11,16,9.21,16,7C16,4.79,14.21,3,12,3C9.79,3,8,4.79,8,7C8,9.21,9.79,11,12,11ZM17.7929,19.9142L21.3284,16.378700000000002L22.7426,17.7929L17.7929,22.7426L14.2574,19.2071L15.6716,17.7929L17.7929,19.9142Z"
                  fill="currentColor"
                  fill-opacity="1" />
              </g>
            </svg>
          </div>
        </div>
        <div class="statist-card-item">
          <div class="statist-info">
            <div class="number">38</div>
            <div class="desc">登记人数</div>
          </div>
          <div class="statist-icon primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="none"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <g>
                <path
                  d="M21,6.75736L19,8.75736L19,4L10,4L10,9L5,9L5,20L19,20L19,17.2426L21,15.2426L21,21.0082C21,21.556,20.5551,22,20.0066,22L3.9934,22C3.44476,22,3,21.5501,3,20.9932L3,8L9.00319,2L19.9978,2C20.5513,2,21,2.45531,21,2.9918L21,6.75736ZM21.7782,8.80761L23.1924,10.2218L15.4142,18L13.9979,17.9979L14,16.5858L21.7782,8.80761Z"
                  fill="currentColor"
                  fill-opacity="1" />
              </g>
            </svg>
          </div>
        </div>
        <div class="statist-card-item">
          <div class="statist-info">
            <div class="number">24</div>
            <div class="desc">入园人数</div>
          </div>
          <div class="statist-icon success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="none"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <g>
                <path
                  d="M12,22C6.47715,22,2,17.5228,2,12C2,6.47715,6.47715,2,12,2C17.5228,2,22,6.47715,22,12C22,17.5228,17.5228,22,12,22ZM12,20C16.418300000000002,20,20,16.418300000000002,20,12C20,7.58172,16.418300000000002,4,12,4C7.58172,4,4,7.58172,4,12C4,16.418300000000002,7.58172,20,12,20ZM11.0026,16L6.75999,11.7574L8.17421,10.3431L11.0026,13.1716L16.6595,7.51472L18.0737,8.928930000000001L11.0026,16Z"
                  fill="currentColor"
                  fill-opacity="1" />
              </g>
            </svg>
          </div>
        </div>
        <div class="statist-card-item">
          <div class="statist-info">
            <div class="number">22</div>
            <div class="desc">离场人数</div>
          </div>
          <div class="statist-icon danger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="none"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <g>
                <path
                  d="M12,22C6.47715,22,2,17.5228,2,12C2,6.47715,6.47715,2,12,2C15.2713,2,18.1757,3.57078,20.0002,5.99923L17.2909,5.9993099999999995C15.8807,4.754989999999999,14.0285,4,12,4C7.58172,4,4,7.58172,4,12C4,16.418300000000002,7.58172,20,12,20C14.029,20,15.8816,19.2446,17.2919,17.9998L20.0009,17.9998C18.1765,20.4288,15.2717,22,12,22ZM19,16L19,13L11,13L11,11L19,11L19,8L24,12L19,16Z"
                  fill="currentColor"
                  fill-opacity="1" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 待审批区域 -->
    <div class="approval-section">
      <div class="section-title">待审批</div>

      <van-cell-group class="visitor-card">
        <div class="visitor-card-header">
          <div class="visitor-card-header-title">访客1</div>
          <van-tag type="primary" size="small" round>待审批</van-tag>
        </div>
        <van-cell title="来访目的" value="商谈" :border="false" />
        <van-cell title="访客单位" value="杭州电子科技有限公司" :border="false" />
        <van-cell title="电话" value="130-0000-0000" :border="false" />
        <van-cell title="约见时间" value="2024-01-04 09:56:00" :border="false" />
        <div class="action-buttons">
          <van-button plain type="primary" class="action-button" round size="mini">取消</van-button>
          <van-button type="primary" class="action-button" round size="mini">确定</van-button>
        </div>
      </van-cell-group>
      <van-cell-group class="visitor-card">
        <div class="visitor-card-header">
          <div class="visitor-card-header-title">访客1</div>
          <van-tag type="primary" size="small" round>待审批</van-tag>
        </div>
        <van-cell title="来访目的" value="商谈" :border="false" />
        <van-cell title="访客单位" value="杭州电子科技有限公司" :border="false" />
        <van-cell title="电话" value="130-0000-0000" :border="false" />
        <van-cell title="约见时间" value="2024-01-04 09:56:00" :border="false" />
        <div class="action-buttons">
          <van-button plain type="primary" class="action-button" round size="mini">取消</van-button>
          <van-button type="primary" class="action-button" round size="mini">确定</van-button>
        </div>
      </van-cell-group>
    </div>

    <div class="bottom-action">
      <van-button type="primary" round size="large">邀请访客</van-button>
    </div>

    <!-- 底部导航栏 -->
    <van-tabbar v-model="activeTab" class="dashboard-tabbar">
      <van-tabbar-item name="home">
        <span>首页</span>
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="none"
            version="1.1"
            width="1em"
            height="1em"
            viewBox="0 0 24 24">
            <defs>
              <clipPath id="master_svg0_1_1024"><rect x="0" y="0" width="24" height="24" rx="0" /></clipPath>
            </defs>
            <g clip-path="url(#master_svg0_1_1024)">
              <g>
                <path
                  d="M21,19.999699900360106C21,20.55199990036011,20.552299,20.999699900360106,20,20.999699900360106L4,20.999699900360106C3.44772005,20.999699900360106,3,20.55199990036011,3,19.999699900360106L3,9.488820100360108C3,9.180230100360108,3.14246988,8.888930300360109,3.38606,8.699469600360107L11.3860998,2.4772501003601075C11.7472,2.1963899133601075,12.2528,2.1963899133601075,12.6139002,2.4772501003601075L20.613899,8.699469600360107C20.8575,8.888930300360109,21,9.180230100360108,21,9.488820100360108L21,19.999699900360106ZM7,14.999699900360108L7,16.999699900360106L17,16.999699900360106L17,14.999699900360108L7,14.999699900360108Z"
                  fill="currentColor"
                  fill-opacity="1" />
              </g>
            </g>
          </svg>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="visitors">
        <span>来访审批</span>
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="none"
            version="1.1"
            width="1em"
            height="1em"
            viewBox="0 0 24 24">
            <defs>
              <clipPath id="master_svg0_1_1016"><rect x="0" y="0" width="24" height="24" rx="0" /></clipPath>
            </defs>
            <g clip-path="url(#master_svg0_1_1016)">
              <g>
                <path
                  d="M20,2C20.552299,2,21,2.44772005,21,3L21,6.757L19,8.757L19,4L5,4L5,20L19,20L19,17.242001000000002L21,15.242L21,21C21,21.552299,20.552299,22,20,22L4,22C3.44772005,22,3,21.552299,3,21L3,3C3,2.44772005,3.44772005,2,4,2L20,2ZM21.7782,8.8076096L23.1924,10.2217999L15.4142,18L13.9979,17.9979L14,16.5858L21.7782,8.8076096ZM13,12L13,14L8,14L8,12L13,12ZM16,8L16,10L8,10L8,8L16,8Z"
                  fill="currentColor"
                  fill-opacity="1" />
              </g>
            </g>
          </svg>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="location">
        <span>访客记录</span>
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="none"
            version="1.1"
            width="1em"
            height="1em"
            viewBox="0 0 24 24">
            <defs>
              <clipPath id="master_svg0_1_1036"><rect x="0" y="0" width="24" height="24" rx="0" /></clipPath>
            </defs>
            <g clip-path="url(#master_svg0_1_1036)">
              <g>
                <path
                  d="M16,2L20.999701,7L21,20.9925C21,21.548901,20.555099,22,20.006599,22L3.9934001,22C3.44476008,22,3,21.544701,3,21.0082L3,2.99180007C3,2.44405007,3.44748998,2,3.99850011,2L16,2ZM15,4L5,4L5,20L19,20L19,8L15,8L15,4ZM13,9L13,13L16,13L16,15L11,15L11,9L13,9Z"
                  fill="currentColor"
                  fill-opacity="1" />
              </g>
            </g>
          </svg>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Tabbar as VanTabbar, TabbarItem as VanTabbarItem } from 'vant';

const activeTab = ref('home');
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
.dashboard {
  min-height: 100vh;
  background-color: var(--van-background);
  padding-bottom: 60px;
  color: var(--van-text-color);
}

.dashboard-header {
  background-color: var(--van-background-2);
  color: var(--van-text-color);
}

.stats-section {
  padding: var(--van-padding-md);
}

.statist-card-list {
  display: flex;
  gap: var(--van-padding-sm);
  flex-wrap: wrap;
}

.statist-card-item {
  width: calc((100% - var(--van-padding-sm)) / 2);
  padding: var(--van-padding-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0px 4px 8px 0px rgba(187, 197, 201, 0.25);
  border-radius: var(--van-radius-lg);
}

.statist-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--van-padding-xs);
}

.statist-info .number {
  font-size: 28px;
  line-height: 32px;
  text-align: center;
  color: var(--van-text-color);
  font-weight: var(--van-font-bold);
}

.statist-info .desc {
  font-size: var(--van-font-size-sm);
  color: var(--van-text-color-2);
  text-align: center;
  line-height: 1;
}

.statist-icon.primary {
  color: var(--van-primary-color);
}

.statist-icon.success {
  color: var(--van-success-color);
}

.statist-icon.danger {
  color: var(--van-danger-color);
}

.statist-card-item.primary {
  background-color: var(--van-primary-color);
}
.statist-card-item.primary .number,
.statist-card-item.primary .desc,
.statist-card-item.primary .statist-icon {
  color: #fff;
}

.approval-section {
  padding: 0 var(--van-padding-md);
}

.section-title {
  font-size: var(--van-font-size-lg);
  font-weight: var(--van-font-bold);
  color: var(--van-text-color);
  margin-bottom: var(--van-padding-sm);
}

.visitor-card {
  margin-bottom: var(--van-padding-sm);
  border-radius: var(--van-radius-lg);
  overflow: hidden;
  box-shadow: 0px 4px 8px 0px rgba(187, 197, 201, 0.25);
}

.visitor-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--van-padding-sm) var(--van-padding-md);
  border-bottom: 1px solid var(--van-border-color);
}

.visitor-card-header-title {
  font-weight: var(--van-font-bold);
  font-size: var(--van-font-size-md);
  color: var(--van-text-color);
}

.action-buttons {
  display: flex;
  padding: var(--van-padding-sm) var(--van-padding-md);
  align-items: center;
  justify-content: flex-end;
}

.action-button {
  padding: 0 var(--van-padding-sm);
}

.dashboard-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--van-background-2);
  border-top: 1px solid var(--van-border-color);
  z-index: 99;
}

.dashboard-tabbar .van-tabbar-item--active {
  color: var(--van-blue);
}

.bottom-action {
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  padding: var(--van-padding-md);
  background-color: var(--van-background-2);
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06),0px 4px 8px 0px rgba(187, 197, 201, 0.25);
}
</style>
