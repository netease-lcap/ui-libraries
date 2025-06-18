import Component from '../index';
// import BlockDemo1 from '../demos/block-demo1.vue'; 
// import BlockDemo2 from '../demos/block-demo2.vue'; 

export default {
  id: 'el-anchor-blocks',
  title: '组件列表/Anchor 锚点/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    () => ({
      provide() {
        return {
          VUE_APP_DESIGNER: true,
        };
      },
      template: '<div style="width: 500px;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: `<el-anchor>
      <el-anchor-link href="#title1">
        <el-text text="标题1"></el-text>
      </el-anchor-link>
      <el-anchor-link href="#title2">
        <el-text text="标题2"></el-text>
      </el-anchor-link>
      <el-anchor-link href="#title3">
        <el-text text="标题3"></el-text>
      </el-anchor-link>
    </el-anchor>`,
  }),
};

export const AnchorItem = {
  name: '锚点项',
  render: () => ({
    template: `<el-anchor-item></el-anchor-item>`,
  }),
};

// /*  锚点项 */
// export const Demo2 = {
//   name: '锚点项',
//   render: () => ({
//     components: {
//       exampleDemo: BlockDemo2,
//     },
//     template: '<example-demo></example-demo>',
//   }),
// };
