<!-- 基础示例 -->
<template>
    <div>
      <div class="block">
        <el-transfer-pro :dataSource="list"
          showCheckAll
          :value.sync="targetValues"
          :checked.sync="checked"
          @change="onChange">
          <template #titlesource>
            <div>{{ '来源' }}</div>
          </template>
          <template #titletarget>
            <div>{{ '目标' }}</div>
          </template>
          <template #footersource>
            <div>{{ '来源' }}</div>
          </template>
          <template #footertarget>
            <div>{{ '目标' }}</div>
          </template>
        </el-transfer-pro>
      </div>
      <div class="block">
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        targetValues: [],
        checked:[1],
        list: [{
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
        }]
      };
    },
    methods: {
      onChange(targetValue) {
        console.log('targetValue:', targetValue);
      },
    },
  };
  </script>
  