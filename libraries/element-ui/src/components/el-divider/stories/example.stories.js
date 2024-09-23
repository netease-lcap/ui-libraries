import Component from '../index';

export default {
  id: 'el-divider-examples',
  title: '组件列表/DIVIDER 分割线/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  对不同章节的文本段落进行分割。 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    template: `<div>
  <div>
    <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
    <el-divider></el-divider>
    <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
  </div>
</div>`,
  }),
};

/*  可以在分割线上自定义文案内容。 */
export const Example2 = {
  name: '设置文案',
  render: () => ({
    template: `<div>
  <div>
    <span>头上一片晴天，心中一个想念</span>
    <el-divider content-position="left">少年包青天</el-divider>
    <span>饿了别叫妈, 叫饿了么</span>
    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
    <span>为了无法计算的价值</span>
    <el-divider content-position="right">阿里云</el-divider>
  </div>
</div>`,
  }),
};

/*  */
export const Example3 = {
  name: '垂直分割',
  render: () => ({
    template: `<div>
  <div>
    <span>雨纷纷</span>
    <el-divider direction="vertical"></el-divider>
    <span>旧故里</span>
    <el-divider direction="vertical"></el-divider>
    <span>草木深</span>
  </div>
</div>`,
  }),
};
