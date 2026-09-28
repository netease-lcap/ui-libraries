import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'van-radio-examples',
  title: '组件列表/Radio 单选框/示例',
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
      const dataSource = async () => {
        return [
          { value: '1', text: '选项1' },
          { value: '2', text: '选项2' },
          { value: '3', text: '选项3' },
        ];
      };
      const value = ref('1');
      return {
        args,
        dataSource,
        value,
        handleChange(value) {
          console.log('单选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-radio-group 
          v-model="value" 
          v-bind="args" 
          :preview="true"
          :dataSource="dataSource"
          value-field="value"
          text-field="text"
          @change="handleChange">

        </van-radio-group>
        <p style="margin-top: 10px;">当前选中: {{ value }}</p>
      </div>
    `,
  }),
  args: {
    disabled: false,
    direction: 'horizontal',
    iconPosition: 'left',
    shape: 'round',
  },
};

export const CustomColor = {
  name: '自定义颜色',
  render: () => ({
    setup() {
      return {
        value: '1',
        handleChange(value) {
          console.log('单选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-radio-group 
          v-model="value" 
          checked-color="#ee0a24"
          unchecked-color="#c8c9cc"
          @change="handleChange">
          <van-radio value="1" label="红色主题"></van-radio>
          <van-radio value="2" label="红色主题"></van-radio>
          <van-radio value="3" label="红色主题"></van-radio>
        </van-radio-group>
        <p style="margin-top: 10px;">当前选中: {{ value }}</p>
      </div>
    `,
  }),
};

export const CustomSize = {
  name: '自定义大小',
  render: () => ({
    setup() {
      return {
        value: '1',
        handleChange(value) {
          console.log('单选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-radio-group 
          v-model="value" 
          :icon-size="24"
          :label-size="16"
          @change="handleChange">
          <van-radio value="1" label="大尺寸"></van-radio>
          <van-radio value="2" label="大尺寸"></van-radio>
          <van-radio value="3" label="大尺寸"></van-radio>
        </van-radio-group>
        <p style="margin-top: 10px;">当前选中: {{ value }}</p>
      </div>
    `,
  }),
};

export const CustomShape = {
  name: '自定义形状',
  render: () => ({
    setup() {
      return {
        value: '1',
        handleChange(value) {
          console.log('单选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-radio-group 
          v-model="value" 
          shape="square"
          @change="handleChange">
          <van-radio value="1" label="方形"></van-radio>
          <van-radio value="2" label="方形"></van-radio>
          <van-radio value="3" label="方形"></van-radio>
        </van-radio-group>
        <p style="margin-top: 10px;">当前选中: {{ value }}</p>
      </div>
    `,
  }),
};

export const IconPosition = {
  name: '图标位置',
  render: () => ({
    setup() {
      return {
        value: '1',
        handleChange(value) {
          console.log('单选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-radio-group 
          v-model="value" 
          icon-position="right"
          @change="handleChange">
          <van-radio value="1" label="图标在右侧"></van-radio>
          <van-radio value="2" label="图标在右侧"></van-radio>
          <van-radio value="3" label="图标在右侧"></van-radio>
        </van-radio-group>
        <p style="margin-top: 10px;">当前选中: {{ value }}</p>
      </div>
    `,
  }),
};

export const VerticalDirection = {
  name: '垂直排列',
  render: () => ({
    setup() {
      return {
        value: '1',
        handleChange(value) {
          console.log('单选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-radio-group 
          v-model="value" 
          direction="vertical"
          @change="handleChange">
          <van-radio value="1" label="垂直排列选项1"></van-radio>
          <van-radio value="2" label="垂直排列选项2"></van-radio>
          <van-radio value="3" label="垂直排列选项3"></van-radio>
        </van-radio-group>
        <p style="margin-top: 10px;">当前选中: {{ value }}</p>
      </div>
    `,
  }),
};

export const Disabled = {
  name: '禁用状态',
  render: () => ({
    setup() {
      return {
        value: '1',
        handleChange(value) {
          console.log('单选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-radio-group 
          v-model="value" 
          disabled
          @change="handleChange">
          <van-radio value="1" label="禁用状态"></van-radio>
          <van-radio value="2" label="禁用状态"></van-radio>
          <van-radio value="3" label="禁用状态"></van-radio>
        </van-radio-group>
        <p style="margin-top: 10px;">当前选中: {{ value }}</p>
      </div>
    `,
  }),
};

export const AllowUncheck = {
  name: '允许取消选择',
  render: () => ({
    setup() {
      return {
        value: '1',
        handleChange(value) {
          console.log('单选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-radio-group 
          v-model="value" 
          :allow-uncheck="true"
          @change="handleChange">
          <van-radio value="1" label="允许取消"></van-radio>
          <van-radio value="2" label="允许取消"></van-radio>
          <van-radio value="3" label="允许取消"></van-radio>
        </van-radio-group>
        <p style="margin-top: 10px;">当前选中: {{ value }}</p>
      </div>
    `,
  }),
};

export const ClickableArea = {
  name: '点击区域',
  render: () => ({
    setup() {
      return {
        value: '1',
        handleChange(value) {
          console.log('单选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-radio-group 
          v-model="value" 
          clickable="area"
          @change="handleChange">
          <van-radio value="1" label="整个区域可点击"></van-radio>
          <van-radio value="2" label="整个区域可点击"></van-radio>
          <van-radio value="3" label="整个区域可点击"></van-radio>
        </van-radio-group>
        <p style="margin-top: 10px;">当前选中: {{ value }}</p>
      </div>
    `,
  }),
};

export const WithDataSource = {
  name: '数据源绑定',
  render: () => ({
    setup() {
      return {
        value: '1',
        dataSource: [
          { value: '1', text: '选项1' },
          { value: '2', text: '选项2' },
          { value: '3', text: '选项3' },
        ],
        handleChange(value) {
          console.log('单选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-radio-group 
          v-model="value" 
          :data-source="dataSource"
          value-field="value"
          text-field="text"
          @change="handleChange">
        </van-radio-group>
        <p style="margin-top: 10px;">当前选中: {{ value }}</p>
      </div>
    `,
  }),
};
