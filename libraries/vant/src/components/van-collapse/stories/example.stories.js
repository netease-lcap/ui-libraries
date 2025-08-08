import { VanCollapse, VanCollapseItem } from '../index';

export default {
  id: 'van-collapse-examples',
  title: '组件列表/Collapse 折叠面板/示例',
  component: { VanCollapse, VanCollapseItem },
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
      };
    },
    data() {
      return {
        activeNames: '1',
      };
    },
    template: `
      <van-collapse>
        <van-collapse-item name="1" :border="false" :rightIcon="args.rightIcon">
          <template #title>
            <van-text text="标题1"></van-text>
          </template>
          <van-text text="代码是写出来给人看的，附带能在机器上运行。"></van-text>
        </van-collapse-item>
        <van-collapse-item name="2">
          <template #title>
            <van-text text="标题2"></van-text>
          </template>
          <van-text text="技术无非就是那些开发它的人的共同灵魂。"></van-text>
        </van-collapse-item>
        <van-collapse-item name="3">
          <template #title>
            <van-text text="标题3"></van-text>
          </template>
          <van-text text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"></van-text>
        </van-collapse-item>
      </van-collapse>
      {{ activeNames }}
    `,
  }),
  args: {
    rightIcon: 'arrow-down',
  },
};

export const DataSourceSync = {
  name: '数据源-同步',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    data() {
      return {
        activeNames: '1',
        dataSource: [
          {
            title: '标题1',
            name: '1',
            content: '代码是写出来给人看的，附带能在机器上运行。',
          },
          {
            title: '标题2',
            name: '2',
            content: '技术无非就是那些开发它的人的共同灵魂。',
          },
          {
            title: '标题3',
            name: '3',
            content: '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。',
          },
        ],
      };
    },
    methods: {
      reload() {
        this.dataSource[0].title = '标题111';
      },
    },
    template: `
      <div style="margin-bottom: 10px;">
        <van-button @click="reload">reload</van-button>
      </div>
      <van-collapse v-model="activeNames" :accordion="true" :dataSource="dataSource" :rightIcon="args.rightIcon">
        <template #title="{ item }">
          {{ item.title }}
        </template>
        <template #content="{ item }">
          {{ item.content }}
        </template>
      </van-collapse>
      {{ activeNames }}
    `,
  }),
  args: {
    rightIcon: 'arrow-down',
  },
};

export const DataSourceAsync = {
  name: '数据源-异步',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    data() {
      return {
        activeNames: '1',
        data: [
          {
            title: '标题1',
            name: '1',
            content: '代码是写出来给人看的，附带能在机器上运行。',
          },
          {
            title: '标题2',
            name: '2',
            content: '技术无非就是那些开发它的人的共同灵魂。',
          },
          {
            title: '标题3',
            name: '3',
            content: '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。',
          },
        ],
      };
    },
    methods: {
      mockRequest(data, timeout = 300) {
        return new Promise((res, rej) => setTimeout(() => res(data), timeout));
      },
      loadData() {
        console.log('loadData');
        return this.mockRequest(this.data);
      },
      reload() {
        this.data[0].title = '标题111';
        this.$refs.collapseRef.reload();
      },
    },
    template: `
      <div style="margin-bottom: 10px;">
        <van-button @click="reload">reload</van-button>
      </div>
      <van-collapse v-model="activeNames" :accordion="true" :dataSource="loadData" ref="collapseRef">
          <template #title="{ item }">
          1
          </template>
          <template #content="{ item }">
          2
          </template>
      </van-collapse>
      {{ activeNames }}
    `,
  }),
  args: {
    value: new Date(),
  },
};
