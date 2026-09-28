<template>
  <el-timeline
    :dataSource="data"
    timestampField="timestamp"
    >
    <template #content="current">
      {{ current.text }}
    </template>
  </el-timeline>
</template>

<script lang="ts" setup>
const data = [
  {
    text: '{{ item.content }}',
    timestamp: '{{ item.timestamp }}',
    key: 1,
  },
  {
    text: '{{ item.content }}',
    timestamp: '{{ item.timestamp }}',
    key: 2,
  },
  {
    text: '{{ item.content }}',
    timestamp: '{{ item.timestamp }}',
    key: 3,
  },
];
</script>
