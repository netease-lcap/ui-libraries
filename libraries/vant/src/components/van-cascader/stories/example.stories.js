import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'van-cascader-examples',
  title: '组件列表/Cascader 级联选择器/示例',
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
      const comRef = ref();
      setTimeout(() => {
        console.log(comRef, 'comRef');
      }, 3000);
      return {
        args,
        value: ref([]),
        dataSource: async () => {
          // 将原有tree结构转换为list结构，并添加parentid字段
          return [
            { text: '浙江省', value: '330000', parentid: null },
            { text: '杭州市', value: '330100', parentid: '330000' },
            { text: '西湖区', value: '330106', parentid: '330100' },
            { text: '余杭区', value: '330110', parentid: '330100' },
            { text: '宁波市', value: '330200', parentid: '330000' },
            { text: '海曙区', value: '330203', parentid: '330200' },
            { text: '江北区', value: '330205', parentid: '330200' },
            { text: '江苏省', value: '320000', parentid: null },
            { text: '南京市', value: '320100', parentid: '320000' },
            { text: '玄武区', value: '320102', parentid: '320100' },
            { text: '秦淮区', value: '320104', parentid: '320100' },
            { text: '苏州市', value: '320500', parentid: '320000' },
            { text: '姑苏区', value: '320508', parentid: '320500' },
            { text: '吴中区', value: '320506', parentid: '320500' },
          ];
        },
        handleChange(value) {
          console.log('级联选择器值改变:', value);
        },
        handleExpand(value) {
          console.log('级联选择器展开:', value);
        },
        handleCollapse(value) {
          console.log('级联选择器收起:', value);
        },
        handleSelect(value) {
          console.log('级联选择器选择:', value);
        },
        handleUnselect(value) {
          console.log('级联选择器取消选择:', value);
        },
        handleClear(event) {
          console.log('级联选择器清空:', event);
        },
        handleSearch(value) {
          console.log('级联选择器搜索:', value);
        },
        handleLoad(node) {
          console.log('级联选择器加载:', node);
        },
        handleClick(event) {
          console.log('级联选择器点击:', event);
        },
        handleFocus(event) {
          console.log('级联选择器聚焦:', event);
        },
        handleBlur(event) {
          console.log('级联选择器失焦:', event);
        },
        comRef,
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-cascader 
          ref="comRef"
          v-model="value" 
          v-bind="args" 
          :dataSource="dataSource"
          valueField="value"
          textField="text"
          parentField="parentid"
          @blur="handleBlur">
        </van-cascader>
        <p style="margin-top: 10px;">当前选中: {{ value}}</p>
      </div>
    `,
  }),
  args: {
    placeholder: '请选择地区',
    clearable: false,
    disabled: false,
    readonly: false,
    filterable: false,
    multiple: false,
    checkStrictly: false,
    showAllLevels: true,
    separator: ' / ',
    maxLevel: 0,
    max: 0,
    lazy: false,
    showArrow: true,
    showTag: true,
    collapseTags: false,
    minCollapsedNum: 1,
  },
};

export const Clearable = {
  name: '可清空',
  render: () => ({
    setup() {
      return {
        value: ref('330100'),
        dataSource: [
          { text: '浙江省', value: '330000', children: [{ text: '杭州市', value: '330100' }] },
          { text: '江苏省', value: '320000', children: [{ text: '南京市', value: '320100' }] },
        ],

        handleChange(value) {
          console.log('级联选择器值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
          <van-cascader 
          placeholder="手动输入数据源"
          :dataSource="[
            { text: '浙江省', value: '330000', children: [{ text: '杭州市', value: '330100' }] },
            { text: '江苏省', value: '320000', children: [{ text: '南京市', value: '320100' }] },
          ]"
          v-dependencies.reload="[]" 
          valueField="" 
          textField="" parentField=""
          @change="handleChange">
        </van-cascader>
        <p style="margin-top: 10px;">当前选中: {{ value.join(' / ') }}</p>
      </div>
    `,
  }),
};

