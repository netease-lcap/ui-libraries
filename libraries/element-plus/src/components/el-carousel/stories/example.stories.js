import { ref } from 'vue';
import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo2 from '../demos/example-demo2.vue';
import ExampleDemo3 from '../demos/example-demo3.vue';
import ExampleDemo4 from '../demos/example-demo4.vue';

export default {
  id: 'el-carousel-examples',
  title: '组件列表/Carousel 走马灯/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Example1 = {
  name: '基础用法',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    setup() {
      const reff = ref();
      setTimeout(() => {
        console.log(reff, 'ffff');
        reff.value.setActiveItem(2);

        console.log(reff, 'rrrr');
      }, 100);
      return {
        reff,
        data: [1, 2, 3, 4],
      };
    },
    template: `  <div class="block text-center">
    <span class="demonstration">
      Switch when indicator is hovered (default)
    </span>
    <el-carousel ref="reff" height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>`,
  }),
};

export const Example2 = {
  name: '卡片模式',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example3 = {
  name: '垂直排列',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example4 = {
  name: '数据源',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo4,
    },
    template: '<example-demo></example-demo>',
  }),
};
