import ElRatePro from '../index';

export default {
  id: 'el-rate-pro-examples',
  title: 'Pro组件列表/Rate 评分/示例',
  component: ElRatePro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<el-rate-pro :clearable="true"></el-rate-pro>',
  }),
};

export const Demo1 = {
  name: '自定义图标',
  render: () => ({
    template: '<el-rate-pro iconname="icon-sugar"></el-rate-pro>',
  }),
};


  export const Demo2 = {
    name: '区分颜色',
    render: () => ({
      data: () => ({
        distinguishColor: true,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        lowThreshold: 4,
        highThreshold:6,
        count: 9
      }),
      template: '<el-rate-pro :count="count" :distinguish-color="distinguishColor" :colors="colors" :low-threshold="lowThreshold" :high-threshold="highThreshold"></el-rate-pro>',
    }),
  };
  

  export const Demo3 = {
    name: '显示分数',
    render: () => ({
      data: () => ({
        showText: true,
        showScore: true,
        scoreTemplate: '{value}biuuu',
      }),
      template: '<el-rate-pro :show-text="showText" :show-score="showScore" :score-template="scoreTemplate"></el-rate-pro>',
    }),
  };
  