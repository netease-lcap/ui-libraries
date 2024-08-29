import { ElPaginationMiniPro } from '../index';

export default {
  id: 'el-pagination-mini-pro-examples',
  title: '组件列表/PaginationMini 分页/示例',
  component: ElPaginationMiniPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  argTypes: {
    disabledPrev: {
      control: 'boolean',
    },
    disabledCurrent: {
      control: 'boolean',
    },
    disabledNext: {
      control: 'boolean',
    },
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    showCurrent: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: ['text', 'outline'],
    },
    prevTips: {
      control: 'text',
    },
    currentTips: {
      control: 'text',
    },
    nextTips: {
      control: 'text',
    },
  },
};

export const Default = {
  name: '基础示例',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<el-pagination-mini-pro v-bind="$props"></el-pagination-mini-pro>',
  }),
};
