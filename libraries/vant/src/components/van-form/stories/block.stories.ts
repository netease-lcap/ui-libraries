import Component from '../index';

export default {
  id: 'van-form-blocks',
  title: '组件列表/Form 表单/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基础表单',
  render: () => ({
    setup() {},
    template: `
      <van-form>
      </van-form>
    `,
  }),
};
