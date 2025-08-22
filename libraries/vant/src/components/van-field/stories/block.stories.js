import Component from '../index';

export default {
  id: 'van-field-blocks',
  title: '组件列表/Field 输入框/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '输入框',
  render: () => ({
    setup() {
      const handleInput = (value) => {
        console.log(value,'==');
      };
      const handleChange = (value) => {
        console.log(value);
      };
      return {
        handleInput,
        handleChange,
      };
    },
    template: `
      <van-field  placeholder="请输入" @input="handleInput" @change="handleChange">
      <template #label>
        <van-text text="输入框" />
      </template>
      </van-field>
    `,
  }),
};
