<!-- 不同主题 -->
<!--  Tag 组件提供了三个不同的主题：`dark`、`light` 和 `plain` -->
<template>
  <div>
    <div class="tag-group">
      <span class="tag-group__title">Dark</span>
      <el-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        effect="dark">
        {{ item.label }}
      </el-tag>
    </div>
    <div class="tag-group">
      <span class="tag-group__title">Plain</span>
      <el-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        effect="plain">
        {{ item.label }}
      </el-tag>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { type: '', label: '标签一' },
        { type: 'success', label: '标签二' },
        { type: 'info', label: '标签三' },
        { type: 'danger', label: '标签四' },
        { type: 'warning', label: '标签五' },
      ],
    };
  },
};
</script>
