import Vue from 'vue';
import * as CloudUI from '@/index.js';
import Component from '../index.js';

Vue.use(CloudUI);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/u-table-view.vue/功能演示',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
const originDataSource = [
  { name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000, checked: true },
  { name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000, checked: false },
  { name: '李四', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000, checked: false },
  { name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000, checked: false },
  { name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000, checked: false },
];
const dataSource = [];
for (let i = 0; i < 400; i++) {
  const newDataSource = originDataSource.map((item, index) => {
    return { ...item, index: Math.floor(Math.random() * 10000 * (index + 1) * (dataSource.length + 1)) };
  });
  dataSource.push(...newDataSource);
}
console.log('数据条数：', dataSource.length)

const TempComponent = {
  props: {
    dataSource: {
      type: Array,
      value: () => [],
    },
  },
  template: `
    <u-table-view :data-source="dataSource">
      <u-table-view-column title="用户名" width="20%">
        <template #cell="current">
          <u-text>{{ current.item.name }} {{ current.item.index }}</u-text>
        </template>
      </u-table-view-column>
      <u-table-view-column title="选中" width="20%">
        <template #cell="current">
          <u-text>{{ current.item.checked }}</u-text>
          <u-checkbox :value.sync="current.item.checked"></u-checkbox>
        </template>
      </u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="地址" field="address"></u-table-view-column>
      <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
    </u-table-view>
  `,
};

export const Default = {
  name: '默认性能-Checkbox',
  render: () => ({
    template: `
    <div>
      <u-input :value.sync="value1" />
      {{ selectedValues }}
      <u-table-view :data-source="dataSource" :values.sync="selectedValues" valueField="index">
      <u-table-view-column type="expander" title="展开" width="8%">
        <template #expander="current">
            <u-table-view-expander
                :item="current.item"
                @toggle="current.toggle"
                expand-icon="decrease">
            </u-table-view-expander>
        </template>
        <div slot="expand-content" slot-scope="{ item }">
            <u-list type="disc">
                <u-list-item>{{ item.address }} 1</u-list-item>
                <u-list-item>{{ item.address }} 2</u-list-item>
                <u-list-item>{{ item.address }} 3</u-list-item>
                <u-list-item>{{ item.address }} 4</u-list-item>
                <u-list-item>{{ item.address }} 5</u-list-item>
            </u-list>
        </div>
      </u-table-view-column>
      <u-table-view-column type="checkbox" title="选择" width="8%"></u-table-view-column>
      <u-table-view-column title="用户名" width="20%">
        <template #cell="current">
          <u-text>{{ current.item.name }} {{ current.item.index }}</u-text>
        </template>
      </u-table-view-column>
      <u-table-view-column title="选中" width="20%">
        <template #cell="current">
          <u-text>{{ current.item.checked }}</u-text>
          <u-checkbox :value.sync="current.item.checked"></u-checkbox>
        </template>
      </u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="地址" field="address"></u-table-view-column>
      <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
    </u-table-view>
    </div>
    `,
    data() {
      return {
        value1: '',
        dataSource: [...dataSource],
        selectedValues: [],
      };
    },
    watch: {
      selectedValues(value) {
        console.log(value);
      },
    },
  }),
};

export const Default1 = {
  name: '默认性能-Radio',
  render: () => ({
    template: `
    <div>
      <u-input :value.sync="value1" />
      {{ selectedValues }}
      <u-table-view :data-source="dataSource" :value.sync="selectedValues" valueField="index">
      <u-table-view-column type="radio" title="选择" width="8%"></u-table-view-column>
      <u-table-view-column title="用户名" width="20%">
        <template #cell="current">
          <u-text>{{ current.item.name }} {{ current.item.index }}</u-text>
        </template>
      </u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="地址" field="address"></u-table-view-column>
      <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
    </u-table-view>
    </div>
    `,
    data() {
      return {
        value1: '',
        dataSource: [...dataSource],
        selectedValues: [],
      };
    },
    watch: {
      selectedValues(value) {
        console.log(value);
      },
    },
  }),
};

export const Default2 = {
  name: '默认性能-Radio-虚拟滚动',
  render: () => ({
    template: `
    <div>
      <u-input :value.sync="value1" />
      {{ selectedValues }}
      <u-table-view :data-source="dataSource" :value.sync="selectedValues" valueField="index" :virtual="true" :nativeScroll="true" style="height:100vh">
      <u-table-view-column type="radio" title="选择" width="8%"></u-table-view-column>
      <u-table-view-column title="用户名" width="20%">
        <template #cell="current">
          <u-text>{{ current.item.name }} {{ current.item.index }}</u-text>
        </template>
      </u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
      <u-table-view-column title="地址" field="address"></u-table-view-column>
      <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
    </u-table-view>
    </div>
    `,
    data() {
      return {
        value1: '',
        dataSource: [...dataSource],
        selectedValues: [],
      };
    },
    watch: {
      selectedValues(value) {
        console.log(value);
      },
    },
  }),
};

export const Progressive = {
  name: '优化性能',
  render: () => ({
    components: {
      TempComponent,
    },
    template: `
    <div>
      <u-input :value.sync="value1" />
      <temp-component :data-source="dataSource"></temp-component>
    </div>
    `,
    data() {
      return {
        value1: '',
        dataSource: [...dataSource],
      };
    },
  }),
};
