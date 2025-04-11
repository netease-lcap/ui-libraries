<template>
  <PageLayout>
    <div class="form_page_layout">
      <div class="card x-panel-card">
        <div class="x-panel-card-header">
          <u-text text="资源监控" class="x-panel-card-header-title"></u-text>
        </div>
        <u-form repeat="3">
          <u-form-item required label="项目名称">
            <u-input placeholder="请输入"></u-input>
          </u-form-item>
          <u-form-item required label="项目描述">
            <u-input placeholder="请输入"></u-input>
          </u-form-item>
          <u-form-item required label="项目类型">
            <u-select value="" placeholder="请选择">
              <u-select-item>全部</u-select-item>
            </u-select>
          </u-form-item>
          <u-form-item required label="负责人">
              <u-input placeholder="请输入"></u-input>
          </u-form-item>
          <u-form-item required label="生效日期">
              <u-date-picker placeholder="请选择日期"></u-date-picker>
          </u-form-item>
          <u-form-item required label="执行人">
              <u-input placeholder="请输入"></u-input>
          </u-form-item>
        </u-form>
      </div>
      <div class="card">
        <u-tabs appear="line">
          <u-tab title="基本信息">
            <div class="sub-title">
              详情列表
            </div>
            <u-info-list>
              <u-info-list-item label="项目名称">智能开发平台</u-info-list-item>
              <u-info-list-item label="项目描述">为企业提供更加智能化的软件生产方式</u-info-list-item>
              <u-info-list-item label="项目类型">低代码</u-info-list-item>
              <u-info-list-item label="负责人">小C</u-info-list-item>
              <u-info-list-item label="生效日期">2024/01/27</u-info-list-item>
              <u-info-list-item label="执行人">林哈哈</u-info-list-item>
            </u-info-list>

            <div class="sub-title">
              数据表格
            </div>

            <u-table-view
              :data-source="[
                { name: '智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                { name: '智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                { name: '智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                { name: '智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                { name: '智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
              ]"
            >
              <u-table-view-column title="项目名称" field="name" width="25%"></u-table-view-column>
              <u-table-view-column title="项目描述" field="desc" width="25%"></u-table-view-column>
              <u-table-view-column title="项目类型" field="type"></u-table-view-column>
              <u-table-view-column title="负责人" field="owner"></u-table-view-column>
              <u-table-view-column title="生效日期" field="date"></u-table-view-column>
              <u-table-view-column title="执行人" field="execute"></u-table-view-column>
              <u-table-view-column title="操作" field="id">
                <template #cell>
                  <div class="text-button">查看详细</div>
                </template>
              </u-table-view-column>
            </u-table-view>
          </u-tab>
          <u-tab title="关联信息">
            <div class="sub-title">
              详情列表
            </div>
            <u-info-list>
              <u-info-list-item label="项目名称">智能开发平台</u-info-list-item>
              <u-info-list-item label="项目描述">为企业提供更加智能化的软件生产方式</u-info-list-item>
              <u-info-list-item label="项目类型">低代码</u-info-list-item>
              <u-info-list-item label="负责人">小C</u-info-list-item>
              <u-info-list-item label="生效日期">2024/01/27</u-info-list-item>
              <u-info-list-item label="执行人">林哈哈</u-info-list-item>
            </u-info-list>

            <div class="sub-title">
              数据表格
            </div>

            <u-table-view
              :data-source="[
                { name: '智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                { name: '智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                { name: '智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                { name: '智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                { name: '智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
              ]"
            >
              <u-table-view-column title="项目名称" field="name" width="25%"></u-table-view-column>
              <u-table-view-column title="项目描述" field="desc" width="25%"></u-table-view-column>
              <u-table-view-column title="项目类型" field="type"></u-table-view-column>
              <u-table-view-column title="负责人" field="owner"></u-table-view-column>
              <u-table-view-column title="生效日期" field="date"></u-table-view-column>
              <u-table-view-column title="执行人" field="execute"></u-table-view-column>
              <u-table-view-column title="操作" field="id">
                <template #cell>
                  <div class="text-button">查看详细</div>
                </template>
              </u-table-view-column>
            </u-table-view>
          </u-tab>
        </u-tabs>
      </div>
    </div>
  </PageLayout>
</template>
<script>
import PageLayout from './layout.vue';
import AvatarDefault from '../assets/avatar-default.svg';
import Logo from '../assets/lcap-logo-light.svg'

export default {
  components: {
    PageLayout,
  },
  data() {
    return {
      AvatarDefault,
      Logo,
    };
  },
};
</script>
<style scoped>
.form_page_layout {
  padding: var(--space-base);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-base);
}

.card {
  padding: var(--space-base);
  border-radius: var(--border-radius-medium);
  background-color: var(--background-color-default);
}

.x-panel-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: var(--space-base);
}

.x-panel-card-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.x-panel-card-header-title {
  font-size: var(--font-size-large);
  color: var(--color-base);
  line-height: calc(var(--font-size-large) + 8px);
  font-weight: 500;
}

.sub-title {
  height: 48px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 500;
  color: var(--font-fourth-color);
}

.sub-title::before {
  content: '';
  display: block;
  width: 4px;
  height: 14px;
  background-color: var(--brand-primary);
  margin-right: var(--space-small);
}
</style>
