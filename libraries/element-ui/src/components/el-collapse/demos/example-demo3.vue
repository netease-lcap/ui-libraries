<!-- 基础用法 -->
<!--  数据源 -->
<template>
    <div>
      <el-collapse v-model="activeNames" @change="handleChange" :dataSource="load" valueField="title">
        <template #title="current">
          <div>{{ current.item.title }}</div>
        </template>
        <template #content="current">
          <div>{{ current.item.content }}</div>
        </template>
      </el-collapse>
      {{ activeNames }}
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        activeNames: ['text1'],
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      load() {
        return [
            { title: 'text1', content: 'content1' },
            { title: 'text2', content: 'content2' },
            { title: 'text3', content: 'content3' },
        ]
      }
    },
  };
  </script>
  