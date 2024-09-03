<template>
  <demo-preview></demo-preview>
</template>
<script>
import createStoriesPreview from '@lcap/builder/input/vue2/stories-preview';
import * as stories from '../../../components/el-carousel/stories/block.stories';

const DemoPreview = createStoriesPreview(stories);

export default {
  components: {
    DemoPreview,
  },
};

</script>
