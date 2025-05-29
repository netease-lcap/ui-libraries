import ElSelectPro from '../index';

export default {
  id: 'el-select-pro-blocks',
  title: 'Pro组件列表/Select 选择器/内置区块',
  component: ElSelectPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    () => ({
      provide() {
        return {
          VUE_APP_DESIGNER: true,
        };
      },
      template: '<div ><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    methods: {
      log(value) {
        console.log(value, 'log');
      },
    },
    template: `<el-select-pro @change="log">
            <el-option-pro value="1" label="1"></el-option-pro>
            <el-option-pro value="2" label="2"></el-option-pro>
            <el-option-pro value="3" label="3"></el-option-pro>

          </el-select-pro>`,
  }),
};
