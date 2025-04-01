<template>
  <demo-preview></demo-preview>
</template>
<script>
// 默认可使用组件区块实例作为主题配置预览
import createStoriesPreview from '@lcap/builder/input/vue3/stories-preview';

export const Default = {
  name: '基础示例',

  render: () => ({
    setup() {
      return {
        visible: true
      };
    },
    template: `<el-time-picker :visible="visible" />`
  }),
};
const DemoPreview = createStoriesPreview({ Default });

export default {
  components: {
    DemoPreview,
  },
};
</script>
