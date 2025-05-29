<!-- 基础用法 -->
<!--  数据源 -->
<template>
  <div>
    <el-collapse :modelValue.sync="activeNames" @change="handleChange" :dataSource="load" valueField="title">
      <template #title="current">
        {{ current.item.title }}
      </template>
      <template #content="current">
        {{ current.item.content }}
      </template>
    </el-collapse>
    {{ activeNames }}
  </div>
</template>
<script>
// 模拟后端请求
const mockRequest = (data, timeout = 300) => new Promise((res, rej) => setTimeout(() => res(data), timeout));
let data = [
  { name: '1', title: 'text1', content: 'content1' },
  { name: '2', title: 'text2', content: 'content2' },
  { name: '3', title: 'text3', content: 'content3' },
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
      activeNames: ['1'],
      activeNames1: [],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
      this.activeNames = val;
    },
    load() {
      return mockService.load();
    },
    asyncLoad() {
      return mockRequest(mockService.load()).then((res) => {
        this.activeNames1 = res[1]?.title ? [res[1].title] : [];
        return res;
      });
    },
    btnClick() {
      if (data.length === 0) {
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
