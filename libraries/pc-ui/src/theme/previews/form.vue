<template>
<u-multi-layout direction="vertical" style="height: 100vh;font-family: var(--font-family-zh-CN);">
    <u-multi-layout-item style="height: 60px;background-color: #000;">
      <u-navbar-multi>
        <template #right>
            <u-multi-layout-item alignItems="center" justify="end">
                <u-dropdown style="margin-right: 10px;">
                    <template #default>
                        <u-dropdown-item>
                            <u-text text="安全退出"></u-text>
                        </u-dropdown-item>
                    </template>
                    <template #title>
                      <img
                        :src="AvatarDefault"
                        fit="cover"
                        style="
                          width: 36px;
                          height: 36px;
                          vertical-align: middle;
                        "></img>
                      <span style="display: inline-block; vertical-align: top; margin-left: 10px; margin-right: 10px;">
                        <u-text text="DEVACC-examtemplate"></u-text>
                      </span>
                    </template>
                </u-dropdown>
            </u-multi-layout-item>
        </template>
        <template #left>
            <u-multi-layout-item align-items="center" style="width:200px;">
                <img
                fit="cover"
                :src="Logo"
                style="
                  width: 28px;
                  height: 28px;
                  margin: 16px 14px;
                  --custom-start: auto;
                  vertical-align: middle;
                "></img>
                <u-text size="large" text="应用名称" style="--custom-start: auto; vertical-align: middle;"></u-text>
            </u-multi-layout-item>
        </template>
        <u-navbar-item-multi destination="">
            <u-text text="顶部导航1"></u-text>
        </u-navbar-item-multi>
        <u-navbar-item-multi>
            <u-text text="顶部导航2"></u-text>
        </u-navbar-item-multi>
      </u-navbar-multi>
    </u-multi-layout-item>
    <u-multi-layout-item>
        <u-multi-layout>
            <u-multi-layout-item style="width: 200px;">
              <u-sidebar :router="false" value="form" style="--sidebar-item-icon-color-selected: var(--brand-primary)">
                <u-sidebar-item icon="home" value="dashboard">
                  <u-text text="Dashboard"></u-text>
                </u-sidebar-item>
                <u-sidebar-item icon="edit" value="form">
                  <u-text text="表单页"></u-text>
                </u-sidebar-item>
              </u-sidebar>
            </u-multi-layout-item>
            <u-multi-layout-item>
              <u-linear-layout type="flex" direction="vertical" gap="normal" class="form_page_layout">
                <u-panel title="项目信息">
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
                </u-panel>

                <u-panel>
                  <u-tabs appear="line">
                    <u-tab title="基本信息">
                      <div class="sub-title">
                        详情列表
                      </div>
                      <u-info-list>
                        <u-info-list-item label="项目名称">CodeWave智能开发平台</u-info-list-item>
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
                          { name: 'CodeWave智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                          { name: 'CodeWave智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                          { name: 'CodeWave智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                          { name: 'CodeWave智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                          { name: 'CodeWave智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
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
                        <u-info-list-item label="项目名称">CodeWave智能开发平台</u-info-list-item>
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
                          { name: 'CodeWave智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                          { name: 'CodeWave智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                          { name: 'CodeWave智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                          { name: 'CodeWave智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
                          { name: 'CodeWave智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
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
                </u-panel>
              </u-linear-layout>
            </u-multi-layout-item>
        </u-multi-layout>
    </u-multi-layout-item>
</u-multi-layout>
</template>
<script>
import AvatarDefault from '../assets/avatar-default.svg';
import Logo from '../assets/lcap-logo-light.svg'

export default {
  data() {
    return {
      AvatarDefault,
      Logo,
    };
  },
};
</script>
<style>
.form_page_layout {
  padding: var(--space-medium);
  background-color: var(--background-color-disabled-light);
  min-height: 100%;
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
