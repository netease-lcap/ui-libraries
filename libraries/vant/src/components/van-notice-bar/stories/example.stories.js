import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo2 from '../demos/example-demo2.vue';

export default {
  id: 'van-notice-bar-examples',
  title: '组件列表/NoticeBar 通知栏/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: () => ({
    template: `<div>
      <van-notice-bar
        left-icon="volume-o"
        text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。"
      />
    </div>`,
  }),
};

export const Example2 = {
  name: '滚动播放',
  render: () => ({
    template: `<div>
    <div style="margin-bottom: 5px;">开启滚动播放</div>
    <van-notice-bar scrollable text="米袋虽空——樱花开哉！" />

    <div style="margin: 20px 0 5px 0;">关闭滚动播放</div>
    <van-notice-bar
      :scrollable="false"
      text="不会回头的东西有四件：说出口的话、离弦的箭、逝去的生活和失去的机会。"
    />
    </div>`,
  }),
};

export const Example3 = {
  name: '多行展示',
  render: () => ({
    template: `<div>
    <van-notice-bar
      wrapable
      :scrollable="false"
      text="不会回头的东西有四件：说出口的话、离弦的箭、逝去的生活和失去的机会。"
    />
    </div>`,
  }),
};

export const Example4 = {
  name: '通知栏模式',
  render: () => ({
    template: `<div>
      <!-- closeable 模式，在右侧显示关闭按钮 -->
      <van-notice-bar mode="closeable">米袋虽空——樱花开哉！</van-notice-bar>

      <!-- link 模式，在右侧显示链接箭头 -->
      <br />
      <van-notice-bar mode="link">米袋虽空——樱花开哉！</van-notice-bar>
    </div>`,
  }),
};

export const Example5 = {
  name: '自定义样式',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example6 = {
  name: '垂直滚动',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};
