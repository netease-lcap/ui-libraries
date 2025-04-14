<template>
  <div>
    <el-dialog
        modelValue="true"
        title="Tips"
        width="500"
        :show-close="false"
        :fullscreen="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :lock-scroll="false"
        modal-class="modal-mask-class"
      >
        <span>This is a message</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button>Cancel</el-button>
            <el-button type="primary">
              Confirm
            </el-button>
          </div>
        </template>
      </el-dialog>
  </div>
</template>
<script>
// 默认可使用组件区块实例作为主题配置预览
import createStoriesPreview from '@lcap/builder/input/vue3/stories-preview';
import * as stories from '../../../components/el-dialog/stories/block.stories';

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
}
.modal-mask-class .el-overlay-dialog {
  position: unset!important;
}
</style>