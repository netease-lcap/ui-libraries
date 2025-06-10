<!-- 基本用法 -->
<template>
  <div>
    <el-list-components :column="2" idField="id" :data-source="dataSource">
      <template #default="scope">
        <el-button>{{ scope.item.name }}</el-button>
      </template>
    </el-list-components>
  </div>
</template>

<script setup>
const dataSource = [
  {
    id: 1,
    name: 'John',
  },
  {
    id: 2,
    name: 'Doe',
  },
  {
    id: 3,
    name: 'Tom',
  },
];
</script>
