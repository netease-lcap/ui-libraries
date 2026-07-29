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
    methods: {
      focusSwitch() {
        this.$refs.mySwitch.focus();
      },
    },
    template: `
    <div>
      <el-button @click="focusSwitch">聚焦开关</el-button>
      <el-switch-pro ref="mySwitch" v-model="value" activeColor="red" activeValue="open" activeIconClass="el-icon-success" inactiveValue="close" inactiveIconClass="el-icon-error" activeText="开启" inactiveText="关闭"></el-switch-pro>
      {{ value }}
    </div>
    `,
  }),
  args: {
    activeValue: 'open',
    inactiveValue: 'close',
  },
};
