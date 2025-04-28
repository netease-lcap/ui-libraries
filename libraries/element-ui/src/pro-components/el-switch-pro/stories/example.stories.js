import ElSwitchPro from '../index';

export default {
  id: 'el-switch-pro-examples',
  title: 'Pro组件列表/Switch 开关/示例',
  component: ElSwitchPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    data: () => ({
      value: 'open',
    }),
    template: `
    <div>
      <el-switch-pro v-model="value" activeColor="red" activeValue="open" activeIconClass="el-icon-success" inactiveValue="close" inactiveIconClass="el-icon-error" activeText="开启" inactiveText="关闭"></el-switch-pro>
      {{ value }}
    </div>
    `,
  }),
  args: {
    activeValue: 'open',
    inactiveValue: 'close',
  },
};
