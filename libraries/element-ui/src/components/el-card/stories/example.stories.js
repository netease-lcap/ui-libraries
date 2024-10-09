import Component from '../index';
import ExampleDemo1 from '../demos/example-demo4.vue';
import ExampleDemo2 from '../demos/example-demo2.vue';
import ExampleDemo3 from '../demos/example-demo3.vue';

export default {
  id: 'el-card-examples',
  title: '组件列表/CARD 卡片/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  包含标题，内容和操作。 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  卡片可以只有内容区域。 */
export const Example2 = {
  name: '简单卡片',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可配置定义更丰富的内容展示。 */
export const Example3 = {
  name: '带图片',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可对阴影的显示进行配置。 */
export const Example4 = {
  name: '卡片阴影',
  render: () => ({
    template: `<div><el-row :gutter="12">
  <el-col :span="8">
    <el-card shadow="always">
      总是显示
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card shadow="hover">
      鼠标悬浮时显示
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card shadow="never">
      从不显示
    </el-card>
  </el-col>
</el-row></div>`,
  }),
};
