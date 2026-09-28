import Component from '../index';

export default {
  id: 'van-form-item-group-blocks',
  title: '组件列表/FormItemGroup 表单项分组/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基础用法',
  render: () => ({
    setup() {},
    template: `
      <van-form-item-group>
        <template #label>
          <span>分组</span>
        </template>
      </van-form-item-group>
    `,
  }),
};
