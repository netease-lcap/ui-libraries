<!-- ⾃定义节点样式 -->
<!-- 数据源 -->
<template>
    <div>
      <div class="block">
        <div>同步数据源</div>
        <el-radio-group-pro :dataSource="options" :itemProps="setItemProps" valueField="id" :value.sync="checkedValue">
          <template #item="current">
            {{ current.item.label }}
          </template>
        </el-radio-group-pro>
        {{ checkedValue }}
      </div>
      <div class="block">
        <div>异步数据源</div>
        <el-radio-group-pro :dataSource="load" :itemProps="setItemProps" valueField="id" :value.sync="checkedValue">
          <template #item="current">
            {{ current.item.label }}
          </template>
        </el-radio-group-pro>
      </div>
    </div>
  </template>
  <script>
  // 模拟后端请求
const mockRequest = (data, timeout = 300) => new Promise((res, rej) => setTimeout(() => res(data), timeout));
// 模拟数据服务
const mockService = {
    load() {
        return [
        {
                id: 1,
                label: '选项一',
                allowUncheck: true,
            },
            {
                id: 2,
                label: '选项二',
            },
            {
                id: '3',
                label: '选项三',
                disabled: true
            },
        ];
    },
};
  export default {
    data() {
      return {
        checkedValue: 1,
        options: [
            {
                id: 1,
                label: '选项一',
                allowUncheck: true,
            },
            {
                id: 2,
                label: '选项二',
            },
            {
                id: '3',
                label: '选项三',
                disabled: true
            },
        ],
      };
    },
    methods: {
      setItemProps(current) {
        return {
          allowUncheck: current.item.allowUncheck,
          disabled: current.item.disabled,
        };
      },
      load() {
        const data = mockService.load();
        return mockRequest(data);
      }
    }
  };
  </script>
  