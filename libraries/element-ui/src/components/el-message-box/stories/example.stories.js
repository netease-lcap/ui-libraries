import Component from '../index';

export default {
  id: 'el-message-box-examples',
  title: '组件列表/MessageBox 弹框/示例',
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
  name: '弹框',
  render: () => ({
    data() {
      return {
        visible1: false,
        visible2: false,
        visible3: false,
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
      close() {
        console.log('close');
      },
      confirm(v) {
        console.log('confirm', v);
      },
      cancel() {
        console.log('cancel');
      },
    },
    template: `<div>
      <el-button type="text" @click="open1">点击打开 Alert Message Box</el-button>
      <el-button type="text" @click="open2">点击打开 Confirm Message Box</el-button>
      <el-button type="text" @click="open3">点击打开 Prompt Message Box</el-button>
      <el-message-box :visible.sync="visible1" title="提示" @close="close" @confirm="confirm" @cancel="cancel">
        哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      </el-message-box>
      <el-message-box :visible.sync="visible2" type="confirm" :showCancelButton="true" :showClose="true" title="提示" @close="close" @confirm="confirm" @cancel="cancel">
        哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      </el-message-box>
       <el-message-box :visible.sync="visible3" type="prompt" inputPlaceholder="请输入内容" :showCancelButton="true" :showClose="true" title="提示" @close="close" @confirm="confirm" @cancel="cancel">
        请输入内容
      </el-message-box>
    </div>`,
  }),
};
