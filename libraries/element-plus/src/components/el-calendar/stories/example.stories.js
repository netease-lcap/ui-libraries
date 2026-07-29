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
      const value = ref('2025-06-14');
      return { value };
    },
    template: `
    <div>
      <el-calendar data-nodepath="123" v-model="value" :range="['2025-06-01','2025-06-29']" />
    </div>
    `,
  }),
};

/* 自定义内容 */
export const Example2 = {
  name: '数据源',
  render: () => ({
    setup() {
      const value = ref('2025-03-14');
      const dataSource = async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              [{
                startTime: '2025-03-14',
                orange: 8,
              }, {
                startTime: '2025-03-15',
                apple: 1,
              }, {
                startTime: '2025-03-16',
                apple: 3,
                orange: 2,
              }],
            );
          }, 1000);
        });
      };
      const handleUpdateValue = (v) => {
        console.log(v);
      };
      return { value, handleUpdateValue, dataSource };
    },
    template: `
    <div>
      <el-calendar v-model="value" @update:modelValue="handleUpdateValue" :dataSource="dataSource">
          <template #cell="scope">
            <div v-if="scope.item.apple">苹果: {{scope.item.apple}}</div>
            <div v-if="scope.item.orange">橘子: {{scope.item.orange}}</div>
        </template>
        <template #header="{ date }">
          <span>自定义头部内容</span>
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
