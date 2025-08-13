import { ref } from 'vue';
import { Loading, Search } from '@element-plus/icons-vue';
import Component from '../index';

export default {
  id: 'el-button-examples',
  title: '组件列表/Button 按钮/示例',
  component: { Search },
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
      console.log(Search.__vccOpts, '===',Search);
      return {
        Search,
      };
    },
    template: `
    <div class="mb-4">
      <el-button :icon="Search">默认按钮</el-button>
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
      <el-button :isPopConfirm='true' text='二次确认框' popconfirmTitle="我是二次确认框" popconfirmConfirmButtonText="对" popconfirmCancelButtonText="🙅" @click="handleClick"></el-button>
    </div>
    `,
  }),
};

/* 右图标按钮 */
export const Example6 = {
  name: '图标按钮',
  render: () => ({
    setup() {
      const rightIcon = ref('Clock');
      const changeRightIcon = () => {
        rightIcon.value = rightIcon.value === 'Clock' ? undefined : 'Clock';
      };
      const handleClick = () => {
        console.log('点击了按钮');
      };
      return {
        rightIcon,
        changeRightIcon,
        handleClick,
      };
    },
    template: `
    <div>
      <el-button icon="Clock" :rightIcon="rightIcon" @click="handleClick">文字按钮</el-button>
      <el-button type="primary" @click="changeRightIcon">切换rightIcon</el-button>
    </div>
    `,
  }),
};
