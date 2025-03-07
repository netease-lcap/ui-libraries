import { ElSlider } from '../api';

export default {
  title: 'Element Plus/Slider/Block',
  component: ElSlider,
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true },
    },
  },
};

export const Block = () => ({
  template: `
    <div style="width: 500px; margin: 20px;">
      <el-slider v-model="value" />
    </div>
  `,
  data() {
    return {
      value: 50,
    };
  },
});
