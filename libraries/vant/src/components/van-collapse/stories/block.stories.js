import Component from '../index';

export default {
  id: 'van-collapse-blocks',
  title: '组件列表/Collapse 折叠面板/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '基础用法',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-collapse>
        <van-collapse-item>
          <template #title>
            <van-text text="面板1"></van-text>
          </template>
          <van-text text="这是内容1"></van-text>
        </van-collapse-item>
        <van-collapse-item>
          <template #title>
            <van-text text="面板2"></van-text>
          </template>
          <van-text text="这是内容2"></van-text>
        </van-collapse-item>
        <van-collapse-item>
          <template #title>
            <van-text text="面板3"></van-text>
          </template>
          <van-text text="这是内容3"></van-text>
        </van-collapse-item>
      </van-collapse>
    `,
  }),
};
