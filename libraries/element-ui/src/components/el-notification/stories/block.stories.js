import ElNotification, { ElNotificationDesigner } from '../index';

export default {
  id: 'el-notification-blocks',
  title: '组件列表/Notification 通知/内置区块',
  component: ElNotification,
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

ElNotificationDesigner.props.visible.default = true;
ElNotificationDesigner.props.static.default = true;
export const Default = {
  name: '基础用法',
  render: () => ({
    components: {
      ElNotification: {
        ...ElNotificationDesigner,
      },
    },
    template: `<el-notification title="提示">
      <template #default><el-text text="消息内容"></el-text></template>
    </el-notification>`,
  }),
};
