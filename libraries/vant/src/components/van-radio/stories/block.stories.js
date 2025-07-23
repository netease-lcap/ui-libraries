import Component from '../index';

export default {
  id: 'van-radio-blocks',
  title: '组件列表/Radio 单选框/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '单选框',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-radio value="1" label="选项1"></van-radio>
    `,
  }),
};

export const Block2 = {
  name: '单选组',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-radio-group v-model="'1'">
        <van-radio value="1" label="选项1"></van-radio>
        <van-radio value="2" label="选项2"></van-radio>
        <van-radio value="3" label="选项3"></van-radio>
      </van-radio-group>
    `,
  }),
};
