import Component from '../index';

export default {
  id: 'el-message-examples',
  title: '组件列表/Message 消息提示/示例',
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
  name: '消息提示',
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
        this.$refs['message1'].open();
        // this.visible1 = true;
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
      <el-message ref="message1" :visible.sync="visible1" icon="delete-solid">这是一条消息提示</el-message>
      <el-message :visible.sync="visible2" type="success">恭喜你，这是一条成功消息</el-message>
      <el-message :visible.sync="visible3" type="warning">警告哦，这是一条警告消息</el-message>
      <el-message :visible.sync="visible4" type="error">这是一条消息提示</el-message>
    </div>`,
  }),
};
