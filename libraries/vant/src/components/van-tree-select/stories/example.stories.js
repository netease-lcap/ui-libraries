import VanTreeSelect from '../index';

export default {
  id: 'van-tree-select-examples',
  title: '组件列表/TreeSelect 树形选择/示例',
  component: VanTreeSelect,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '数据源同步',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    data() {
      return {
        activeId: null,
        activeIndex: null,
      };
    },
    methods: {
      clickNav(e) {
        console.log('clickNav', e);
      },
      clickItem(e) {
        console.log('clickItem', e);
      },
    },
    template: `
      <van-tree-select v-bind="args"
        v-model:activeId="activeId"
        v-model:mainActiveIndex="activeIndex"
        @click-nav="clickNav"
        @click-item="clickItem"
        textField="text1"
        valueField="id1">
      <template #navtext="content">{{ content.item.text }}ss</template>
        <template #rightcontent>
          DDDD
        </template>
      </van-tree-select>
      <div>{{ activeId }}</div>
      <div>{{ activeIndex }}</div>
    `,
  }),
  args: {
    dataSource: [
      {
        text1: '浙江',
        children: [
          { text1: '杭州', id1: 1 },
          { text1: '温州', id1: 2 },
          { text1: '宁波', id1: 3, disabled: true },
        ],
      },
      {
        text1: '江苏',
        children: [
          { text1: '南京', id1: 4 },
          { text1: '无锡', id1: 5 },
          { text1: '徐州', id1: 6 },
        ],
      },
      { text1: '福建', disabled: true },
    ],
    selectedIcon: 'success',
    customContent: false,
    customNavText: false,
    multiple: false,
    max: 2,
  },
};

export const DataSourceAsync = {
  name: '数据源异步',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    data() {
      return {
        activeId: null,
        activeIndex: null,
        data: [
          {
            text: '浙江',
            children: [
              { text: '杭州', id: 1 },
              { text: '温州', id: 2 },
              { text: '宁波', id: 3, disabled: true },
            ],
          },
          {
            text: '江苏',
            children: [
              { text: '南京', id: 4 },
              { text: '无锡', id: 5 },
              { text: '徐州', id: 6 },
            ],
          },
          { text: '福建', disabled: true },
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
    },
    template: `
      <van-tree-select :dataSource="loadData"/>
      <div>{{ activeId }}</div>
      <div>{{ activeIndex }}</div>
    `,
  }),
  args: {},
};

export const DataSourceAsyncParent = {
  name: '数据源异步父级',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    data() {
      return {
        activeId: null,
        activeIndex: null,
        parentData: [
          { id1: 1000, text1: '浙江', parentId: null, dot1: true },
          { id1: 1, text1: '杭州', parentId: 1000 },
          { id1: 2, text1: '温州', parentId: 1000 },
          { id1: 3, text1: '宁波', parentId: 1000, disabled: true },
          { id1: 1001, text1: '江苏', parentId: null, badge1: 1 },
          { id1: 4, text1: '南京', parentId: 1001 },
          { id1: 5, text1: '无锡', parentId: 1001 },
          { id1: 6, text1: '徐州', parentId: 1001 },
          { id1: 1002, text1: '福建', parentId: null, disabled: true },
        ],
      };
    },
    methods: {
      mockRequest(data, timeout = 300) {
        return new Promise((res, rej) => setTimeout(() => res(data), timeout));
      },
      loadData() {
        console.log('loadData');
        return this.mockRequest(this.parentData);
      },
      clickNav(e) {
        console.log('clickNav', e);
      },
      clickItem(e) {
        console.log('clickItem', e);
      },
    },
    template: `
      <van-tree-select
        :dataSource="loadData"
        parentField="parentId"
        valueField="id1"
        textField="text1"
        dotField="dot1"
        badgeField="badge1"
        @click-nav="clickNav"
        @click-item="clickItem"
        v-model:activeId="activeId"
        v-model:mainActiveIndex="activeIndex"/>
      <div>{{ activeId }}</div>
      <div>{{ activeIndex }}</div>
    `,
  }),
  args: {},
};

export const FormItem = {
  name: '表单项',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    data() {
      return {
        activeId: null,
        activeIndex: null,
      };
    },
    methods: {
      clickNav(e) {
        console.log('clickNav', e);
      },
      clickItem(e) {
        console.log('clickItem', e);
      },
    },
    template: `
      <van-form>
        <van-form-tree-select v-bind="args"
        class="myTree"
        v-model:activeId="activeId"
        v-model:mainActiveIndex="activeIndex"
        @click-nav="clickNav"
        @click-item="clickItem">
      <template #navtext="content">{{ content.item.text }}ss</template>
        <template #rightcontent>
          DDDD
        </template>
        </van-form-tree-select>
      </van-form>
      <div>{{ activeId }}</div>
      <div>{{ activeIndex }}</div>
    `,
  }),
  args: {
    dataSource: [
      {
        text: '浙江',
        children: [
          { text: '杭州', id: 1 },
          { text: '温州', id: 2 },
          { text: '宁波', id: 3, disabled: true },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 4 },
          { text: '无锡', id: 5 },
          { text: '徐州', id: 6 },
        ],
      },
      { text: '福建', disabled: true },
    ],
    selectedIcon: 'success',
    customContent: false,
    customNavText: false,
    multiple: false,
    max: 2,
  },
};
