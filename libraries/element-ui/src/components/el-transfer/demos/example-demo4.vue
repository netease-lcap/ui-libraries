<!-- 数据项属性别名 -->
<!--  默认情况下，Transfer 仅能识别数据项中的 `key`、`label` 和 `disabled` 字段。如果你的数据的字段名不同，可以使用 `props` 属性为它们设置别名。 :::demo 本例中的数据源没有 `key` 和 `label` 字段，在功能上与它们相同的字段名为 `value` 和 `desc`。因此可以使用`props` 属性为 `key` 和 `label` 设置别名。 -->
<template>
  <div>
    <el-transfer
      v-model="value"
      :props="{
        key: 'value',
        label: 'desc',
      }"
      :data="data">
    </el-transfer>
  </div>
</template>
<script>
export default {
  data() {
    const generateData = (_) => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          value: i,
          desc: `备选项 ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };
    return {
      data: generateData(),
      value: [],
    };
  },
};
</script>
