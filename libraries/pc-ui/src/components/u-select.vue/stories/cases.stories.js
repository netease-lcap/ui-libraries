import Vue from 'vue';
import * as CloudUI from '@/index.js';
import Component from '../index.js';
import CasesDemo1 from '../demos/cases/CasesDemo1.vue';
import CasesDemo2 from '../demos/cases/CasesDemo2.vue';
import CasesDemo3 from '../demos/cases/CasesDemo3.vue';
import CasesDemo4 from '../demos/cases/CasesDemo4.vue';
import CasesDemo5 from '../demos/cases/CasesDemo5.vue';
import CasesDemo6 from '../demos/cases/CasesDemo6.vue';
import CasesDemo7 from '../demos/cases/CasesDemo7.vue';
import CasesDemo8 from '../demos/cases/CasesDemo8.vue';
import CasesDemo9 from '../demos/cases/CasesDemo9.vue';
import CasesDemo10 from '../demos/cases/CasesDemo10.vue';
import CasesDemo11 from '../demos/cases/CasesDemo11.vue';
import CasesDemo12 from '../demos/cases/CasesDemo12.vue';
import CasesDemo13 from '../demos/cases/CasesDemo13.vue';
import CasesDemo14 from '../demos/cases/CasesDemo14.vue';
import CasesDemo15 from '../demos/cases/CasesDemo15.vue';
import CasesDemo16 from '../demos/cases/CasesDemo16.vue';
import CasesDemo17 from '../demos/cases/CasesDemo17.vue';
import CasesDemo18 from '../demos/cases/CasesDemo18.vue';
import CasesDemo19 from '../demos/cases/CasesDemo19.vue';
import CasesDemo20 from '../demos/cases/CasesDemo20.vue';
import CasesDemo21 from '../demos/cases/CasesDemo21.vue';
import CasesDemo22 from '../demos/cases/CasesDemo22.vue';
import CasesDemo23 from '../demos/cases/CasesDemo23.vue';
import CasesDemo24 from '../demos/cases/CasesDemo24.vue';
import CasesDemo25 from '../demos/cases/CasesDemo25.vue';
import CasesDemo26 from '../demos/cases/CasesDemo26.vue';
import CasesDemo27 from '../demos/cases/CasesDemo27.vue';
import CasesDemo28 from '../demos/cases/CasesDemo28.vue';
import CasesDemo29 from '../demos/cases/CasesDemo29.vue';
import CasesDemo30 from '../demos/cases/CasesDemo30.vue';
import CasesDemo31 from '../demos/cases/CasesDemo31.vue';
import CasesDemo32 from '../demos/cases/CasesDemo32.vue';
import CasesDemo33 from '../demos/cases/CasesDemo33.vue';
import CasesDemo34 from '../demos/cases/CasesDemo34.vue';

Vue.use(CloudUI);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/u-select.vue/cases',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Demo0 = {
  name: '基本用法',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo1,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo1 = {
  name: 'appendTo:body',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo2,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo2 = {
  name: '双向绑定',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo3,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo3 = {
  name: '双向绑定',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo4,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo4 = {
  name: '只读、禁用、禁用某一项',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo5,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo5 = {
  name: '分隔符',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo6,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo6 = {
  name: '定位',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo7,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo7 = {
  name: '分组',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo8,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo8 = {
  name: '可清除',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo9,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo9 = {
  name: 'Layer',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo10,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo10 = {
  name: '数据源',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo11,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo11 = {
  name: '基本用法',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo12,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo12 = {
  name: '双向绑定',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo13,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo13 = {
  name: 'Tags 风格',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo14,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo14 = {
  name: 'Tags 风格',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo15,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo15 = {
  name: 'Tags 展示icon',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo16,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo16 = {
  name: '对齐和清空问题',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo17,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo17 = {
  name: '保持顺序',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo18,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo18 = {
  name: '选项初始值',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo19,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo19 = {
  name: '前端过滤',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo20,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo20 = {
  name: '有空的项',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo21,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo21 = {
  name: '清除缓存',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo22,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo22 = {
  name: 'Tag 方式',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo23,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo23 = {
  name: 'Data 方式',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo24,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo24 = {
  name: '列表与 value 同时改变的问题',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo25,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo25 = {
  name: '一次性后端数据，前端过滤',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo26,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo26 = {
  name: '后端过滤，后端分页',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo27,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo27 = {
  name: '一次性后端数据，前端分页',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo28,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo28 = {
  name: 'prefix, suffix',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo29,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo29 = {
  name: '反色',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo30,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo30 = {
  name: '标签和数据源混合使用',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo31,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo31 = {
  name: '自定义选中值的展示形式，项可添加描述',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo32,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo32 = {
  name: '自定义可扩展下拉项',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo33,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo33 = {
  name: '选中值是下一页数据的选中处理',
  render: () => ({
    components: {
      DeprecatedDemo: CasesDemo34,
    },
    template: '<deprecated-demo />',
  }),
};
