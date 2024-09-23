<template>
<el-container style="height: 100vh;">
  <el-header style="padding: 0">
    <el-menu background-color="#545c64" text-color="#fff" style="color: #fff; padding: 0 20px;" active-text-color="#ffd04b" mode="horizontal" defaultActive="menu1">
      <template #left>
        <el-flex mode="flex" :gutter="12" alignment="center" style="min-width: 160px; margin-right: 12px;">
          <el-image fit="cover" :src="Logo" style="width: 28px; height: 28px;"></el-image>
          <el-text text="应用名称" size="large" style="--custom-start: auto;"></el-text>
        </el-flex>
      </template>
      <el-menu-item index="menu1"><template #default><el-text text="顶部导航一"></el-text></template></el-menu-item>
      <el-menu-item index="menu2"><template #default><el-text text="顶部导航二"></el-text></template></el-menu-item>
      <el-submenu index="menu3"><template #title><el-text text="顶部导航三"></el-text></template><template #default><el-menu-item index="men"><template #default><el-text text="菜单项"></el-text></template></el-menu-item></template></el-submenu>
      <template #right>
        <el-flex mode="flex" alignment="center" :gutter="12" style="color: #fff;cursor: pointer;">
          <el-image fit="cover" :src="AvatarDefault" style="width: 36px; height: 36px;"></el-image>
          <el-text text="DEVACC-examtemplate"></el-text>
        </el-flex>
      </template>
      </el-menu>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu style="height: 100%" defaultActive="2">
        <el-menu-item index="1"><el-text text="Dashboard"></el-text></el-menu-item>
        <el-menu-item index="2"><el-text text="表单页"></el-text></el-menu-item>
        <el-menu-item index="3"><el-text text="导航三"></el-text></el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <el-card shadow="never">
          <el-text text="项目信息" slot="header"></el-text>
          <el-form-pro 
            :inline="true" 
            :requiredMark="true"
            layout="inline"
            label-position="right" 
            label-width="100px">
            <el-form-item-pro label="项目名称">
              <el-input-pro placeholder="请输入" class="form-item-content"></el-input-pro>
            </el-form-item-pro>
            <el-form-item-pro label="项目描述">
              <el-input-pro placeholder="请输入" class="form-item-content"></el-input-pro>
            </el-form-item-pro>
            <el-form-item-pro label="项目类型">
              <el-select-pro placeholder="活动区域" class="form-item-content">
                <el-option label="全部" value="all" class="form-item-content"></el-option>
              </el-select-pro>
            </el-form-item-pro>
            <el-form-item-pro label="负责人">
              <el-input-pro placeholder="请输入" class="form-item-content"></el-input-pro>
            </el-form-item-pro>
            <el-form-item-pro label="生效日期">
              <el-date-picker-pro
                type="date"
                placeholder="请选择"
                class="form-item-content"></el-date-picker-pro>
            </el-form-item-pro>
            <el-form-item-pro label="执行人">
              <el-input-pro placeholder="请输入" class="form-item-content"></el-input-pro>
            </el-form-item-pro>
          </el-form-pro>
        </el-card>

        <el-card shadow="never" style="margin-top: var(--el-comp-margin-l)">
          <el-tabs value="first">
            <el-tab-pane label="基本信息" name="first"></el-tab-pane>
            <el-tab-pane label="关联信息" name="second"></el-tab-pane>
          </el-tabs>

          <el-descriptions :colon="false" label-class-name="descriptions-label" content-class-name="descriptions-content">
            <template slot="title">
              <div class="sub-title">详情列表</div>
            </template>
            <el-descriptions-item label="项目名称">CodeWave智能开发平台</el-descriptions-item>
            <el-descriptions-item label="项目描述">为企业提供更加智能化的软件生产方式</el-descriptions-item>
            <el-descriptions-item label="项目类型">低代码</el-descriptions-item>
            <el-descriptions-item label="负责人">小C</el-descriptions-item>
            <el-descriptions-item label="生效日期">2024/01/27</el-descriptions-item>
            <el-descriptions-item label="执行人">林哈哈</el-descriptions-item>
          </el-descriptions>

          <div class="sub-title">数据表格</div>
          <el-table-pro
            :data-source="[
              { name: 'CodeWave智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
              { name: 'CodeWave智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
              { name: 'CodeWave智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
              { name: 'CodeWave智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
              { name: 'CodeWave智能开发平台', desc: '为企业提供更加智能化的软件生产方式', type: '低代码', owner: '小C', date: '2024-01-27', execute: '林哈哈' },
            ]"
          >
            <el-table-column-pro
              title="项目名称"
              colKey="name"
              width="25%"></el-table-column-pro>
            <el-table-column-pro
              title="项目描述"
              colKey="desc"
              width="25%"></el-table-column-pro>
            <el-table-column-pro
              title="项目类型"
              colKey="type"></el-table-column-pro>
            <el-table-column-pro
              title="负责人"
              colKey="owner"></el-table-column-pro>
            <el-table-column-pro
              title="生效日期"
              colKey="date"></el-table-column-pro>
            <el-table-column-pro
              title="执行人"
              colKey="execute"></el-table-column-pro>
            <el-table-column-pro
              title="操作"
              colKey="id">
              <template #cell>
                <div class="text-button">查看详细</div>
              </template>
            </el-table-column-pro>
          </el-table-pro>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</el-container>
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
  font-weight: var(--font-weight-primary);
  color: var(--font-fourth-color);
}

.sub-title::before {
  content: '';
  display: block;
  width: 4px;
  height: 14px;
  background-color: var(--el-color-primary-6);
  margin-right: var(--el-comp-margin-s);
}

.descriptions-label {
  color: var(--font-color-disabled-base);
  margin: var(--el-comp-margin-l) 0 var(--el-comp-margin-l) var(--el-comp-margin-xl);
}

.descriptions-content {
  margin: var(--el-comp-margin-l) 0;
}

.text-button {
  cursor: pointer;
  color: var(--el-color-primary-6);
}

.form-item-content {
  width: 240px;
}
</style>
