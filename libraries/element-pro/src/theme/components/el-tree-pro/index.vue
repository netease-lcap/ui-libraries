<template>
  <div>
    <div style="font-size: 14px; display: flex">
      <div>
        是否多选：<el-switch-pro v-model="checkable" @change="!checkable"></el-switch-pro>
      </div>
      <div style="margin: 0 25px">
        是否有 hover 态：<el-switch-pro v-model="hover" @change="!hover"></el-switch-pro>
      </div>
      <div>
        是否禁用：<el-switch-pro v-model="disabled" @change="!disabled"></el-switch-pro>
      </div>
      <div style="margin: 0 25px">
        是否显示连线：<el-switch-pro v-model="line" @change="!line"></el-switch-pro>
      </div>
      <div>
        是否可拖拽节点：<el-switch-pro v-model="draggable" @change="!draggable"></el-switch-pro>
      </div>
      <div style="margin: 0 25px">
        是否置空数据：<el-switch-pro v-model="isEmptyData" @change="!isEmptyData"></el-switch-pro>
      </div>
    </div>

    <el-tree-pro 
      :value.sync="value" 
      :checkable="checkable" 
      :hover="hover" 
      :disabled="disabled" 
      :disableCheck="disableCheck"
      :line="line"
      :draggable="draggable"
      :expand-on-click-node="false" 
      :valueMode="valueMode" 
      :data-source="isEmptyData ? [] : items" 
      value-field="value" 
      text-field="label"
      children-field="children" 
      parent-field="parent" 
      @click="handleClick" />
  </div>
</template>
<script>
// 注意这个示例，同步属性的赋值方式与 vue3 api 不同
export default {
  data() {
    return {
      valueMode: 'parentFirst', // onlyLeaf/parentFirst/all
      value: undefined,
      checkable: false,
      hover: false,
      disabled: false,
      line: false,
      isEmptyData: false,
      disableCheck: false,
      draggable: false,
      items: [
        {
          value: '1',
          label: '1',
          children: [
            {
              value: '1.1',
              label: '1.1',
              children: [
                {
                  value: '1.1.1',
                  label: '1.1.1',
                  children: [
                    {
                      value: '1.1.1.1',
                      label: '1.1.1.1',
                    },
                    {
                      value: '1.1.1.2',
                      label: '1.1.1.2',
                    },
                  ],
                },
                {
                  value: '1.1.2',
                  label: '1.1.2',
                  children: [
                    {
                      value: '1.1.2.1',
                      label: '1.1.2.1',
                    },
                    {
                      value: '1.1.2.2',
                      label: '1.1.2.2',
                    },
                  ],
                },
              ],
            },
            {
              value: '1.2',
              label: '1.2',
              children: [
                {
                  value: '1.2.1',
                  label: '1.2.1',
                  children: [
                    {
                      value: '1.2.1.1',
                      label: '1.2.1.1',
                    },
                    {
                      value: '1.2.1.2',
                      label: '1.2.1.2',
                    },
                  ],
                },
                {
                  value: '1.2.2',
                  label: '1.2.2',
                  children: [
                    {
                      value: '1.2.2.1',
                      label: '1.2.2.1',
                    },
                    {
                      value: '1.2.2.2',
                      label: '1.2.2.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: '2',
          children: [
            {
              value: '2.1',
              label: '2.1',
            },
            {
              value: '2.2',
              label: '2.2',
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleClick(data) {
      console.log('click', data);
    },
  },
};
</script>
