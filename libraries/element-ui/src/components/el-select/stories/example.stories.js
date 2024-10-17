import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo2 from '../demos/example-demo2.vue';
import ExampleDemo3 from '../demos/example-demo3.vue';
import ExampleDemo4 from '../demos/example-demo4.vue';
import ExampleDemo5 from '../demos/example-demo5.vue';
import ExampleDemo6 from '../demos/example-demo6.vue';
import ExampleDemo7 from '../demos/example-demo7.vue';
import ExampleDemo8 from '../demos/example-demo8.vue';
import ExampleDemo9 from '../demos/example-demo9.vue';
import ExampleDemo10 from '../demos/example-demo10.vue';

export default {
  id: 'el-select-examples',
  title: '组件列表/SELECT 选择器/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  适用广泛的基础单选 :::demo `v-model`的值为当前被选中的`el-option`的 value 属性值 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  */
export const Example2 = {
  name: '有禁用选项',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  选择器不可用状态 */
export const Example3 = {
  name: '禁用状态',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  包含清空按钮，可将选择器清空为初始状态 */
export const Example4 = {
  name: '可清空单选',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo4,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  适用性较广的基础多选，用 Tag 展示已选项 */
export const Example5 = {
  name: '基础多选',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo5,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可以自定义备选项 */
export const Example6 = {
  name: '自定义模板',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo6,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  备选项进行分组展示 */
export const Example7 = {
  name: '分组',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo7,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可以利用搜索功能快速查找选项 */
export const Example8 = {
  name: '可搜索',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo8,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  从服务器搜索数据，输入关键字进行查找 :::demo 为了启用远程搜索，需要将`filterable`和`remote`设置为`true`，同时传入一个`remote-method`。`remote-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。需要注意的是，如果`el-option`是通过`v-for`指令渲染出来的，此时需要为`el-option`添加`key`属性，且其值需具有唯一性，比如此例中的`item.value`。 */
export const Example9 = {
  name: '远程搜索',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo9,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可以创建并选中选项中不存在的条目 :::demo 使用`allow-create`属性即可通过在输入框中输入文字来创建新的条目。注意此时`filterable`必须为真。本例还使用了`default-first-option`属性，在该属性打开的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。 */
export const Example10 = {
  name: '创建条目',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo10,
    },
    template: '<example-demo></example-demo>',
  }),
};
