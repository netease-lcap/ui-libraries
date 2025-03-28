import { ElSlider, ElSelect, ElOption } from '@/index';

export default {
  title: '组件列表/Slider/Block',
  component: ElSlider,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    () => ({
      provide() {
        return {
          VUE_APP_DESIGNER: true,
        };
      },
      template: '<div style="width: 500px;"><story/></div>',
    }),
  ],
};

export const Block = {
  name: '基础示例',
  render: () => ({
    template: `
      <el-slider  />
    `,
  }),
};
