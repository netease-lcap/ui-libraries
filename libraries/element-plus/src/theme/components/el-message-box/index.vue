<template>
  <div>
  <div style="position: relative; width: 100%; height: 300px" ref="appendToEl"></div>
    <el-message-box 
      type="confirm" 
      iconType="info" 
      title="提示" 
      modalClass="box-mask-class" 
      :appendTo="appendToEl"
      :closeOnClickModal="false"
      :closeOnPressEscape="false"
      :closeOnHashChange="false"
      :lockScroll="false">
      <template #default><el-text text="确认内容lalalla"></el-text></template>
    </el-message-box>
  </div>
</template>
<script>
// 默认可使用组件区块实例作为主题配置预览
import createStoriesPreview from '@lcap/builder/input/vue3/stories-preview';
import * as stories from '../../../components/el-message-box/stories/block.stories';

const DemoPreview = createStoriesPreview(stories);

export default {
  components: {
    DemoPreview,
  },
};
</script>
<style>
.box-mask-class {
  position: unset !important;
}

.box-mask-class .el-overlay-message-box {
  position: unset !important;
}
</style>