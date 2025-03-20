import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'el-button-examples',
  title: '组件列表/Button 按钮/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

/* 基础按钮 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <div class="mb-4">
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>
    <div class="mb-4">
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain>危险按钮</el-button>
    </div>
    <div class="mb-4">
      <el-button round>圆角按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
      <el-button type="success" round>成功按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="warning" round>警告按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </div>
    <style>
      .el-button {
        margin-right: 8px;
        margin-bottom: 12px;
      }
      .mb-4 {
        margin-bottom: 16px;
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
      <el-button disabled>默认按钮</el-button>
      <el-button type="primary" disabled>主要按钮</el-button>
      <el-button type="success" disabled>成功按钮</el-button>
      <el-button type="info" disabled>信息按钮</el-button>
      <el-button type="warning" disabled>警告按钮</el-button>
      <el-button type="danger" disabled>危险按钮</el-button>
    </div>
    <style>
      .el-button {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    </style>
    `,
  }),
};

/* 文字按钮 */
export const Example3 = {
  name: '文字按钮',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <div>
      <el-button text>文字按钮</el-button>
      <el-button type="primary" text>主要按钮</el-button>
      <el-button type="success" text>成功按钮</el-button>
      <el-button type="info" text>信息按钮</el-button>
      <el-button type="warning" text>警告按钮</el-button>
      <el-button type="danger" text>危险按钮</el-button>
    </div>
    <style>
      .el-button {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    </style>
    `,
  }),
};

/* 链接按钮 */
export const Example4 = {
  name: '链接按钮',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <div>
      <el-button link>链接按钮</el-button>
      <el-button type="primary" link>主要按钮</el-button>
      <el-button type="success" link>成功按钮</el-button>
      <el-button type="info" link>信息按钮</el-button>
      <el-button type="warning" link>警告按钮</el-button>
      <el-button type="danger" link>危险按钮</el-button>
    </div>
    <style>
      .el-button {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    </style>
    `,
  }),
};

export const Example5 = {
  name: '二次确认弹窗按钮',
  render: () => ({
    setup() {
      return {
        handleClick() {
          console.log('点击了按钮');
        },
      };
    },
    template: `
    <div>
      <el-button :isOpenConfirm='true' text='二次确认框' popconfirmTitle="我是二次确认框" popconfirmConfirmButtonText="对" popconfirmCancelButtonText="🙅" @click="handleClick"></el-button>
    </div>
    `,
  }),
};
