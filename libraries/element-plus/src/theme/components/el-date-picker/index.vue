<template>
  <demo-preview></demo-preview>
</template>
<script>
// 默认可使用组件区块实例作为主题配置预览
import createStoriesPreview from '@lcap/builder/input/vue3/stories-preview';

export const Default = {
  name: '基础示例',
  render: () => ({
    template: `<el-date-picker :visible="true" placement="right"/>`,
  }),
};
const DemoPreview = createStoriesPreview({ Default });

export default {
  components: {
    DemoPreview,
  },
};
</script>
