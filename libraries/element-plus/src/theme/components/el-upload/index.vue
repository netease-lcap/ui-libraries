<template>
  <demo-preview></demo-preview>
</template>
<script>
// 默认可使用组件区块实例作为主题配置预览
import createStoriesPreview from '@lcap/builder/input/vue3/stories-preview';
import * as stories from '../../../components/el-upload/stories/block.stories';

const DemoPreview = createStoriesPreview(stories);

export default {
  components: {
    DemoPreview,
  },
};
</script>
