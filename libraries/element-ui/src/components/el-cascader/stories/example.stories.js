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
  id: 'el-cascader-examples',
  title: '组件列表/CASCADER 级联选择器/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  有两种触发子菜单的方式 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  通过在数据源中设置 `disabled` 字段来声明该选项是禁用的 */
export const Example2 = {
  name: '禁用选项',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  通过 `clearable` 设置输入框可清空 */
export const Example3 = {
  name: '可清空',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可以仅在输入框中显示选中项最后一级的标签，而不是选中项所在的完整路径。 */
export const Example4 = {
  name: '仅显示最后一级',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo4,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可通过 `props.multiple = true` 来开启多选模式 */
export const Example5 = {
  name: '多选',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo5,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  在单选模式下，你只能选择叶子节点；而在多选模式下，勾选父节点真正选中的都是叶子节点。启用该功能后，可让父子节点取消关联，选择任意一级选项。 */
export const Example6 = {
  name: '选择任意一级选项',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo6,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  当选中某一级时，动态加载该级下的选项。 */
export const Example7 = {
  name: '动态加载',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo7,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可以快捷地搜索选项并选择。 */
export const Example8 = {
  name: '可搜索',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo8,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  可以自定义备选项的节点内容 */
export const Example9 = {
  name: '自定义节点内容',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo9,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  级联面板是级联选择器的核心组件，与级联选择器一样，有单选、多选、动态加载等多种功能。 */
export const Example10 = {
  name: '级联面板',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo10,
    },
    template: '<example-demo></example-demo>',
  }),
};
