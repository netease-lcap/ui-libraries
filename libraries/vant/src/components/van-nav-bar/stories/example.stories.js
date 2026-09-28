import Component from '../index';

export default {
  id: 'van-nav-bar-examples',
  title: '组件列表/NavBar 导航栏/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基础用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    template: `
      <van-nav-bar v-bind="args" />
    `,
  }),
  args: {
    title: '导航栏',
  },
};

export const Back = {
  name: '返回上级',
  render: () => ({
    template: `
      <van-nav-bar title="导航栏" left-text="返回" left-arrow />
    `,
  }),
};

export const RightButton = {
  name: '右侧按钮',
  render: () => ({
    template: `
      <van-nav-bar title="导航栏" left-text="返回" left-arrow right-text="按钮" />
    `,
  }),
};

// 插槽优先级高于属性
export const UseSlot = {
  name: '使用插槽',
  render: () => ({
    template: `
      <van-nav-bar>
        <template #left>
          <van-text size="mini" text="< 返回"></van-text>
        </template>
        <template #title>
          <span style="color: #1989fa;">自定义标题</span>
        </template>
        <template #right>
          <van-button type="primary" size="mini">按钮</van-button>
        </template>
      </van-nav-bar>
    `,
  }),
};

export const Disabled = {
  name: '禁用按钮',
  render: () => ({
    template: `
      <van-nav-bar
        title="标题"
        left-text="返回"
        right-text="按钮"
        left-arrow
        left-disabled
        right-disabled
      />
    `,
  }),
};
