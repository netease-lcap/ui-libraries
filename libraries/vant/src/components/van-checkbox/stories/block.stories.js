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
      <van-checkbox-group>
      </van-checkbox-group>
    `,
  }),
};
