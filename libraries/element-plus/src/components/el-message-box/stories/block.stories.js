import ElMessageBox, { ElMessageBoxDesigner } from '../index';

export default {
  id: 'el-message-box-blocks',
  title: '组件列表/MessageBox 弹框/内置区块',
  component: ElMessageBox,
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
      template: '<div><story/></div>',
    }),
  ],
};

ElMessageBoxDesigner.props.visible.default = true;
ElMessageBoxDesigner.props.static.default = true;
export const Default = {
  name: '确认消息',
  render: () => ({
    components: {
      ElMessageBox: {
        ...ElMessageBoxDesigner,
      },
    },
    template: `<el-message-box type="confirm" iconType="info" title="提示" :showCancelButton="true">
      <template #default><el-text text="确认内容"></el-text></template>
    </el-message-box>`,
  }),
};

export const Success = {
  name: '消息提示',
  render: () => ({
    components: {
      ElMessageBox: {
        ...ElMessageBoxDesigner,
      },
    },
    template: `<el-message-box type="alert" iconType="warning" title="提示">
      <template #default><el-text text="提示内容"></el-text></template>
    </el-message-box>`,
  }),
};

export const Warning = {
  name: '提交内容',
  render: () => ({
    components: {
      ElMessageBox: {
        ...ElMessageBoxDesigner,
      },
    },
    template: `<el-message-box  title="提示" type="prompt" inputPlaceholder="请输入内容" :showCancelButton="true" :showClose="true">
      <template #default><el-text text="请输入"></el-text></template>
    </el-message-box>`,
  }),
};