export const Filterable = {
  name: '可搜索',
  render: () => ({
    setup() {
      return {
        value: ref([]),
        dataSource: async () => {
          return [
            {
              text: '浙江省',
              value: '330000',
              children: [
                {
                  text: '杭州市',
                  value: '330100',
                  children: [
                    { text: '西湖区', value: '330106' },
                    { text: '余杭区', value: '330110' },
                  ],
                },
                {
                  text: '宁波市',
                  value: '330200',
                  children: [
                    { text: '海曙区', value: '330203' },
                    { text: '江北区', value: '330205' },
                  ],
                },
              ],
            },
            {
              text: '江苏省',
              value: '320000',
              children: [
                {
                  text: '南京市',
                  value: '320100',
                  children: [
                    { text: '玄武区', value: '320102' },
                    { text: '秦淮区', value: '320104' },
                  ],
                },
              ],
            },
          ];
        },
        handleChange(value) {
          console.log('级联选择器值改变:', value);
        },
        handleSearch(value) {
          console.log('级联选择器搜索:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-cascader 
          v-model="value" 
          filterable
          placeholder="请搜索地区"
          :dataSource="dataSource"
          value-field="value"
          text-field="text"
          children-field="children"
          @change="handleChange"
          @search="handleSearch">
        </van-cascader>
        <p style="margin-top: 10px;">当前选中: {{ value.join(' / ') }}</p>
      </div>
    `,
  }),
};

export const Multiple = {
  name: '多选',
  render: () => ({
    setup() {
      return {
        value: ref([]),
        dataSource: async () => {
          return [
            {
              text: '浙江省',
              value: '330000',
              children: [
                {
                  text: '杭州市',
                  value: '330100',
                  children: [
                    { text: '西湖区', value: '330106' },
                    { text: '余杭区', value: '330110' },
                  ],
                },
                {
                  text: '宁波市',
                  value: '330200',
                  children: [
                    { text: '海曙区', value: '330203' },
                    { text: '江北区', value: '330205' },
                  ],
                },
              ],
            },
          ];
        },
        handleChange(value) {
          console.log('级联选择器值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-cascader 
          v-model="value" 
          multiple
          placeholder="请选择多个地区"
          :dataSource="dataSource"
          value-field="value"
          text-field="text"
          children-field="children"
          @change="handleChange">
        </van-cascader>
        <p style="margin-top: 10px;">当前选中: {{ value.length }} 项</p>
      </div>
    `,
  }),
};

export const CheckStrictly = {
  name: '严格模式',
  render: () => ({
    setup() {
      return {
        value: ref([]),
        dataSource: async () => {
          return [
            {
              text: '浙江省',
              value: '330000',
              children: [
                {
                  text: '杭州市',
                  value: '330100',
                  children: [
                    { text: '西湖区', value: '330106' },
                    { text: '余杭区', value: '330110' },
                  ],
                },
              ],
            },
          ];
        },
        handleChange(value) {
          console.log('级联选择器值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-cascader 
          v-model="value" 
          check-strictly
          placeholder="请选择地区（严格模式）"
          :dataSource="dataSource"
          value-field="value"
          text-field="text"
          children-field="children"
          @change="handleChange">
        </van-cascader>
        <p style="margin-top: 10px;">当前选中: {{ value.join(' / ') }}</p>
        <p style="margin-top: 5px; color: #999;">严格模式下，父子节点不关联</p>
      </div>
    `,
  }),
};

export const CustomSeparator = {
  name: '自定义分隔符',
  render: () => ({
    setup() {
      return {
        value: ref(['330000', '330100', '330106']),
        dataSource: async () => {
          return [
            {
              text: '浙江省',
              value: '330000',
              children: [
                {
                  text: '杭州市',
                  value: '330100',
                  children: [
                    { text: '西湖区', value: '330106' },
                    { text: '余杭区', value: '330110' },
                  ],
                },
              ],
            },
          ];
        },
        handleChange(value) {
          console.log('级联选择器值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-cascader 
          v-model="value" 
          separator=" > "
          placeholder="请选择地区"
          :dataSource="dataSource"
          value-field="value"
          text-field="text"
          children-field="children"
          @change="handleChange">
        </van-cascader>
        <p style="margin-top: 10px;">当前选中: {{ value.join(' > ') }}</p>
      </div>
    `,
  }),
};

export const MaxLevel = {
  name: '最大层级',
  render: () => ({
    setup() {
      return {
        value: ref([]),
        dataSource: async () => {
          return [
            {
              text: '浙江省',
              value: '330000',
              children: [
                {
                  text: '杭州市',
                  value: '330100',
                  children: [
                    { text: '西湖区', value: '330106' },
                    { text: '余杭区', value: '330110' },
                  ],
                },
                {
                  text: '宁波市',
                  value: '330200',
                  children: [
                    { text: '海曙区', value: '330203' },
                    { text: '江北区', value: '330205' },
                  ],
                },
              ],
            },
          ];
        },
        handleChange(value) {
          console.log('级联选择器值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-cascader 
          v-model="value" 
          :max-level="2"
          placeholder="请选择地区（最多2级）"
          :dataSource="dataSource"
          value-field="value"
          text-field="text"
          children-field="children"
          @change="handleChange">
        </van-cascader>
        <p style="margin-top: 10px;">当前选中: {{ value.join(' / ') }}</p>
        <p style="margin-top: 5px; color: #999;">最多选择2级</p>
      </div>
    `,
  }),
};

export const MaxSelection = {
  name: '最大选中数量',
  render: () => ({
    setup() {
      return {
        value: ref([]),
        dataSource: async () => {
          return [
            {
              text: '浙江省',
              value: '330000',
              children: [
                {
                  text: '杭州市',
                  value: '330100',
                  children: [
                    { text: '西湖区', value: '330106' },
                    { text: '余杭区', value: '330110' },
                  ],
                },
                {
                  text: '宁波市',
                  value: '330200',
                  children: [
                    { text: '海曙区', value: '330203' },
                    { text: '江北区', value: '330205' },
                  ],
                },
              ],
            },
          ];
        },
        handleChange(value) {
          console.log('级联选择器值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-cascader 
          v-model="value" 
          multiple
          :max="3"
          placeholder="请选择地区（最多3个）"
          :dataSource="dataSource"
          value-field="value"
          text-field="text"
          children-field="children"
          @change="handleChange">
        </van-cascader>
        <p style="margin-top: 10px;">当前选中: {{ value.length }} 项（最多3项）</p>
      </div>
    `,
  }),
};

export const LazyLoad = {
  name: '懒加载',
  render: () => ({
    setup() {
      return {
        value: ref([]),
        dataSource: async () => {
          return [
            {
              text: '浙江省',
              value: '330000',
              leaf: false,
            },
            {
              text: '江苏省',
              value: '320000',
              leaf: false,
            },
          ];
        },
        handleChange(value) {
          console.log('级联选择器值改变:', value);
        },
        handleLoad(node, resolve) {
          const { level, value } = node;
          if (level === 0) {
            resolve([
              {
                text: '杭州市',
                value: '330100',
                leaf: false,
              },
              {
                text: '宁波市',
                value: '330200',
                leaf: false,
              },
            ]);
          } else if (level === 1) {
            resolve([
              {
                text: '西湖区',
                value: '330106',
                leaf: true,
              },
              {
                text: '余杭区',
                value: '330110',
                leaf: true,
              },
            ]);
          }
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-cascader 
          v-model="value" 
          lazy
          :lazy-load="handleLoad"
          placeholder="请选择地区（懒加载）"
          :dataSource="dataSource"
          value-field="value"
          text-field="text"
          children-field="children"
          @change="handleChange">
        </van-cascader>
        <p style="margin-top: 10px;">当前选中: {{ value.join(' / ') }}</p>
        <p style="margin-top: 5px; color: #999;">懒加载模式，点击节点时加载子节点</p>
      </div>
    `,
  }),
};

export const Disabled = {
  name: '禁用状态',
  render: () => ({
    setup() {
      return {
        value: ref(['330000', '330100', '330106']),
        dataSource: async () => {
          return [
            {
              text: '浙江省',
              value: '330000',
              children: [
                {
                  text: '杭州市',
                  value: '330100',
                  children: [
                    { text: '西湖区', value: '330106' },
                    { text: '余杭区', value: '330110', disabled: true },
                  ],
                },
              ],
            },
          ];
        },
        handleChange(value) {
          console.log('级联选择器值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-cascader 
          v-model="value" 
          disabled
          placeholder="禁用状态"
          :dataSource="dataSource"
          value-field="value"
          text-field="text"
          children-field="children"
          @change="handleChange">
        </van-cascader>
        <p style="margin-top: 10px;">当前选中: {{ value.join(' / ') }}</p>
      </div>
    `,
  }),
};

export const Readonly = {
  name: '只读状态',
  render: () => ({
    setup() {
      return {
        value: ref(['330000', '330100', '330106']),
        dataSource: async () => {
          return [
            {
              text: '浙江省',
              value: '330000',
              children: [
                {
                  text: '杭州市',
                  value: '330100',
                  children: [
                    { text: '西湖区', value: '330106' },
                    { text: '余杭区', value: '330110' },
                  ],
                },
              ],
            },
          ];
        },
        handleChange(value) {
          console.log('级联选择器值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-cascader 
          v-model="value" 
          readonly
          placeholder="只读状态"
          :dataSource="dataSource"
          value-field="value"
          text-field="text"
          children-field="children"
          @change="handleChange">
        </van-cascader>
        <p style="margin-top: 10px;">当前选中: {{ value.join(' / ') }}</p>
      </div>
    `,
  }),
};
