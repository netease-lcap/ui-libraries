<template>
  <div>
    <el-radio-group-pro v-model="size">
      <el-radio-pro value="small">小尺寸</el-radio-pro>
      <el-radio-pro value="medium">中尺寸</el-radio-pro>
      <el-radio-pro value="large">大尺寸</el-radio-pro>
    </el-radio-group-pro>
    <div class="actions-warp">
      <el-checkbox-pro v-model="disabled">是否禁用</el-checkbox-pro>
      <el-checkbox-pro v-model="multiple">是否多选</el-checkbox-pro>
      <el-checkbox-pro v-model="borderless">是否无边框</el-checkbox-pro>
      <el-checkbox-pro v-model="emptyData">是否置空数据</el-checkbox-pro>
    </div>

    <el-select-pro clearable filterable :size="size" :disabled="disabled" :multiple="multiple" :borderless="borderless"
      :dataSource="emptyData ? [] : options2" />

    <el-select-pro :size="size" :disabled="disabled" :multiple="multiple" :borderless="borderless"
      :dataSource="emptyData ? [] : options" placeholder="分组选择器" filterable clearable style="margin-left: 10px;" />
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