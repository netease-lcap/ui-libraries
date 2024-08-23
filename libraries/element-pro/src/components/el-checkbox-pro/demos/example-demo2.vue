<!-- ⾃定义节点样式 -->
<!-- 数据源 -->
<template>
    <div>
      <div class="block">
        <el-checkbox-group-pro :dataSource="options" :itemProps="setItemProps" valueField="id" :value.sync="checkedValue">
          <template #item="current">
            {{ current.item.text }}
          </template>
        </el-checkbox-group-pro>
        {{ checkedValue }}
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        checkedValue: [1],
        options: [
            {
                id: 1,
                text: '选项一',
            },
            {
                id: 2,
                text: '选项二',
            },
            {
                id: '3',
                text: '选项三',
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
    }
  };
  </script>
  