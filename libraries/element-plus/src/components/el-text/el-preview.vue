<template>
  <span class="root">
    <el-tooltip :content="text" v-bind="tooltipProps" :disabled="!showTooltip || !isOverflow">
      <el-text ref="elTextRef" class="previewText" :text="text"></el-text>
    </el-tooltip>
  </span>
</template>

<script>
import _ from 'lodash';
import { ElTooltip } from 'element-plus';
export default {
  name: 'el-preview',
  props: {
    text: {
      type: String,
      default: '',
    },
    showTooltip: {
      type: Boolean,
      default: true,
    },
    tooltipProps: {
      type: Object,
      default: () => ({
        placement: 'top',
      }),
    },
  },
  data() {
    return {
      isOverflow: false,
    };
  },
  watch: {
    text() {
      this.$nextTick(this.checkOverflow);
    },
  },
  mounted() {
    this.$nextTick(this.checkOverflow);
  },
  methods: {
    checkOverflow() {
      const el = this.$refs.elTextRef?.$el;
      if (el) {
        this.isOverflow = el.scrollWidth > el.clientWidth;
      }
    },
  },
};
</script>

<style scoped>
.root {
  width: 100%;
}

.previewText {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
