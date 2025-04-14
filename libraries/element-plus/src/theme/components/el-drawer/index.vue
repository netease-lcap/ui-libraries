<template>
  <el-drawer
    modelValue="true"
    title="I am the title"
    :show-close="false"
    modal-class="modal-mask-class"
    :lock-scroll="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <template #header>
      <h4>Header</h4>
    </template>
    <template #default>
      <div>default content</div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button>cancel</el-button>
        <el-button type="primary">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script>
// 默认可使用组件区块实例作为主题配置预览
import createStoriesPreview from '@lcap/builder/input/vue3/stories-preview';
import * as stories from '../../../components/el-drawer/stories/block.stories';

const DemoPreview = createStoriesPreview(stories);

export default {
  components: {
    DemoPreview,
  },
};
</script>
<style>
.modal-mask-class {
  position: unset!important;
  height: 500px;
}
.modal-mask-class .el-drawer {
  position: unset!important;
}
</style>