import ElMessage, { ElMessageDesigner } from '../index';

export default {
  id: 'el-message-blocks',
  title: '组件列表/Message 消息提示/内置区块',
  component: ElMessage,
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

ElMessageDesigner.props.visible.default = true;
ElMessageDesigner.props.static.default = true;
export const Default = {
  name: '基础用法',
  render: () => ({
    components: {
      ElMessage: {
        ...ElMessageDesigner,
      },
    },
    template: `<el-message>
      <template #default><el-text text="消息内容"></el-text></template>
    </el-message>`,
  }),
};

export const Success = {
  name: '成功提示',
  render: () => ({
    components: {
      ElMessage: {
        ...ElMessageDesigner,
      },
    },
    template: `<el-message type="success">
      <template #default><el-text text="消息内容"></el-text></template>
    </el-message>`,
  }),
};

export const Warning = {
  name: '警告提示',
  render: () => ({
    components: {
      ElMessage: {
        ...ElMessageDesigner,
      },
    },
    template: `<el-message type="warning">
      <template #default><el-text text="消息内容"></el-text></template>
    </el-message>`,
  }),
};
export const Error = {
  name: '错误提示',
  render: () => ({
    components: {
      ElMessage: {
        ...ElMessageDesigner,
      },
    },
    template: `<el-message type="error">
      <template #default><el-text text="消息内容"></el-text></template>
    </el-message>`,
  }),
};
