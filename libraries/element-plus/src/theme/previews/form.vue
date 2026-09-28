<template>
  <Layout>
    <XPanel title="项目信息">
      <el-form
        :inline="true"
        :requiredMark="true"
        layout="inline"
        label-position="right"
        label-width="100px"
      >
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
          <el-date-picker
            type="date"
            placeholder="请选择"
            style="width: 240px"
            class="form-item-content"></el-date-picker>
        </el-form-item>
        <el-form-item label="执行人">
          <el-input placeholder="请输入" class="form-item-content"></el-input>
        </el-form-item>
      </el-form>
    </XPanel>

    <el-card shadow="never" style="margin-top: 32px">
      <el-tabs modelValue="first">
        <el-tab-pane label="基本信息" name="first"></el-tab-pane>
        <el-tab-pane label="关联信息" name="second"></el-tab-pane>
      </el-tabs>

      <el-descriptions :colon="false" label-class-name="descriptions-label" content-class-name="descriptions-content">
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
  </Layout>
</template>
<script setup>
import Layout from './layout.vue';
import XPanel from './x-panel.vue';
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
