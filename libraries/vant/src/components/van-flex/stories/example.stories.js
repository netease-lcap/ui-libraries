export default {
  title: 'VanFlex/线性布局',
  component: () => import('../index.ts'),
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['block', 'flex'],
      description: '布局模式',
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: '主轴方向',
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'space-between', 'space-around'],
      description: '横轴对齐',
    },
    alignment: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'baseline', 'stretch'],
      description: '纵轴对齐',
    },
    wrap: {
      control: { type: 'boolean' },
      description: '换行',
    },
    gutter: {
      control: { type: 'number' },
      description: '内容间隙',
    },
  },
};

const Template = (args) => ({
  props: Object.keys(args),
  template: `
    <van-flex v-bind="$props">
      <div style="width: 100px; height: 60px; background: #1989fa; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">1</div>
      <div style="width: 100px; height: 60px; background: #07c160; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">2</div>
      <div style="width: 100px; height: 60px; background: #ff976a; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">3</div>
    </van-flex>
  `,
});

export const Default = Template.bind({});
Default.args = {
  mode: 'flex',
  direction: 'horizontal',
  justify: 'start',
  alignment: 'start',
  wrap: true,
  gutter: 12,
};

export const Vertical = Template.bind({});
Vertical.args = {
  ...Default.args,
  direction: 'vertical',
};

export const Center = Template.bind({});
Center.args = {
  ...Default.args,
  justify: 'center',
  alignment: 'center',
};

export const SpaceBetween = Template.bind({});
SpaceBetween.args = {
  ...Default.args,
  justify: 'space-between',
};

export const Block = Template.bind({});
Block.args = {
  ...Default.args,
  mode: 'block',
};