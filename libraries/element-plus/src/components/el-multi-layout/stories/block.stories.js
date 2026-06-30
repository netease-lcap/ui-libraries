import ElMultiLayout from '../index';

export default {
  id: 'el-multi-layout-blocks',
  title: '组件列表/Multi Layout 分栏/内置区块',
  component: ElMultiLayout,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    () => ({
      provide() {
        return {
          VUE_APP_DESIGNER: true,
        };
      },
      template: '<div style="width:99vw;height: 90vh;"><story/></div>',
    }),
  ],
};

export const Demo0 = {
  name: '两栏-左侧固定',
  render: () => ({
    template: `
      <el-multi-layout direction="vertical" :gutter="0" :wrap="false" >
       <el-multi-layout-top-nav gutter="0">

        </el-multi-layout-top-nav>
        <el-multi-layout-body :gutter="0">
          <el-multi-layout :gutter="0" :wrap="false" style="width: 100%;">
            <el-multi-layout-sidebar mode="block" :gutter="0">
    
            </el-multi-layout-sidebar>
            <el-multi-layout-main mode="block" style="--custom-start: auto;overflow: auto;padding-buttom:16px">
              <el-multi-layout-main-head :gutter="0">
              </el-multi-layout-main-head>
              <el-multi-layout-main-body mode="block" :gutter="0" style="margin:16px">
              </el-multi-layout-main-body>
         
            </el-multi-layout-main>
          </el-multi-layout>
        </el-multi-layout-body>
      </el-multi-layout>
    `,
  }),
};

export const Demo1 = {
  name: '两栏-左侧固定-无顶部导航 ',
  render: () => ({
    template: `
      <el-multi-layout direction="vertical" :gutter="0" :wrap="false">
        <el-multi-layout-item :gutter="0" style="width: 100%;">
          <el-multi-layout :gutter="0" style="width: 100%;" :wrap="false">
            <el-multi-layout-item :gutter="0" style="width:200px;"></el-multi-layout-item>
            <el-multi-layout-item :gutter="0" style="--custom-start: auto; flex: 1;"></el-multi-layout-item>
          </el-multi-layout>
        </el-multi-layout-item>
      </el-multi-layout>
    `,
  }),
};
