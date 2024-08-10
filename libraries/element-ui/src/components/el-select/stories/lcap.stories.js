import Component from '../index';

export default {
  id: 'el-button-lcap-exmaples',
  title: '组件列表/Select 选择器/扩展示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
};

const normalDataSource = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶',
        disabled: true
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]);
    }, 3000);
  });
};

export const DataSource = {
  name: '数据源渲染',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    data() {
      return {
        value: '',
        plugin: {},
      };
    },
    methods: {
      handleClick(c) {

      },
      normalDataSource,
    },
    template: '<el-select :dataSource="normalDataSource" ref="select" :value.sync="value"></el-select>',
  }),
  args: {
    // dataSource: normalDataSource,
  }
};


const states = ["Alabama", "Alaska", "Arizona",
"Arkansas", "California", "Colorado",
"Connecticut", "Delaware", "Florida",
"Georgia", "Hawaii", "Idaho", "Illinois",
"Indiana", "Iowa", "Kansas", "Kentucky",
"Louisiana", "Maine", "Maryland",
"Massachusetts", "Michigan", "Minnesota",
"Mississippi", "Missouri", "Montana",
"Nebraska", "Nevada", "New Hampshire",
"New Jersey", "New Mexico", "New York",
"North Carolina", "North Dakota", "Ohio",
"Oklahoma", "Oregon", "Pennsylvania",
"Rhode Island", "South Carolina",
"South Dakota", "Tennessee", "Texas",
"Utah", "Vermont", "Virginia",
"Washington", "West Virginia", "Wisconsin",
"Wyoming"];
export const Filter = {
  name: '远程搜索',
  render: () => ({
    data: () => {
      return {
        value: '',
      };
    },
    methods: {
      filterDataSource: ({ filterText }) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (!filterText) {
              return resolve(states.slice(0, 10).map(item => {
                return { value: `value:${item}`, label: `label:${item}` };
              }));
            }
            resolve(states.filter((label) => label.toLowerCase().indexOf(filterText.toLowerCase()) > -1).map(item => {
              return { value: `value:${item}`, label: `label:${item}` };
            }));
          }, 3000);
        });
      },
    },
    template: '<el-select :dataSource="filterDataSource" filterable remote ref="select" :value.sync="value"></el-select>',
  }),
};
