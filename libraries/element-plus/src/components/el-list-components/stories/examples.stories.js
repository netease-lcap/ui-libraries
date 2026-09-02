import { ref } from 'vue';
import Component from '../index';
import ExamplesDemo1 from '../demos/examples/ExamplesDemo1.vue';
import ExamplesDemo2 from '../demos/examples/ExamplesDemo2.vue';
import ExamplesDemo3 from '../demos/examples/ExamplesDemo3.vue';
import ExamplesDemo4 from '../demos/examples/ExamplesDemo4.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: '组件列表/List Component 组件列表/示例',
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
  name: '基础用法',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo1,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo1 = {
  name: '数据源',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo2,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo2 = {
  name: '选中功能',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo3,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo3 = {
  name: '文本字段',
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo4,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo4 = {
  name: 'new',

  render: () => ({
    components: {
      ElListComponents: Component,
    },
    setup() {
      const value = ref(1);
      return {
        value,
      };
    },
    template: `
    <div>
    {{value}}
    <el-list-components  v-model="value" :clearable="true" secection="multiple" :column="1" :equal-width="false" pagination="none" :total="100" :dataSource="Array.from({length: 100}, (_, i) => i + 1)" :row-gap="10" :column-gap="40">

    </el-list-components>
    </div>

    `,
  }),
};

export const Demo5 = {
  name: '无容器包裹 noWrapper',
  render: () => ({
    components: {
      ElListComponents: Component,
    },
    setup() {
      const list = Array.from({ length: 5 }, (_, i) => ({
        label: `Item ${i + 1}`,
        value: i + 1,
      }));
      return { list };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px;">
      <div class="root">
      
        <el-list-components :no-wrapper="true" :data-source="list">
          <template #default="{ item }">
            <div>{{ item.label }}</div>
          </template>
        </el-list-components>
      </div>
      </div>
    `,
  }),
};
