<template>
  <div>
    <el-radio-group v-model="size">
      <el-radio value="small">小尺寸</el-radio>
      <el-radio value="medium">中尺寸</el-radio>
      <el-radio value="large">大尺寸</el-radio>
    </el-radio-group>
    <div class="actions-warp">
      <el-checkbox v-model="disabled">是否禁用</el-checkbox>
      <el-checkbox v-model="multiple">是否多选</el-checkbox>
      <el-checkbox v-model="borderless">是否无边框</el-checkbox>
      <el-checkbox v-model="emptyData">是否置空数据</el-checkbox>
    </div>

    <el-select clearable filterable v-model="value1" :size="size" :disabled="disabled" :multiple="multiple" :borderless="borderless"
      :dataSource="emptyData ? [] : options2" />

    <!-- <el-select :size="size" :disabled="disabled" :multiple="multiple" :borderless="borderless"
      :dataSource="emptyData ? [] : options" placeholder="分组选择器" filterable clearable style="margin-left: 10px;" /> -->
  </div>
</template>
<script>

export default {
  data() {
    return {
      size: 'medium',
      disabled: false,
      multiple: false,
      emptyData: false,
      borderless: false,
      value1: '',
      options: [
        {
          group: '分组一',
          children: [
            { label: '选项一', value: 1 },
            { label: '选项二', value: 2 },
          ],
        },
        {
          group: '分组二',
          children: [
            { label: '选项三', value: 4 },
            { label: '选项四', value: 5 },
            { label: '选项五', value: 6 },
          ],
        },
        {
          group: '分组三',
          divider: true,
          children: [
            { label: '选项六', value: 7 },
            { label: '选项七', value: 8 },
            { label: '选项八', value: 9 },
          ],
        },
      ],
      options2: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Orange', value: 'Orange' },
        { label: 'Banana', value: 'Banana', disabled: true },
      ]
    }
  },
}
</script>

<style scoped>
.actions-warp {
  font-size: 12px;
  margin: 10px 0 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
