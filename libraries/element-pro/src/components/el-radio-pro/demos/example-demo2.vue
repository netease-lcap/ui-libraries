<!-- ⾃定义节点样式 -->
<!-- 数据源 -->
<template>
    <div>
      <div class="block">
        <el-radio-group-pro :dataSource="options" :itemProps="setItemProps" valueField="id" :value.sync="checkedValue">
          <template #item="current">
            {{ current.item.label }}
          </template>
        </el-radio-group-pro>
        {{ checkedValue }}
      </div>
    </div>
  </template>
  <script>
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
    }
  };
  </script>
  