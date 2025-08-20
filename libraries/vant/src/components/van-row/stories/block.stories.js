import Component from '../index';

export default {
  id: 'van-row-blocks',
  title: '组件列表/Row 行/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '3列样式（8:8:8）',
  render: () => ({
    setup() {},
    template: `
      <van-row>
        <van-col :span="8"></van-col>
        <van-col :span="8"></van-col>
        <van-col :span="8"></van-col>
      </van-row>
    `,
  }),
};

export const Demo2 = {
  name: '4列样式（2:4:8:10）',
  render: () => ({
    template: `<el-row>
      <van-col :span="2"></van-col>
      <van-col :span="4"></van-col>
      <van-col :span="8"></van-col>
      <van-col :span="10"></van-col>
    </el-row>`,
  }),
};

export const Demo3 = {
  name: '2列样式（8:16）',
  render: () => ({
    template: `<van-row>
      <van-col :span="8"></van-col>
      <van-col :span="16"></van-col>
    </van-row>`,
  }),
};
