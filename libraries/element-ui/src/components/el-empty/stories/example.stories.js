import Component from '../index';

export default {
  id: 'el-empty-examples',
  title: '组件列表/EMPTY 空状态/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    template: `<div><el-empty description="描述文字"></el-empty></div>`,
  }),
};

/*  通过设置 `image` 属性传入图片 URL。 */
export const Example2 = {
  name: '自定义图片',
  render: () => ({
    template: `<div><el-empty image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-empty></div>`,
  }),
};

/*  通过设置 `image-size` 属性来控制图片大小。 */
export const Example3 = {
  name: '图片尺寸',
  render: () => ({
    template: `<div><el-empty :image-size="200"></el-empty></div>`,
  }),
};

/*  使用默认插槽可在底部插入内容。 */
export const Example4 = {
  name: '底部内容',
  render: () => ({
    template: `<div><el-empty>
  <el-button type="primary">按钮</el-button>
</el-empty></div>`,
  }),
};
