import { ref, reactive } from 'vue';
import Component from '../index';

export default {
  id: 'el-tree-select-examples',
  title: '组件列表/TreeSelect 树形选择/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

/* 基础用法 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    setup() {
      const value = ref('ttt');
      const data = [
        {
          value: '1',
          label: 'Level one 1',
          children: [
            {
              value: '1-1',
              label: 'Level two 1-1',
              children: [
                {
                  value: '1-1-1',
                  label: 'Level three 1-1-1',
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: 'Level one 2',
          children: [
            {
              value: '2-1',
              label: 'Level two 2-1',
              children: [
                {
                  value: '2-1-1',
                  label: 'Level three 2-1-1',
                },
              ],
            },
            {
              value: '2-2',
              label: 'Level two 2-2',
              children: [
                {
                  value: '2-2-1',
                  label: 'Level three 2-2-1',
                },
              ],
            },
          ],
        },
      ];

      const state = reactive({
        data: [],
      });
      const dataSource = () => new Promise((res) => {
          setTimeout(() => {
            state.data = [
              {
                lCAPDepartment: {
                  id: 3150684874215168,
                  createdTime: '2025-06-15T07:33:03.000Z',
                  updatedTime: '2025-06-15T07:33:03.000Z',
                  createdBy: 'DEVACC-permissionvue3',
                  updatedBy: 'DEVACC-permissionvue3',
                  name: '根部门',
                  deptId: '根部门',
                  parentDeptId: '__vue_devtool_undefined__',
                },
              },

              {
                lCAPDepartment: {
                  id: 3151333764914944,
                  createdTime: '2025-06-16T05:33:13.000Z',
                  updatedTime: '2025-06-16T05:33:13.000Z',
                  createdBy: 'DEVACC-permissionvue3',
                  updatedBy: 'DEVACC-permissionvue3',
                  name: 'test',
                  deptId: 'test',
                  parentDeptId: '根部门',
                },
              },
              {
                lCAPDepartment: {
                  id: 3151340777463552,
                  createdTime: '2025-06-16T05:47:29.000Z',
                  updatedTime: '2025-06-16T05:47:29.000Z',
                  createdBy: 'DEVACC-permissionvue3',
                  updatedBy: 'DEVACC-permissionvue3',
                  name: 'hhh',
                  deptId: 'hhh',
                  parentDeptId: 'test',
                },
              },
              {
                lCAPDepartment: {
                  id: 3151381032042240,
                  createdTime: '2025-06-16T07:09:23.000Z',
                  updatedTime: '2025-06-16T07:09:23.000Z',
                  createdBy: 'DEVACC-permissionvue3',
                  updatedBy: 'DEVACC-permissionvue3',
                  name: 'testggg',
                  deptId: 'ttt',
                  parentDeptId: '根部门',
                },
              },
              {
                lCAPDepartment: {
                  id: 3151385740492544,
                  createdTime: '2025-06-16T07:18:58.000Z',
                  updatedTime: '2025-06-16T07:18:58.000Z',
                  createdBy: 'DEVACC-permissionvue3',
                  updatedBy: 'DEVACC-permissionvue3',
                  name: 'ttttt',
                  deptId: 'tttttt',
                  parentDeptId: '根部门',
                },
              },
              {
                lCAPDepartment: {
                  id: 3151392321216256,
                  createdTime: '2025-06-16T07:32:21.000Z',
                  updatedTime: '2025-06-16T07:32:21.000Z',
                  createdBy: 'DEVACC-permissionvue3',
                  updatedBy: 'DEVACC-permissionvue3',
                  name: '刚刚',
                  deptId: '刚刚',
                  parentDeptId: '根部门',
                },
              },
              {
                lCAPDepartment: {
                  id: 3156206936421120,
                  createdTime: '2025-06-23T02:47:43.000Z',
                  updatedTime: '2025-06-23T02:47:43.000Z',
                  createdBy: '__vue_devtool_undefined__',
                  updatedBy: '__vue_devtool_undefined__',
                  name: 'testgahah',
                  deptId: 'hahahah',
                  parentDeptId: '根部门',
                },
              },
              {
                lCAPDepartment: {
                  id: 3157111747207168,
                  createdTime: '2025-06-24T09:28:34.000Z',
                  updatedTime: '2025-06-24T09:28:34.000Z',
                  createdBy: '__vue_devtool_undefined__',
                  updatedBy: '__vue_devtool_undefined__',
                  name: 'tesss',
                  deptId: 'ssssaa',
                  parentDeptId: 'test',
                },
              },
              {
                lCAPDepartment: {
                  id: 3157111839588352,
                  createdTime: '2025-06-24T09:28:45.000Z',
                  updatedTime: '2025-06-24T09:28:45.000Z',
                  createdBy: '__vue_devtool_undefined__',
                  updatedBy: '__vue_devtool_undefined__',
                  name: 'gagh',
                  deptId: 'hahajjjj',
                  parentDeptId: 'ssssaa',
                },
              },
              {
                lCAPDepartment: {
                  id: 3159206957522176,
                  createdTime: '2025-06-27T08:31:17.000Z',
                  updatedTime: '2025-06-27T08:31:17.000Z',
                  createdBy: 'DEVACC-permissionvue3',
                  updatedBy: 'DEVACC-permissionvue3',
                  name: '搜噶搜噶',
                  deptId: '嘎嘎',
                  parentDeptId: '根部门',
                },
              },
              {
                lCAPDepartment: {
                  id: 3159213096967424,
                  createdTime: '2025-06-27T08:43:46.000Z',
                  updatedTime: '2025-06-27T08:43:46.000Z',
                  createdBy: 'DEVACC-permissionvue3',
                  updatedBy: 'DEVACC-permissionvue3',
                  name: '嘎嘎哈哈哈',
                  deptId: '嘎嘎哈哈哈',
                  parentDeptId: '根部门',
                },
              },
            ];
          }, 3000);
        });
      dataSource();
      const defaultProps = {
        children: 'children',
        label: 'label',
        value: 'value',
      };
      return { value, data, defaultProps, dataSource, state };
    },
    template: `
    <div>
    {{ value }}
      <el-form-tree-select
        :placeholder="12"
        v-model:modelValue="value"
        valueField="lCAPDepartment.deptId"
        textField="lCAPDepartment.name"
        parentField="lCAPDepartment.parentDeptId"
        :dataSource="state.data"
        
        placeholder="请选择"
        style="width: 240px"
      >
        <template #label >
        <div>123</div>
         </template>
      </el-form-tree-select>
    </div>
    `,
  }),
};

/* 多选 */
export const Example2 = {
  name: '多选',
  render: () => ({
    setup() {
      const value = ref([]);
      const data = [
        {
          value: '1',
          label: 'Level one 1',
          children: [
            {
              value: '1-1',
              label: 'Level two 1-1',
              children: [
                {
                  value: '1-1-1',
                  label: 'Level three 1-1-1',
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: 'Level one 2',
          children: [
            {
              value: '2-1',
              label: 'Level two 2-1',
              children: [
                {
                  value: '2-1-1',
                  label: 'Level three 2-1-1',
                },
              ],
            },
            {
              value: '2-2',
              label: 'Level two 2-2',
              children: [
                {
                  value: '2-2-1',
                  label: 'Level three 2-2-1',
                },
              ],
            },
          ],
        },
      ];
      const defaultProps = {
        children: 'children',
        label: 'label',
        value: 'value',
      };
      return { value, data, defaultProps };
    },
    template: `
    <div>
      <el-form-tree-select
        v-model="value"
        :data="data"
        show-checkbox	
        :props="defaultProps"
        :render-after-expand="false"
        node-key="value"
        multiple
        placeholder="请选择"
        style="width: 240px"
      />
    </div>
    `,
  }),
};

/* 显示复选框 */
export const Example3 = {
  name: '显示复选框',
  render: () => ({
    setup() {
      const value = ref([]);
      const data = [
        {
          value: '1',
          label: 'Level one 1',
          children: [
            {
              value: '1-1',
              label: 'Level two 1-1',
              children: [
                {
                  value: '1-1-1',
                  label: 'Level three 1-1-1',
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: 'Level one 2',
          children: [
            {
              value: '2-1',
              label: 'Level two 2-1',
              children: [
                {
                  value: '2-1-1',
                  label: 'Level three 2-1-1',
                },
              ],
            },
            {
              value: '2-2',
              label: 'Level two 2-2',
              children: [
                {
                  value: '2-2-1',
                  label: 'Level three 2-2-1',
                },
              ],
            },
          ],
        },
      ];
      const defaultProps = {
        children: 'children',
        label: 'label',
        value: 'value',
      };
      return { value, data, defaultProps };
    },
    template: `
    <div>
      <el-tree-select
        v-model="value"
        :data="data"
        :props="defaultProps"
        :render-after-expand="false"
        node-key="value"
        show-checkbox
        multiple
        placeholder="请选择"
        style="width: 240px"
      />
    </div>
    `,
  }),
};
