<template>
  <el-card shadow="hover" body-class="x-panel-card">
    <div class="x-panel-card-header" v-if="this.title">
      <el-text :text="title" class="x-panel-card-header-title" />
      <IconMore v-if="more" class="x-panel-card-header-more" />
    </div>
    <div class="x-panel-card-body">
      <slot></slot>
    </div>
  </el-card>
</template>
<script>
import IconMore from './icon-more.vue';

export default {
  name: 'XPanel',
  components: {
    IconMore,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    more: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style>
.x-panel-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 16px;
}

.x-panel-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.x-panel-card-header-title {
  font-size: var(--el-font-size-medium);
  color: var(--el-text-color-primary);
  line-height: calc(var(--el-font-size-medium) + 8px);
  font-weight: 500;
}

.x-panel-card-header-more {
  color: var(--el-text-color-regular);
}
</style>
<style>
.no-title [class*="u-panel_head"] {
  display: none;
}
</style>
