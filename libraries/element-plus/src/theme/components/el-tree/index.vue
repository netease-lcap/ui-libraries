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
        treeData: [
          { label: '一级 1', children: [{ label: '二级 1-1' }] },
          { label: '一级 2', children: [{ label: '二级 2-1' }] },
          { label: '一级 3', children: [{ label: '二级 3-1' }] },
        ],
      };
    },
    template: `<el-tree default-expand-all :dataSource="treeData">

    </el-tree>`,
  }),
};
const DemoPreview = createStoriesPreview({ Default });

export default {
  components: {
    DemoPreview,
  },
};
</script>
