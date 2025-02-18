<template>
  <el-container style="height: 100vh">
    <el-header style="padding: 0">
      <el-menu :ellipsis="false" background-color="#545c64" text-color="#fff" style="color: #fff; padding: 0 20px;" active-text-color="#ffd04b" mode="horizontal" defaultActive="menu1">
        <el-flex mode="flex" :gutter="12" alignment="center" style="min-width: 160px; margin-right: 12px;">
          <el-image fit="cover" :src="Logo" style="width: 28px; height: 28px;"></el-image>
          <el-text text="应用名称" size="large" style="--custom-start: auto;"></el-text>
        </el-flex>
      <el-menu-item index="menu1"><template #default><el-text text="顶部导航一"></el-text></template></el-menu-item>
      <el-menu-item index="menu2"><template #default><el-text text="顶部导航二"></el-text></template></el-menu-item>
      <el-sub-menu index="menu3">
        <template #title><el-text text="顶部导航三"></el-text></template>
        <el-menu-item index="men"><template #default><el-text text="菜单项"></el-text></template></el-menu-item>
      </el-sub-menu>
      <el-flex mode="flex" alignment="center" :gutter="12" style="color: #fff;cursor: pointer;flex: 1; justify-content: flex-end;">
        <el-image fit="cover" :src="AvatarDefault" style="width: 36px; height: 36px;"></el-image>
        <el-text text="DEVACC-examtemplate"></el-text>
      </el-flex>
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
            <el-form :inline="true" :requiredMark="true" layout="inline" label-position="right" label-width="100px" style="margin-top: 24px;">
              <el-form-item label="项目名称">
                <el-input placeholder="请输入" class="form-item-content"></el-input>
              </el-form-item>
              <el-form-item label="项目描述">
                <el-input placeholder="请输入" class="form-item-content"></el-input>
              </el-form-item>
              <el-form-item label="项目类型">
                <el-select placeholder="活动区域" class="form-item-content">
                  <el-option label="全部" value="all" class="form-item-content"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="负责人">
                <el-input placeholder="请输入" class="form-item-content"></el-input>
              </el-form-item>
              <el-form-item label="生效日期">
                <el-date-picker type="date" placeholder="请选择" style="width: 240px;" class="form-item-content"></el-date-picker>
              </el-form-item>
              <el-form-item label="执行人">
                <el-input placeholder="请输入" class="form-item-content"></el-input>
              </el-form-item>
            </el-form>
          </el-card>

          <el-card shadow="never" style="margin-top: 32px">
            <el-tabs model-value="first">
              <el-tab-pane label="基本信息" name="first"></el-tab-pane>
              <el-tab-pane label="关联信息" name="second"></el-tab-pane>
            </el-tabs>

            <el-descriptions
              :colon="false"
              label-class-name="descriptions-label"
              content-class-name="descriptions-content">
              <template #title>
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
            <el-table
              :data="[
                {
                  name: 'CodeWave智能开发平台',
                  desc: '为企业提供更加智能化的软件生产方式',
                  type: '低代码',
                  owner: '小C',
                  date: '2024-01-27',
                  execute: '林哈哈',
                },
                {
                  name: 'CodeWave智能开发平台',
                  desc: '为企业提供更加智能化的软件生产方式',
                  type: '低代码',
                  owner: '小C',
                  date: '2024-01-27',
                  execute: '林哈哈',
                },
                {
                  name: 'CodeWave智能开发平台',
                  desc: '为企业提供更加智能化的软件生产方式',
                  type: '低代码',
                  owner: '小C',
                  date: '2024-01-27',
                  execute: '林哈哈',
                },
                {
                  name: 'CodeWave智能开发平台',
                  desc: '为企业提供更加智能化的软件生产方式',
                  type: '低代码',
                  owner: '小C',
                  date: '2024-01-27',
                  execute: '林哈哈',
                },
                {
                  name: 'CodeWave智能开发平台',
                  desc: '为企业提供更加智能化的软件生产方式',
                  type: '低代码',
                  owner: '小C',
                  date: '2024-01-27',
                  execute: '林哈哈',
                },
              ]">
              <el-table-column label="项目名称" width="200" prop="name"></el-table-column>
              <el-table-column label="项目描述" width="300" prop="desc"></el-table-column>
              <el-table-column label="项目类型" prop="type"></el-table-column>
              <el-table-column label="负责人" prop="owner"></el-table-column>
              <el-table-column label="生效日期" width="160" prop="date"></el-table-column>
              <el-table-column label="执行人" prop="execute"></el-table-column>
              <el-table-column label="操作" prop="id">
                <template #default>
                  <div class="text-button">查看详细</div>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script setup>
import AvatarDefault from '../assets/avatar-default.svg';
import Logo from '../assets/lcap-logo-light.svg';
import {
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElImage,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTabs,
  ElTabPane,
  ElDescriptions,
  ElDescriptionsItem,
  ElTable,
  ElTableColumn,
} from 'element-plus';
</script>
<style>
.form_page_layout {
  padding: 24px;
  background-color: var(--el-bg-color-page);
  min-height: 100%;
}

.sub-title {
  height: 48px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: var(--el-font-weight-primary);
  color: var(--el-text-color-primary);
}

.sub-title::before {
  content: '';
  display: block;
  width: 4px;
  height: 14px;
  background-color: var(--el-color-primary);
  margin-right: 4px;
}

.descriptions-label {
  color: var(--el-text-color-disabled);
  margin: 32px 0 32px 48px;
}

.descriptions-content {
  margin: 32px 0;
}

.text-button {
  cursor: pointer;
  color: var(--el-color-primary);
}

.form-item-content {
  width: 240px;
}
</style>
