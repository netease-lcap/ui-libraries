import Component from '../index';

export default {
  id: 'el-popconfirm-examples',
  title: '组件列表/POPCONFIRM 气泡确认框/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  Popconfirm 的属性与 Popover 很类似，因此对于重复属性，请参考 Popover 的文档，在此文档中不做详尽解释。 :::demo 在 Popconfirm 中，只有 `title` 属性可用，`content` 属性不会被展示。 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    methods: {
      handleClick() {
        console.log('click');
      },
    },
    template: `<div>
<el-popconfirm
  title="这是一段内容确定删除吗？"
  @confirm="handleClick"
>
  <el-button slot="reference">删除</el-button>
</el-popconfirm>
</div>`,
  }),
};

/*  可以在 Popconfirm 中自定义内容。 :::demo */
export const Example2 = {
  name: '自定义',
  render: () => ({
    template: `<div>
<el-popconfirm
  confirm-button-text='好的'
  cancel-button-text='不用了'
  icon="el-icon-info"
  icon-color="red"
  title="这是一段内容确定删除吗？"
>
  <el-button slot="reference">删除</el-button>
</el-popconfirm>
</div>`,
  }),
};
