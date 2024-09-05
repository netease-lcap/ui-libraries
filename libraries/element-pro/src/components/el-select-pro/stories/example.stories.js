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
                valuefield: `${i}`,
                labelfield: `${i % 3}`,
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
    @search="log"
    >
    
      <el-option-pro label="12" las="33" value="11" data-nodepath="1234" >
      </el-option-pro>
    </el-select-pro>`,
  }),
};
