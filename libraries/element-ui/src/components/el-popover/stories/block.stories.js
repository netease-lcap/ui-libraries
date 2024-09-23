import ElPopover from '../index';
import { ElButton, ElText } from '@/index';

export default {
  id: 'el-popover-blocks',
  title: '组件列表/POPOVER 弹出框/内置区块',
  component: ElPopover,
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
      template: '<div style="width: 500px;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template:
      `<el-popover trigger="click" >
        <template #reference>
          <el-button text="文本"></el-button>
        </template>
      </el-popover>`,
  }),
};
