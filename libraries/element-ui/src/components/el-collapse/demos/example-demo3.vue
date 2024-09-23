<!-- 基础用法 -->
<!--  数据源 -->
<template>
    <div>
      <el-flex mode="block" :gutter="12">
        <el-flex mode="block">
          <el-collapse :value.sync="activeNames" @change="handleChange" :dataSource="load" valueField="title">
            <template #title="current">
              <div>{{ current.item.title }}</div>
            </template>
            <template #content="current">
              <div>{{ current.item.content }}</div>
            </template>
          </el-collapse>
          {{ activeNames }}
        </el-flex>
        <el-flex mode="block">
          <el-button @click="btnClick">测试为空</el-button>
          <el-collapse :value.sync="activeNames1" @change="handleChange" :dataSource="asyncLoad" valueField="title" ref="collapseRef">
            <template #title="current">
              <div>{{ current.item.title }}</div>
            </template>
            <template #content="current">
              <div>{{ current.item.content }}</div>
            </template>
          </el-collapse>
          {{ activeNames1 }}
        </el-flex>
    </el-flex>
  </div>
</template>
<script>
  // 模拟后端请求
const mockRequest = (data, timeout = 300) => new Promise((res, rej) => setTimeout(() => res(data), timeout));
let data = [
  { title: 'text1', content: 'content1' },
  { title: 'text2', content: 'content2' },
  { title: 'text3', content: 'content3' },
];
// 模拟数据服务
const mockService = {
  load() {
    return data;
  },
};
export default {
  data() {
    return {
      activeNames: ['text1'],
      activeNames1: [],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    load() {
      return mockService.load();
    },
    asyncLoad() {
      return mockRequest(mockService.load()).then((res) => {
        this.activeNames1 = res[1]?.title? [res[1].title] : [];
        return res;
      });
    },
    btnClick() {
      if(data.length === 0) {
        data = [
          { title: 'text1', content: 'content1' },
          { title: 'text2', content: 'content2' },
          { title: 'text3', content: 'content3' },
        ];
      } else {
        data = [];
      }
      this.$refs.collapseRef.reload();
    },
  },
};
</script>
  