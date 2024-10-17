import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo2 from '../demos/example-demo2.vue';
import ExampleDemo3 from '../demos/example-demo3.vue';
import ExampleDemo4 from '../demos/example-demo4.vue';
import ExampleDemo5 from '../demos/example-demo5.vue';

export default {
  id: 'el-carousel-examples',
  title: '组件列表/CAROUSEL 走马灯/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  适用广泛的基础用法 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可以将指示器的显示位置设置在容器外部 */
export const Example2 = {
  name: '指示器',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可以设置切换箭头的显示时机 */
export const Example3 = {
  name: '切换箭头',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  当页面宽度方向空间空余，但高度方向空间匮乏时，可使用卡片风格 */
export const Example4 = {
  name: '卡片化',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo4,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  默认情况下，`direction` 为 `horizontal`。通过设置 `direction` 为 `vertical` 来让走马灯在垂直方向上显示。 :::demo */
export const Example5 = {
  name: '方向',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo5,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example6 = {
  name: '数据源',
  render: () => ({
    data() {
      return {
        colors: ['#ccc', '#000', '#666'],
        dataSource: [
          {
            label: '1',
            value: '1',
          },
          {
            label: '2',
            value: '2',
          },
          {
            label: '3',
            value: '3',
          },
        ],
      };
    },
    template: `
      <el-carousel :dataSource="dataSource" height="300px">
        <template #item="{ item }">
          <div :style="{ height: '100%', backgroundColor: colors[Number(item.value)], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }">{{item.label}}</div>
        </template>
      </el-carsouel>
    `,
  }),
};
