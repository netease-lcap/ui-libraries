import ElCheckboxPro from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo2 from '../demos/example-demo2.vue';

export default {
  id: 'el-checkbox-pro-examples',
  title: '组件列表/Checkbox 多选框/示例',
  component: ElCheckboxPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

/*  基础示例 */
export const Example1 = {
  name: '基础示例',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  数据源 */
export const Example2 = {
  name: '数据源',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};
