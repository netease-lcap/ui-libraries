<!-- 基础示例 -->
<template>
    <div>
      <div class="block">
        <el-transfer-pro :dataSource="list"
          showCheckAll
          :value.sync="targetValues"
          :checked.sync="checked"
          :search="true"
          textField="tree.label"
          valueField="tree.value"
          searchPlaceholder="请输入哈哈哈哈"
          buttonDirection="horizontal"
          targetSort="push"
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
        {{ checked }}
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        targetValues: [3],
        checked:[1, 3],
        list: [{
          tree: {
          value: 1,
          label: '内容1',
          disabled: false
        }
        },{
          tree: {
            value: 2,
            label: '内容2',
            disabled: false
          }
        },{
          tree: {
            value: 3,
            label: '内容3',
            disabled: false
          }
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
