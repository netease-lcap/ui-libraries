import { ref } from 'vue';
import Components from '../index';

export default {
  id: 'el-pagination-pro-examples',
  title: '组件列表/ Pagination 分页/ 示例',
  component: Components,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    setup() {
      const value = ref(2);
      const myref = ref(null);
      const handleUpdatePageSize = (value) => {
        // console.log(value, 'value');
        myref.value.onChange(3);
      };
      return {
        value,
        handleUpdatePageSize,
        myref,
      };
    },
    template: `
    <div>
    {{value}}
    <el-pagination-plus ref="myref" v-model:current-page="value" size="small" layout="prev, pager, next" :total="50" />
    <button @click="handleUpdatePageSize">更新  </button>
    </div>
    `,
  }),
};
