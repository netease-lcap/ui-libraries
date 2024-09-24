<!-- 基础示例 -->
<template>
    <div>
      <div class="block">
        <el-transfer-pro :dataSource="list"
          showCheckAll
          :value.sync="targetValues"
          :checked.sync="checked"
          @change="onChange"
          @checked-change="onCheckedChange"
          @sync:state="onSyncState"/>
          {{ targetValues }}
          {{ checked }}
      </div>
      <div class="block">
        <el-transfer-pro :dataSource="load"
          showCheckAll
          @change="onChange"/>
      </div>
    </div>
  </template>
  <script>
  // 模拟后端请求
  const mockRequest = (data, timeout = 300) => new Promise((res, rej) => setTimeout(() => res(data), timeout));
  // 模拟数据服务
  const mockService = {
      load() {
          return [{
          value: 1,
          label: '内容1',
          disabled: false
        },{
          value: 2,
          label: '内容2',
          disabled: true
        },{
          value: 3,
          label: '内容3',
          disabled: false
        },{
          value: 4,
          label: '内容4',
          disabled: false
        }];
      },
  };
  export default {
    data() {
      return {
        targetValues: [3],
        checked:[1],
        list: mockService.load()
      };
    },
    methods: {
      onChange(data, params) {
        console.log('onChange:', data, params);
      },
      onCheckedChange(data) {
        console.log('onCheckedChange:', data);
      },
      load() {
        return mockRequest(mockService.load());
      },
      onSyncState(name, value) {
        console.log('onChange11:', name, value);
      }
    },
  };
  </script>
  