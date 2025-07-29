import { VanTabs, VanTab } from '../index';

export default {
  id: 'van-tabs-examples',
  title: '组件列表/Tabs 标签页/示例',
  component: { VanTabs, VanTab },
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
    data() {
      return {
        active: 0,
      };
    },
    template: `
    {{ active }}
     <van-tabs v-bind="args" border v-model:active="active">
      <van-tab name="a"><template #title><van-text text="标签1"></van-text></template>内容 1</van-tab>
      <van-tab name="b"><template #title><van-text text="标签2"></van-text></template>内容 2</van-tab>
      <van-tab name="c"><template #title><van-text text="标签3"></van-text></template>内容 3</van-tab>
      <van-tab name="d"><template #title><van-text text="标签4"></van-text></template>内容 4</van-tab>
    </van-tabs>
    `,
  }),
  args: {
  },
};
