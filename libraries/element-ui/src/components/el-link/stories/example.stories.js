import Component from '../index';

export default {
  id: 'el-link-examples',
  title: '组件列表/LINK 文字链接/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  基础的文字链接用法。 :::demo */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    template: `<div><div>
  <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
  <el-link type="primary">主要链接</el-link>
  <el-link type="success">成功链接</el-link>
  <el-link type="warning">警告链接</el-link>
  <el-link type="danger">危险链接</el-link>
  <el-link type="info">信息链接</el-link>
</div></div>`,
  }),
};

/*  文字链接不可用状态。 :::demo */
export const Example2 = {
  name: '禁用状态',
  render: () => ({
    template: `<div><div>
  <el-link disabled>默认链接</el-link>
  <el-link type="primary" disabled>主要链接</el-link>
  <el-link type="success" disabled>成功链接</el-link>
  <el-link type="warning" disabled>警告链接</el-link>
  <el-link type="danger" disabled>危险链接</el-link>
  <el-link type="info" disabled>信息链接</el-link>
</div></div>`,
  }),
};

/*  文字链接下划线。 :::demo */
export const Example3 = {
  name: '下划线',
  render: () => ({
    template: `<div><div>
  <el-link :underline="false">无下划线</el-link>
  <el-link>有下划线</el-link>
</div></div>`,
  }),
};

/*  带图标的文字链接可增强辨识度。 :::demo */
export const Example4 = {
  name: '图标',
  render: () => ({
    template: `<div><div>
  <el-link icon="el-icon-edit">编辑</el-link>
  <el-link>查看<i class="el-icon-view el-icon--right"></i> </el-link>
</div></div>`,
  }),
};
