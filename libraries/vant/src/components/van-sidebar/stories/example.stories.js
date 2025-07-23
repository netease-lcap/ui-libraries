import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'van-sidebar-examples',
  title: '组件列表/Sidebar 侧边导航/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基础用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        activeIndex: ref('1'),
        handleSelect(index) {
          console.log('选中导航项:', index);
        },
        handleChange(value) {
          console.log('导航值改变:', value);
        },
      };
    },
    template: `
      <div style="height: 400px; display: flex;">
        <van-sidebar 
          v-model="activeIndex" 
          v-bind="args"
          @select="handleSelect"
          @change="handleChange">
          <van-sidebar-item index="1" text="导航一" />
          <van-sidebar-item index="2" text="导航二" />
          <van-sidebar-item index="3" text="导航三" />
          <van-sidebar-item index="4" text="导航四" />
        </van-sidebar>
        <div style="flex: 1; padding: 20px;">
          <p>当前选中: {{ activeIndex }}</p>
        </div>
      </div>
    `,
  }),
  args: {
    width: '200px',
    backgroundColor: '#f7f8fa',
    textColor: '#323233',
    activeTextColor: '#1989fa',
    activeBackgroundColor: '#e8f3ff',
    showBorder: true,
    showActiveIndicator: true,
  },
};

export const WithIcons = {
  name: '带图标',
  render: () => ({
    setup() {
      return {
        activeIndex: ref('1'),
        handleSelect(index) {
          console.log('选中导航项:', index);
        },
      };
    },
    template: `
      <div style="height: 400px; display: flex;">
        <van-sidebar 
          v-model="activeIndex"
          @select="handleSelect">
          <van-sidebar-item index="1" text="首页" icon="home-o" />
          <van-sidebar-item index="2" text="用户" icon="user-o" />
          <van-sidebar-item index="3" text="设置" icon="setting-o" />
          <van-sidebar-item index="4" text="帮助" icon="question-o" />
        </van-sidebar>
        <div style="flex: 1; padding: 20px;">
          <p>当前选中: {{ activeIndex }}</p>
        </div>
      </div>
    `,
  }),
};

export const WithBadges = {
  name: '带徽标',
  render: () => ({
    setup() {
      return {
        activeIndex: ref('1'),
        handleSelect(index) {
          console.log('选中导航项:', index);
        },
      };
    },
    template: `
      <div style="height: 400px; display: flex;">
        <van-sidebar 
          v-model="activeIndex"
          @select="handleSelect">
          <van-sidebar-item index="1" text="消息" badge="5" />
          <van-sidebar-item index="2" text="通知" badge="99+" badge-type="danger" />
          <van-sidebar-item index="3" text="提醒" badge-dot />
          <van-sidebar-item index="4" text="其他" />
        </van-sidebar>
        <div style="flex: 1; padding: 20px;">
          <p>当前选中: {{ activeIndex }}</p>
        </div>
      </div>
    `,
  }),
};

export const Disabled = {
  name: '禁用状态',
  render: () => ({
    setup() {
      return {
        activeIndex: ref('1'),
        handleSelect(index) {
          console.log('选中导航项:', index);
        },
      };
    },
    template: `
      <div style="height: 400px; display: flex;">
        <van-sidebar 
          v-model="activeIndex"
          disabled
          @select="handleSelect">
          <van-sidebar-item index="1" text="导航一" />
          <van-sidebar-item index="2" text="导航二" disabled />
          <van-sidebar-item index="3" text="导航三" />
          <van-sidebar-item index="4" text="导航四" />
        </van-sidebar>
        <div style="flex: 1; padding: 20px;">
          <p>当前选中: {{ activeIndex }}</p>
          <p>整个侧边栏已禁用</p>
        </div>
      </div>
    `,
  }),
};

export const CustomColors = {
  name: '自定义颜色',
  render: () => ({
    setup() {
      return {
        activeIndex: ref('1'),
        handleSelect(index) {
          console.log('选中导航项:', index);
        },
      };
    },
    template: `
      <div style="height: 400px; display: flex;">
        <van-sidebar 
          v-model="activeIndex"
          background-color="#2c3e50"
          text-color="#ecf0f1"
          active-text-color="#3498db"
          active-background-color="#34495e"
          border-color="#34495e"
          @select="handleSelect">
          <van-sidebar-item index="1" text="导航一" />
          <van-sidebar-item index="2" text="导航二" />
          <van-sidebar-item index="3" text="导航三" />
          <van-sidebar-item index="4" text="导航四" />
        </van-sidebar>
        <div style="flex: 1; padding: 20px;">
          <p>当前选中: {{ activeIndex }}</p>
        </div>
      </div>
    `,
  }),
};

export const NoBorder = {
  name: '无边框',
  render: () => ({
    setup() {
      return {
        activeIndex: ref('1'),
        handleSelect(index) {
          console.log('选中导航项:', index);
        },
      };
    },
    template: `
      <div style="height: 400px; display: flex;">
        <van-sidebar 
          v-model="activeIndex"
          :show-border="false"
          @select="handleSelect">
          <van-sidebar-item index="1" text="导航一" />
          <van-sidebar-item index="2" text="导航二" />
          <van-sidebar-item index="3" text="导航三" />
          <van-sidebar-item index="4" text="导航四" />
        </van-sidebar>
        <div style="flex: 1; padding: 20px;">
          <p>当前选中: {{ activeIndex }}</p>
        </div>
      </div>
    `,
  }),
};

export const NoIndicator = {
  name: '无指示器',
  render: () => ({
    setup() {
      return {
        activeIndex: ref('1'),
        handleSelect(index) {
          console.log('选中导航项:', index);
        },
      };
    },
    template: `
      <div style="height: 400px; display: flex;">
        <van-sidebar 
          v-model="activeIndex"
          :show-active-indicator="false"
          @select="handleSelect">
          <van-sidebar-item index="1" text="导航一" />
          <van-sidebar-item index="2" text="导航二" />
          <van-sidebar-item index="3" text="导航三" />
          <van-sidebar-item index="4" text="导航四" />
        </van-sidebar>
        <div style="flex: 1; padding: 20px;">
          <p>当前选中: {{ activeIndex }}</p>
        </div>
      </div>
    `,
  }),
}; 