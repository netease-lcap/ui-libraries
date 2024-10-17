import ElSelectPro from '../index';

export default {
  id: 'el-select-pro-examples',
  title: '组件列表/Select 选择器/示例',
  component: ElSelectPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    watch: {
      value(value) {
        console.log(value, 'value');
      },
    },
    methods: {
      log() {
        console.log(123);
      },
      handleChange(...args) {
        console.log(args);
      },
    },
    data() {
      return {
        value: 11,
        data: async (params) => {
          const initialData = [];
          const total = 50;
          for (let i = 0; i < total; i++) {
            initialData.push({
              key: {
                valueField: `${i}`,
                labelField: `${i}_${i % 3}`,
              },
            });
          }
          return {
            list: initialData,
            total,
          };
        },
        // data:[],
      };
    },
    template: `<el-select-pro
    :filterable="true"
    :dataSource="data"
    multiple
    valueField="key.valueField"
    textField="key.labelField"
    @search="log"
    @change="handleChange"
    >
    </el-select-pro>`,
  }),
};
