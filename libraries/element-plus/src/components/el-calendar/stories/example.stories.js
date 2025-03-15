import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'el-calendar-examples',
  title: '组件列表/Calendar 日历/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

/* 基础用法 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    setup() {
      const value = ref(new Date('2025-03-14'));
      return { value };
    },
    template: `
    <div>
      <el-calendar data-nodepath="123" v-model="value" />
    </div>
    `,
  }),
};

/* 自定义内容 */
export const Example2 = {
  name: '自定义内容',
  render: () => ({
    setup() {
      const value = ref('2025-03-14');
      const handleUpdateValue = (v) => {
        console.log(v);
      };
      return { value, handleUpdateValue };
    },
    template: `
    <div>
      <el-calendar v-model="value" @update:modelValue="handleUpdateValue">
        <template #date-cell="{ data }">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(1).join('-') }}
            {{ data.isSelected ? '✓' : '' }}
          </p>
        </template>
      </el-calendar>
    </div>
    `,
  }),
};

/* 自定义范围 */
export const Example3 = {
  name: '自定义范围',
  render: () => ({
    setup() {
      const value = ref(new Date());
      return { value };
    },
    template: `
    <div>
      <el-calendar>
        <template #header="{ date }">
          <span>自定义头部内容</span>
          <span>{{ date }}</span>
        </template>
      </el-calendar>
    </div>
    `,
  }),
};
