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

export const Block2 = {
  name: '单选组',
  render: () => ({
    setup() {
      return {};
    },
    template: `
      <van-radio-group> 
      </van-radio-group>
    `,
  }),
};
