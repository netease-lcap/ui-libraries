import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'van-checkbox-examples',
  title: '组件列表/Checkbox 复选框/示例',
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
      const reff = ref('');
      setTimeout(() => {
        console.log(reff.value.reload(),'ff');
      }, 1000);
      return {
        args,
        checked: ref(false),
        handleChange(value) {
          console.log('复选框值改变:', value);
        },
        handleClick(event) {
          console.log('复选框点击:', event);
        },
        reff,
        dataSource: async () => {
          console.log('reload');
          return [
            { value: '1', text: '选项1' },
            { value: '2', text: '选项2' },
            { value: '3', text: '选项3' },
          ];
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-checkbox-group 
          v-bind="args"
          ref='reff'
          :dataSource="dataSource"
          @change="handleChange"
          @click="handleClick">
        </van-checkbox-group>
        <p style="margin-top: 10px;">当前状态: {{ checked ? '选中' : '未选中' }}</p>
      </div>
    `,
  }),
  args: {
    label: '复选框',
    disabled: false,
    readonly: false,
    iconPosition: 'left',
    shape: 'square',
    checkedColor: '#1989fa',
    uncheckedColor: '#dcdee0',
    iconSize: 20,
    labelSize: 14,
    labelColor: '#323233',
    labelDisabledColor: '#c8c9cc',
    clickable: 'icon',
    allowUncheck: false,
  },
};

export const CheckboxGroup = {
  name: '复选框组',
  render: () => ({
    setup() {
      const checkedValues = ref(['1']);
      const dataSource = async () => {
        return [
          { value: '1', text: '选项1' },
          { value: '2', text: '选项2' },
          { value: '3', text: '选项3' },
        ];
      };
      return {
        checkedValues,
        dataSource,
        handleChange(value) {
          console.log('复选框组值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-checkbox-group 
          v-model="checkedValues" 
          :dataSource="dataSource"
          value-field="value"
          text-field="text"
          @change="handleChange">
        </van-checkbox-group>
        <p style="margin-top: 10px;">当前选中: {{ checkedValues.join(', ') }}</p>
      </div>
    `,
  }),
};

