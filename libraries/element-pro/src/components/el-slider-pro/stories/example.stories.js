import ElSliderPro from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';

export default {
  id: 'el-slider-pro-examples',
  title: '组件列表/Slider 滑块/示例',
  component: ElSliderPro,
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
