<template>
  <div class="dashboard">
    <!-- 顶部标题栏 -->
    <van-nav-bar
      title="首页"
      :border="false"
      class="dashboard-header"
    >
      <template #right>
        <van-icon name="question-o" size="20" />
      </template>
    </van-nav-bar>

    <!-- 统计卡片区域 -->
    <div class="stats-section">
      <van-row :gutter="12">
        <van-col :span="12">
          <div class="stat-card stat-card-primary">
            <div class="stat-content">
              <div class="stat-number">43</div>
              <div class="stat-label">邀请人数</div>
            </div>
            <van-icon name="friends-o" class="stat-icon" />
          </div>
        </van-col>
        <van-col :span="12">
          <div class="stat-card">
            <div class="stat-content">
              <div class="stat-number">38</div>
              <div class="stat-label">登记人数</div>
            </div>
            <van-icon name="edit" class="stat-icon stat-icon-blue" />
          </div>
        </van-col>
      </van-row>
      <van-row :gutter="12" class="stats-row">
        <van-col :span="12">
          <div class="stat-card">
            <div class="stat-content">
              <div class="stat-number">24</div>
              <div class="stat-label">入园人数</div>
            </div>
            <van-icon name="passed" class="stat-icon stat-icon-green" />
          </div>
        </van-col>
        <van-col :span="12">
          <div class="stat-card">
            <div class="stat-content">
              <div class="stat-number">22</div>
              <div class="stat-label">离场人数</div>
            </div>
            <van-icon name="arrow" class="stat-icon stat-icon-red" />
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 待审批区域 -->
    <div class="approval-section">
      <div class="section-title">待审批</div>

      <!-- 访客1 -->
      <van-cell-group class="visitor-card">
        <van-cell title="访客1" :border="false">
          <template #right-icon>
            <van-tag type="primary" size="small">待审批</van-tag>
          </template>
        </van-cell>
        <van-cell title="来访目的" value="商谈" :border="false" />
        <van-cell title="访客单位" value="杭州电子科技有限公司" :border="false" />
        <van-cell title="电话" value="130-0000-0000" :border="false" />
        <van-cell title="约见时间" value="2024-01-04 09:56:00" :border="false" />
        <div class="action-buttons">
          <van-button size="small" plain type="primary" class="cancel-btn">取消</van-button>
          <van-button size="small" type="primary" class="confirm-btn">确定</van-button>
        </div>
      </van-cell-group>

      <!-- 访客2 -->
      <van-cell-group class="visitor-card">
        <van-cell title="访客2" :border="false">
          <template #right-icon>
            <van-tag type="primary" size="small">待审批</van-tag>
          </template>
        </van-cell>
        <van-cell title="来访目的" value="商谈" :border="false" />
        <van-cell title="访客单位" value="杭州电子科技有限公司" :border="false" />
        <van-cell title="电话" value="130-0000-0001" :border="false" />
        <van-cell title="约见时间" value="2024-01-04 10:00:00" :border="false" />
        <div class="action-buttons">
          <van-button size="small" plain type="primary" class="cancel-btn">取消</van-button>
          <van-button size="small" type="primary" class="confirm-btn">确定</van-button>
        </div>
      </van-cell-group>
    </div>

    <!-- 邀请访客按钮 -->
    <div class="invite-section">
      <van-button
        type="primary"
        size="large"
        block
        class="invite-btn"
        icon="plus"
      >
        邀请访客
      </van-button>
    </div>

    <!-- 底部导航栏 -->
    <van-tabbar v-model="activeTab" class="dashboard-tabbar">
      <van-tabbar-item icon="home-o" name="home">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" name="visitors">访客</van-tabbar-item>
      <van-tabbar-item icon="location-o" name="location">位置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('home')
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: var(--van-background);
  padding-bottom: 50px;
}

.dashboard-header {
  background-color: var(--van-background-2);
  color: var(--van-text-color);
}

.stats-section {
  padding: var(--van-padding-md);
}

.stats-row {
  margin-top: var(--van-padding-sm);
}

.stat-card {
  background-color: var(--van-background-2);
  border-radius: var(--van-radius-lg);
  padding: var(--van-padding-md);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-card-primary {
  background: linear-gradient(135deg, var(--van-blue), #4fc3f7);
  color: var(--van-white);
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: var(--van-font-bold);
  line-height: 1.2;
  margin-bottom: var(--van-padding-xs);
}

.stat-label {
  font-size: var(--van-font-size-sm);
  color: var(--van-text-color-2);
}

.stat-card-primary .stat-label {
  color: rgba(255, 255, 255, 0.8);
}

.stat-icon {
  font-size: 24px;
  color: var(--van-text-color-3);
}

.stat-icon-blue {
  color: var(--van-blue);
}

.stat-icon-green {
  color: var(--van-green);
}

.stat-icon-red {
  color: var(--van-red);
}

.approval-section {
  padding: 0 var(--van-padding-md);
  margin-top: var(--van-padding-md);
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.action-buttons {
  display: flex;
  gap: var(--van-padding-sm);
  padding: var(--van-padding-sm) var(--van-padding-md);
  background-color: var(--van-background-2);
}

.cancel-btn {
  flex: 1;
  border-color: var(--van-blue);
  color: var(--van-blue);
}

.confirm-btn {
  flex: 1;
}

.invite-section {
  padding: var(--van-padding-md);
  margin-top: var(--van-padding-lg);
}

.invite-btn {
  height: 44px;
  border-radius: var(--van-radius-lg);
  font-size: var(--van-font-size-lg);
  font-weight: var(--van-font-bold);
}

.dashboard-tabbar {
  background-color: var(--van-background-2);
  border-top: 1px solid var(--van-border-color);
}

.dashboard-tabbar .van-tabbar-item--active {
  color: var(--van-blue);
}
</style>
