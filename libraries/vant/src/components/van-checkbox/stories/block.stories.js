import Component from '../index';

export default {
  id: 'van-checkbox-blocks',
  title: '组件列表/Checkbox 复选框/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '基础复选框',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-checkbox label="复选框"></van-checkbox>
    `,
  }),
};

export const Block2 = {
  name: '复选框组',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-checkbox-group>
        <van-checkbox value="1" label="选项1"></van-checkbox>
        <van-checkbox value="2" label="选项2"></van-checkbox>
        <van-checkbox value="3" label="选项3"></van-checkbox>
      </van-checkbox-group>
    `,
  }),
};

export const Block3 = {
  name: '圆形复选框',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-checkbox shape="round" label="圆形复选框"></van-checkbox>
    `,
  }),
};

export const Block4 = {
  name: '右侧图标',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-checkbox icon-position="right" label="右侧图标"></van-checkbox>
    `,
  }),
}; 
