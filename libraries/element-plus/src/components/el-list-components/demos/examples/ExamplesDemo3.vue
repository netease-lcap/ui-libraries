<!-- 选中功能示例 -->

<template>
  <div>
    <h3>组件列表选中功能示例</h3>

    <!-- 示例 1: 单选模式 -->
    <div style="margin-bottom: 40px;">
      <h4>示例 1: 单选模式</h4>
      <p style="color: #909399; font-size: 14px; margin-bottom: 10px;">
        点击项目进行单选，选中项会高亮显示
      </p>
      <div style="margin-bottom: 10px;">
        <el-tag>当前选中: {{ selectedSingle || '未选中' }}</el-tag>
      </div>
      <el-list-components
        :column="4"
        :data-source="sampleData"
        :row-gap="10"
        :column-gap="10"
        selection-mode="single"
        v-model="selectedSingle"
        @selection-change="handleSingleChange">
        <template #default="{ item, selected }">
          <div style="
            padding: 20px;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            text-align: center;
            transition: all 0.3s;
          ">
            <div style="font-weight: bold; margin-bottom: 8px;">项目 {{ item }}</div>
            <el-tag v-if="selected" type="success" size="small">已选中</el-tag>
          </div>
        </template>
      </el-list-components>
    </div>

    <!-- 示例 2: 多选模式 -->
    <div style="margin-bottom: 40px;">
      <h4>示例 2: 多选模式</h4>
      <p style="color: #909399; font-size: 14px; margin-bottom: 10px;">
        点击项目进行多选，可以选择多个项目
      </p>
      <div style="margin-bottom: 10px;">
        <el-tag>已选中 {{ selectedMultiple.length }} 项</el-tag>
        <el-tag v-for="val in selectedMultiple" :key="val" style="margin-left: 5px;" closable @close="removeSelection(val)">
          {{ val }}
        </el-tag>
        <el-button size="small" style="margin-left: 10px;" @click="clearSelection">清空</el-button>
      </div>
      <el-list-components
        :column="5"
        :data-source="sampleData"
        :row-gap="10"
        :column-gap="10"
        selection-mode="multiple"
        v-model="selectedMultiple"
        @selection-change="handleMultipleChange">
        <template #default="{ item, selected }">
          <div style="
            padding: 15px;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            text-align: center;
            transition: all 0.3s;
          ">
            <div style="font-weight: bold;">{{ item }}</div>
            <el-icon v-if="selected" name="CircleCheck" style="color: #67c23a; margin-top: 5px; font-size: 18px;" />
          </div>
        </template>
      </el-list-components>
    </div>

    <!-- 示例 3: 对象数据选中 -->
    <div style="margin-bottom: 40px;">
      <h4>示例 3: 对象数据选中（单选）</h4>
      <p style="color: #909399; font-size: 14px; margin-bottom: 10px;">
        使用 idField 指定唯一标识字段
      </p>
      <div style="margin-bottom: 10px;">
        <el-tag v-if="selectedObject">
          选中: {{ selectedObject.name }} (ID: {{ selectedObject.id }})
        </el-tag>
        <el-tag v-else>未选中</el-tag>
      </div>
      <el-list-components
        :column="3"
        :data-source="objectData"
        :row-gap="16"
        :column-gap="16"
        selection-mode="single"
        id-field="id"
        v-model="selectedObject">
        <template #default="{ item, selected }">
          <el-card shadow="hover" :body-style="{ padding: '15px' }">
            <div style="display: flex; align-items: center;">
              <el-avatar :size="50" :src="item.avatar" style="margin-right: 15px;" />
              <div style="flex: 1;">
                <h4 style="margin: 0 0 5px 0;">{{ item.name }}</h4>
                <p style="margin: 0; color: #909399; font-size: 12px;">{{ item.role }}</p>
              </div>
              <el-icon v-if="selected" name="CircleCheck" style="color: #67c23a; font-size: 24px;" />
            </div>
          </el-card>
        </template>
      </el-list-components>
    </div>

    <!-- 示例 4: 对象数据多选 -->
    <div>
      <h4>示例 4: 对象数据多选</h4>
      <p style="color: #909399; font-size: 14px; margin-bottom: 10px;">
        多选模式下选择多个用户
      </p>
      <div style="margin-bottom: 10px;">
        <el-tag>已选中 {{ selectedObjects.length }} 个用户</el-tag>
        <el-tag 
          v-for="obj in getSelectedObjectDetails()" 
          :key="obj.id" 
          style="margin-left: 5px;" 
          closable 
          @close="removeObjectSelection(obj.id)">
          {{ obj.name }}
        </el-tag>
      </div>
      <el-list-components
        :column="4"
        :data-source="objectData"
        :row-gap="12"
        :column-gap="12"
        selection-mode="multiple"
        id-field="id"
        v-model="selectedObjects">
        <template #default="{ item, selected }">
          <div style="
            padding: 15px;
            border: 1px solid #dcdfe6;
            border-radius: 8px;
            text-align: center;
            transition: all 0.3s;
          ">
            <el-avatar :size="60" :src="item.avatar" style="margin-bottom: 10px;" />
            <div style="font-weight: bold; margin-bottom: 5px;">{{ item.name }}</div>
            <div style="color: #909399; font-size: 12px; margin-bottom: 8px;">{{ item.role }}</div>
            <el-tag v-if="selected" type="success" size="small">已选中</el-tag>
          </div>
        </template>
      </el-list-components>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 简单数据
const sampleData = ref(Array.from({ length: 20 }, (_, i) => i + 1));

// 单选
const selectedSingle = ref(null);
const handleSingleChange = (value, items) => {
  console.log('单选改变:', value, items);
};

// 多选
const selectedMultiple = ref([]);
const handleMultipleChange = (values, items) => {
  console.log('多选改变:', values, items);
};

const removeSelection = (val) => {
  selectedMultiple.value = selectedMultiple.value.filter(v => v !== val);
};

const clearSelection = () => {
  selectedMultiple.value = [];
};

// 对象数据
const objectData = ref([
  { id: 1, name: '张三', role: '产品经理', avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' },
  { id: 2, name: '李四', role: '前端工程师', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
  { id: 3, name: '王五', role: '后端工程师', avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png' },
  { id: 4, name: '赵六', role: 'UI 设计师', avatar: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png' },
  { id: 5, name: '钱七', role: '测试工程师', avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' },
  { id: 6, name: '孙八', role: '运维工程师', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
]);

// 对象单选
const selectedObject = ref(null);

// 对象多选
const selectedObjects = ref([]);

const getSelectedObjectDetails = () => {
  return objectData.value.filter(obj => selectedObjects.value.includes(obj.id));
};

const removeObjectSelection = (id) => {
  selectedObjects.value = selectedObjects.value.filter(v => v !== id);
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

