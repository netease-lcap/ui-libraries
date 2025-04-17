import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'el-link-examples',
  title: '组件列表/Link 链接/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

/* 基础链接 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <div>
      <el-link href="https://element-plus.org" target="_blank">默认链接</el-link>
      <el-link type="primary">主要链接</el-link>
      <el-link type="success">成功链接</el-link>
      <el-link type="warning">警告链接</el-link>
      <el-link type="danger">危险链接</el-link>
      <el-link type="info">信息链接</el-link>
    </div>
    <style>
      .el-link {
        margin-right: 8px;
      }
    </style>
    `,
  }),
};

/* 禁用状态 */
export const Example2 = {
  name: '禁用状态',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <div>
      <el-link disabled>默认链接</el-link>
      <el-link type="primary" disabled>主要链接</el-link>
      <el-link type="success" disabled>成功链接</el-link>
      <el-link type="warning" disabled>警告链接</el-link>
      <el-link type="danger" disabled>危险链接</el-link>
      <el-link type="info" disabled>信息链接</el-link>
    </div>
    <style>
      .el-link {
        margin-right: 8px;
      }
    </style>
    `,
  }),
};

/* 下划线 */
export const Example3 = {
  name: '下划线',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <div>
      <el-link :underline="false">无下划线</el-link>
      <el-link>有下划线</el-link>
    </div>
    <style>
      .el-link {
        margin-right: 8px;
      }
    </style>
    `,
  }),
}; 