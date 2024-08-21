import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';

export default {
  id: 'el-steps-examples',
  title: '组件列表/STEPS 步骤条/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  简单的步骤条。 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  每一步骤显示出该步骤的状态。 */
export const Example2 = {
  name: '含状态步骤条',
  render: () => ({
    template: `<div><el-steps :space="200" :active="1" finish-status="success">
  <el-step title="已完成"></el-step>
  <el-step title="进行中"></el-step>
  <el-step title="步骤 3"></el-step>
</el-steps></div>`,
  }),
};

/*  每个步骤有其对应的步骤状态描述。 */
export const Example3 = {
  name: '有描述的步骤条',
  render: () => ({
    template: `<div><el-steps :active="1">
  <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤 3" description="这段就没那么长了"></el-step>
</el-steps></div>`,
  }),
};

/*  标题和描述都将居中。 */
export const Example4 = {
  name: '居中的步骤条',
  render: () => ({
    template: `<div><el-steps :active="2" align-center>
  <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
</el-steps></div>`,
  }),
};

/*  步骤条内可以启用各种自定义的图标。 */
export const Example5 = {
  name: '带图标的步骤条',
  render: () => ({
    template: `<div><el-steps :active="1">
  <el-step title="步骤 1" icon="edit"></el-step>
  <el-step title="步骤 2" icon="el-icon-upload">
    <el-icon slot="icon" name="upload" />
  </el-step>
  <el-step title="步骤 3" icon="el-icon-picture"></el-step>
</el-steps></div>`,
  }),
};

/*  竖直方向的步骤条。 */
export const Example6 = {
  name: '竖式步骤条',
  render: () => ({
    template: `<div><div style="height: 300px;">
  <el-steps direction="vertical" :active="1">
    <el-step title="步骤 1"></el-step>
    <el-step title="步骤 2"></el-step>
    <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
  </el-steps>
</div></div>`,
  }),
};

/*  设置 `simple` 可应用简洁风格，该条件下 `align-center` / `description` / `direction` / `space` 都将失效。 */
export const Example7 = {
  name: '简洁风格的步骤条',
  render: () => ({
    template: `<div><el-steps :active="1" simple>
  <el-step title="步骤 1" icon="el-icon-edit"></el-step>
  <el-step title="步骤 2" icon="el-icon-upload"></el-step>
  <el-step title="步骤 3" icon="el-icon-picture"></el-step>
</el-steps>

<el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
  <el-step title="步骤 1" ></el-step>
  <el-step title="步骤 2" ></el-step>
  <el-step title="步骤 3" ></el-step>
</el-steps></div>`,
  }),
};

export const Example8 = {
  name: '数据源',
  render: () => ({
    data() {
      return {
        dataSource: () => [{
          label: '步骤一',
          value: '1',
        }, {
          label: '步骤二',
          value: '2',
        }, {
          label: '步骤三',
          value: '3',
        }],
      };
    },
    template: '<el-steps active="2" simple :dataSource="dataSource" nameField="value"><template #title="{ item }"><el-text :text="item.label" /></template></el-steps>',
  }),
};
