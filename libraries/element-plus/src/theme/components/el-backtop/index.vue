<template>
  <div>
    <div style="position: relative; height: 280px;" >
      <div class="aaa" style="height: 100%; overflow-y: scroll;">
        <div style="height: 3000px; background-color: #dddddd;">
          内容区域
        </div>
      </div>
      <el-backtop target=".aaa" style="position: absolute"></el-backtop>
    </div>
  </div>
</template>
<script>
// 默认可使用组件区块实例作为主题配置预览
import createStoriesPreview from '@lcap/builder/input/vue3/stories-preview';
import * as stories from '../../../components/el-backtop/stories/block.stories';

const DemoPreview = createStoriesPreview(stories);

export default {
  components: {
    DemoPreview,
  },
};
</script>
