import Component from '../index';
import BlockDemo1 from '../demos/block-demo1.vue'; 

export default {
  id: 'el-carousel-blocks',
  title: '组件列表/Carousel 走马灯/内置区块',
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
    template: `<el-carousel height="150" :motionBlur="true" :interval="1000">
      <el-carousel-item name="1" label="label1">
        <el-text text="content1"></el-text>
      </el-carousel-item>
      <el-carousel-item name="2" label="label2">
        <el-text text="content2"></el-text>
      </el-carousel-item>
      <el-carousel-item name="3" label="label3">
        <el-text text="content3"></el-text>
      </el-carousel-item>
    </el-carousel>`,
  }),
};