export const CustomShape = {
  name: '自定义形状',
  render: () => ({
    setup() {
      return {
        checked1: ref(false),
        checked2: ref(false),
        handleChange(value) {
          console.log('复选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-checkbox 
          v-model="checked1" 
          shape="square" 
          label="方形复选框"
          @change="handleChange">
        </van-checkbox>
        <br>
        <van-checkbox 
          v-model="checked2" 
          shape="round" 
          label="圆形复选框"
          @change="handleChange">
        </van-checkbox>
      </div>
    `,
  }),
};

export const IconPosition = {
  name: '图标位置',
  render: () => ({
    setup() {
      return {
        checked1: ref(false),
        checked2: ref(false),
        handleChange(value) {
          console.log('复选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-checkbox 
          v-model="checked1" 
          icon-position="left" 
          label="左侧图标"
          @change="handleChange">
        </van-checkbox>
        <br>
        <van-checkbox 
          v-model="checked2" 
          icon-position="right" 
          label="右侧图标"
          @change="handleChange">
        </van-checkbox>
      </div>
    `,
  }),
};

export const CustomColor = {
  name: '自定义颜色',
  render: () => ({
    setup() {
      return {
        checked1: ref(false),
        checked2: ref(false),
        checked3: ref(false),
        handleChange(value) {
          console.log('复选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-checkbox 
          v-model="checked1" 
          checked-color="#07c160" 
          label="绿色主题"
          @change="handleChange">
        </van-checkbox>
        <br>
        <van-checkbox 
          v-model="checked2" 
          checked-color="#ff976a" 
          label="橙色主题"
          @change="handleChange">
        </van-checkbox>
        <br>
        <van-checkbox 
          v-model="checked3" 
          checked-color="#ee0a24" 
          label="红色主题"
          @change="handleChange">
        </van-checkbox>
      </div>
    `,
  }),
};

export const Disabled = {
  name: '禁用状态',
  render: () => ({
    setup() {
      return {
        checked1: ref(true),
        checked2: ref(false),
        handleChange(value) {
          console.log('复选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-checkbox 
          v-model="checked1" 
          disabled 
          label="禁用且选中"
          @change="handleChange">
        </van-checkbox>
        <br>
        <van-checkbox 
          v-model="checked2" 
          disabled 
          label="禁用且未选中"
          @change="handleChange">
        </van-checkbox>
      </div>
    `,
  }),
};

export const Readonly = {
  name: '只读状态',
  render: () => ({
    setup() {
      return {
        checked1: ref(true),
        checked2: ref(false),
        handleChange(value) {
          console.log('复选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-checkbox 
          v-model="checked1" 
          readonly 
          label="只读且选中"
          @change="handleChange">
        </van-checkbox>
        <br>
        <van-checkbox 
          v-model="checked2" 
          readonly 
          label="只读且未选中"
          @change="handleChange">
        </van-checkbox>
      </div>
    `,
  }),
};

export const ClickableArea = {
  name: '点击区域',
  render: () => ({
    setup() {
      return {
        checked1: ref(false),
        checked2: ref(false),
        handleChange(value) {
          console.log('复选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-checkbox 
          v-model="checked1" 
          clickable="icon" 
          label="仅图标可点击"
          @change="handleChange">
        </van-checkbox>
        <br>
        <van-checkbox 
          v-model="checked2" 
          clickable="area" 
          label="整个区域可点击"
          @change="handleChange">
        </van-checkbox>
      </div>
    `,
  }),
};

export const AllowUncheck = {
  name: '允许取消选择',
  render: () => ({
    setup() {
      return {
        checked1: ref(true),
        checked2: ref(true),
        handleChange(value) {
          console.log('复选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-checkbox 
          v-model="checked1" 
          allow-uncheck 
          label="允许取消选择"
          @change="handleChange">
        </van-checkbox>
        <br>
        <van-checkbox 
          v-model="checked2" 
          label="不允许取消选择"
          @change="handleChange">
        </van-checkbox>
      </div>
    `,
  }),
};

export const CustomSize = {
  name: '自定义尺寸',
  render: () => ({
    setup() {
      return {
        checked1: ref(false),
        checked2: ref(false),
        checked3: ref(false),
        handleChange(value) {
          console.log('复选框值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-checkbox 
          v-model="checked1" 
          :icon-size="16" 
          :label-size="12" 
          label="小尺寸"
          @change="handleChange">
        </van-checkbox>
        <br>
        <van-checkbox 
          v-model="checked2" 
          :icon-size="20" 
          :label-size="14" 
          label="默认尺寸"
          @change="handleChange">
        </van-checkbox>
        <br>
        <van-checkbox 
          v-model="checked3" 
          :icon-size="24" 
          :label-size="16" 
          label="大尺寸"
          @change="handleChange">
        </van-checkbox>
      </div>
    `,
  }),
};

export const Direction = {
  name: '排列方向',
  render: () => ({
    setup() {
      const checkedValues1 = ref(['1']);
      const checkedValues2 = ref(['1']);
      const dataSource = async () => {
        return [
          { value: '1', text: '选项1' },
          { value: '2', text: '选项2' },
          { value: '3', text: '选项3' },
        ];
      };
      return {
        checkedValues1,
        checkedValues2,
        dataSource,
        handleChange(value) {
          console.log('复选框组值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <h4>水平排列</h4>
        <van-checkbox-group 
          v-model="checkedValues1" 
          direction="horizontal"
          :dataSource="dataSource"
          value-field="value"
          text-field="text"
          @change="handleChange">
        </van-checkbox-group>
        
        <h4 style="margin-top: 20px;">垂直排列</h4>
        <van-checkbox-group 
          v-model="checkedValues2" 
          direction="vertical"
          :dataSource="dataSource"
          value-field="value"
          text-field="text"
          @change="handleChange">
        </van-checkbox-group>
      </div>
    `,
  }),
};

export const ListExample = {
  name: '列表示例',
  render: () => ({
    setup() {
      const checkedValues = ref(['1']);
      const items = ref([
        { id: 1, name: '商品1', price: '¥99.00' },
        { id: 2, name: '商品2', price: '¥199.00' },
        { id: 3, name: '商品3', price: '¥299.00' },
      ]);
      return {
        checkedValues,
        items,
        handleChange(value) {
          console.log('复选框组值改变:', value);
        },
        handleSelectAll() {
          if (checkedValues.value.length === items.value.length) {
            checkedValues.value = [];
          } else {
            checkedValues.value = items.value.map((item) => item.id.toString());
          }
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-checkbox 
          :model-value="checkedValues.length === items.length"
          @change="handleSelectAll"
          label="全选">
        </van-checkbox>
        <hr style="margin: 10px 0;">
        <van-checkbox-group 
          v-model="checkedValues" 
          @change="handleChange">
          <van-checkbox 
            v-for="item in items" 
            :key="item.id"
            :value="item.id.toString()" 
            :label="item.name + ' - ' + item.price">
          </van-checkbox>
        </van-checkbox-group>
        <p style="margin-top: 10px;">已选择 {{ checkedValues.length }} 项</p>
      </div>
    `,
  }),
};
