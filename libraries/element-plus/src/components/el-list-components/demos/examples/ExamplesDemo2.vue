<!-- 带分页功能的组件列表 - 智能分页示例 -->

<template>
  <div>
    <h3>智能分页示例（自动判断前端/后端分页）</h3>

    <!-- 示例 1: 静态数据分页（前端分页） -->
    <div style="margin-bottom: 40px;">
      <h4>示例 1: 静态数据（自动前端分页）</h4>
      <p style="color: #909399; font-size: 14px; margin-bottom: 10px;">
        静态数组数据，自动使用前端分页
      </p>
      <el-list-components
        :column="4"
        :data-source="localData"
        :row-gap="10"
        :column-gap="10"
        :show-pagination="true"
        :page-size="8"
        v-model:current-page="currentPage1"
        v-model:page-size="pageSize1"
        @page-change="handlePageChange"
        @size-change="handleSizeChange">
        <template #default="{ item, index }">
          <div style="padding: 20px; border: 1px solid #dcdfe6; border-radius: 4px; text-align: center;">
            <div style="font-weight: bold; margin-bottom: 8px;">项目 {{ item }}</div>
            <div style="color: #909399; font-size: 12px;">索引: {{ index }}</div>
          </div>
        </template>
      </el-list-components>
    </div>

    <!-- 示例 2: 后端分页（返回 total 字段） -->
    <div style="margin-bottom: 40px;">
      <h4>示例 2: 后端分页（返回值有 total 字段）</h4>
      <p style="color: #909399; font-size: 14px; margin-bottom: 10px;">
        返回值包含 total 字段，自动识别为后端分页，每次翻页都会发起请求
      </p>
      <el-list-components
        :column="3"
        :data-source="loadServerData"
        :row-gap="16"
        :column-gap="16"
        :show-pagination="true"
        :page-size="6"
        :pagination-layout="'total, prev, pager, next'"
        v-model:current-page="currentPage2"
        v-model:page-size="pageSize2">
        <template #default="{ item, index }">
          <el-card shadow="hover">
            <div style="padding: 10px;">
              <h4>{{ item.title }}</h4>
              <p style="color: #909399; font-size: 14px;">{{ item.description }}</p>
              <el-tag size="small" style="margin-top: 5px;">请求次数: {{ item.requestCount }}</el-tag>
            </div>
          </el-card>
        </template>
      </el-list-components>
    </div>

    <!-- 示例 3: 前端分页（返回值无 total 字段） -->
    <div style="margin-bottom: 40px;">
      <h4>示例 3: 前端分页（返回值无 total 字段）</h4>
      <p style="color: #909399; font-size: 14px; margin-bottom: 10px;">
        返回值不包含 total 字段，自动识别为前端分页，只请求一次数据
      </p>
      <el-list-components
        :column="3"
        :data-source="loadClientData"
        :row-gap="16"
        :column-gap="16"
        :show-pagination="true"
        :page-size="6"
        :pagination-layout="'total, prev, pager, next'"
        v-model:current-page="currentPage3"
        v-model:page-size="pageSize3">
        <template #default="{ item }">
          <el-card shadow="hover">
            <div style="padding: 10px;">
              <h4>{{ item.title }}</h4>
              <p style="color: #909399; font-size: 14px;">{{ item.description }}</p>
              <el-tag type="success" size="small" style="margin-top: 5px;">前端分页</el-tag>
            </div>
          </el-card>
        </template>
      </el-list-components>
    </div>

    <!-- 示例 4: 自定义分页配置 -->
    <div>
      <h4>示例 4: 自定义分页配置</h4>
      <p style="color: #909399; font-size: 14px; margin-bottom: 10px;">
        自定义分页器样式、布局和选项
      </p>
      <el-list-components
        :column="5"
        :data-source="customData"
        :row-gap="12"
        :column-gap="12"
        :show-pagination="true"
        :page-size="10"
        :page-sizes="[5, 10, 15, 20]"
        :pagination-background="true"
        :pagination-size="'small'"
        :hide-on-single-page="false"
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4">
        <template #default="{ item }">
          <div style="
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            color: white;
            text-align: center;
            font-weight: bold;
          ">
            {{ item }}
          </div>
        </template>
      </el-list-components>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 示例 1: 静态数据（前端分页）
const localData = ref(Array.from({ length: 50 }, (_, i) => i + 1));
const currentPage1 = ref(1);
const pageSize1 = ref(8);

// 示例 2: 后端分页（返回值有 total）
const currentPage2 = ref(1);
const pageSize2 = ref(6);
let serverRequestCount = 0;

const loadServerData = async ({ page, size }) => {
  // 模拟后端 API 请求
  console.log(`[后端分页] 请求第 ${page} 页，每页 ${size} 条`);
  await new Promise(resolve => setTimeout(resolve, 500));

  serverRequestCount++;
  const total = 30;
  const start = (page - 1) * size;
  const data = Array.from({ length: Math.min(size, total - start) }, (_, i) => ({
    title: `后端项目 ${start + i + 1}`,
    description: `这是第 ${start + i + 1} 个项目（后端分页）`,
    requestCount: serverRequestCount,
  }));

  // 关键：返回包含 total 字段的对象，组件自动识别为后端分页
  return {
    list: data,
    total: total, // 有 total 字段 = 后端分页
  };
};

// 示例 3: 前端分页（返回值无 total）
const currentPage3 = ref(1);
const pageSize3 = ref(6);
let clientRequestCount = 0;

const loadClientData = async ({ page, size }) => {
  // 只在首次请求时调用
  console.log(`[前端分页] 请求数据，page=${page}, size=${size}`);
  await new Promise(resolve => setTimeout(resolve, 500));

  clientRequestCount++;
  // 返回所有数据（不包含 total 字段）
  const allData = Array.from({ length: 30 }, (_, i) => ({
    title: `前端项目 ${i + 1}`,
    description: `这是第 ${i + 1} 个项目（前端分页，只请求一次）`,
  }));

  // 关键：只返回数组，不包含 total 字段，组件自动识别为前端分页
  return allData; // 无 total 字段 = 前端分页
};

// 示例 4: 自定义数据
const customData = ref(Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`));
const currentPage4 = ref(1);
const pageSize4 = ref(10);

// 事件处理
const handlePageChange = (event) => {
  console.log('页码改变:', event);
};

const handleSizeChange = (event) => {
  console.log('每页数量改变:', event);
};
</script>

<style scoped>
h3 {
  margin-bottom: 24px;
  color: #303133;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
}

h4 {
  margin-bottom: 16px;
  color: #606266;
  font-size: 16px;
}
</style>
