import Component from '../index';

export default {
  id: 'el-descriptions-examples',
  title: '组件列表/descriptions 描述列表/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    template: `<el-descriptions title="User Info" >
    <el-descriptions-item style="color: red;" label-width="100px"      class-name="my-descriptions"     :rowspan="1"
  label-align="right"
>
    <template #label>
    <el-text size="small">Username1</el-text>
    </template>
    <template #default>
    <el-text size="small">kooriookami</el-text>
    </template>
    </el-descriptions-item>
      <el-descriptions-item style="color: red;" label-width="100px"           :rowspan="2"
  label-align="right"
>
    <template #label>
    <el-text size="small">Username1</el-text>
    </template>
    <template #default>
    <el-text size="small">kooriookami</el-text>
    </template>
    </el-descriptions-item>
        <el-descriptions-item style="color: red;" label-width="100px"           :rowspan="1"
  label-align="right"
>
    <template #label>
    <el-text size="small">Username1</el-text>
    </template>
    <template #default>
    <el-text size="small">kooriookami</el-text>
    </template>
    </el-descriptions-item>
        <el-descriptions-item style="color: red;" label-width="100px"           :rowspan="1"
  label-align="right"
>
    <template #label>
    <el-text size="small">Username1</el-text>
    </template>
    <template #default>
    <el-text size="small">kooriookami</el-text>
    </template>
    </el-descriptions-item>
        <el-descriptions-item style="color: red;" label-width="100px"           :rowspan="1"
  label-align="right"
>
    <template #label>
    <el-text size="small">Username1</el-text>
    </template>
    <template #default>
    <el-text size="small">kooriookami</el-text>
    </template>
    </el-descriptions-item>

  </el-descriptions>`,
  }),
};
