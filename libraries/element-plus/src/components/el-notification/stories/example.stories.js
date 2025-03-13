import Component from '../index';

export default {
  id: 'el-notification-examples',
  title: '组件列表/Notification 通知/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  适用广泛的基础用法。 */
export const Example1 = {
  name: '通知',
  render: () => ({
    data() {
      return {
        visible1: false,
        visible2: false,
        visible3: false,
        visible4: false,
      };
    },
    methods: {
      open1() {
        this.visible1 = true;
      },
      open2() {
        this.visible2 = true;
      },
      open3() {
        this.visible3 = true;
      },
      open4() {
        this.visible4 = true;
      },
    },
    template: `<div>
      <el-button :plain="true" @click="open1">消息</el-button>
      <el-button :plain="true" @click="open2">成功</el-button>
      <el-button :plain="true" @click="open3">警告</el-button>
      <el-button :plain="true" @click="open4">错误</el-button>
      <el-notification title="提示" :duration="0" :visible.sync="visible1">这是一条消息提示</el-notification>
      <el-notification title="提示" :visible.sync="visible2" icon="ri-arrow-up-circle-fill" type="success">恭喜你，这是一条成功消息</el-notification>
      <el-notification title="提示" :visible.sync="visible3" type="warning">警告哦，这是一条警告消息</el-notification>
      <el-notification title="提示" :visible.sync="visible4" type="error">这是一条消息提示</el-notification>
    </div>`,
  }),
};
