<template>
  <el-scrollbar height="400px">
    <el-flex style="height: 1000px; width: 100%; background-color: #dddddd;"><el-text text="内容区域"/></el-flex>
  </el-scrollbar>
</template>
<script>
// 默认可使用组件区块实例作为主题配置预览
import createStoriesPreview from '@lcap/builder/input/vue3/stories-preview';
import * as stories from '../../../components/el-scrollbar/stories/block.stories';

const DemoPreview = createStoriesPreview(stories);

export default {
  components: {
    DemoPreview,
  },
};
</script>
