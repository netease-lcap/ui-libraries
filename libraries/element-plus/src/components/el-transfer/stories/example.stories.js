import ElTransfer from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo2 from '../demos/example-demo2.vue';

export default {
  id: 'el-transfer-pro-examples',
  title: '组件列表/Transfer 穿梭框/示例',
  component: ElTransfer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Example1 = {
  name: '基础示例',
  render: () => ({
    setup() {
      const dataSource = async () => [
        { value: 1, label: '选项1' },
        { value: 2, label: '选项2' },
        { value: 3, label: '选项3' },
      ];
      return {
        dataSource,
      };
    },
    template: '<el-transfer leftTitle="来源" rightTitle="目标" style="margin-top: 20px" :dataSource="dataSource"></el-transfer>',
  }),
};

export const Example2 = {
  name: '插槽',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};
