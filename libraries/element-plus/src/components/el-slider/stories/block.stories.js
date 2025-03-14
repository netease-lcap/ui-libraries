import { ElSlider } from '../index';

export default {
  title: '组件列表/Slider/Block',
  component: ElSlider,
  parameters: {
    layout: 'padded',
  },
};

export const Block = () => ({
  template: `
      <el-slider data-nodepath="123" />
  `,
  data() {
    return {
      value: 50,
    };
  },
});
