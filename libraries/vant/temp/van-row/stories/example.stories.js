export default {
  title: 'VanRow/栅格布局',
  component: () => import('../index.ts'),
  argTypes: {
    justify: {
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'space-around', 'space-between'],
      description: '横轴对齐',
    },
    align: {
      control: { type: 'select' },
      options: ['top', 'middle', 'bottom'],
      description: '纵轴对齐',
    },
    gutter: {
      control: { type: 'number' },
      description: '列间隔',
    },
  },
};

const Template = (args) => ({
  props: Object.keys(args),
  template: `
    <van-row v-bind="$props">
      <van-col :span="6">
        <div style="background: #1989fa; color: white; text-align: center; padding: 16px; border-radius: 4px; margin-bottom: 8px;">span:6</div>
      </van-col>
      <van-col :span="6">
        <div style="background: #07c160; color: white; text-align: center; padding: 16px; border-radius: 4px; margin-bottom: 8px;">span:6</div>
      </van-col>
      <van-col :span="6">
        <div style="background: #ff976a; color: white; text-align: center; padding: 16px; border-radius: 4px; margin-bottom: 8px;">span:6</div>
      </van-col>
      <van-col :span="6">
        <div style="background: #f2637b; color: white; text-align: center; padding: 16px; border-radius: 4px; margin-bottom: 8px;">span:6</div>
      </van-col>
    </van-row>
  `,
});

export const Default = Template.bind({});
Default.args = {
  justify: 'start',
  align: 'top',
  gutter: 0,
};

export const WithGutter = Template.bind({});
WithGutter.args = {
  ...Default.args,
  gutter: 20,
};

export const Center = Template.bind({});
Center.args = {
  ...Default.args,
  justify: 'center',
};

export const SpaceBetween = Template.bind({});
SpaceBetween.args = {
  ...Default.args,
  justify: 'space-between',
};

export const Responsive = {
  name: '响应式布局',
  render: () => ({
    template: `
      <van-row :gutter="10">
        <van-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div style="background: #1989fa; color: white; text-align: center; padding: 16px; border-radius: 4px; margin-bottom: 8px;">响应式</div>
        </van-col>
        <van-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          <div style="background: #07c160; color: white; text-align: center; padding: 16px; border-radius: 4px; margin-bottom: 8px;">响应式</div>
        </van-col>
        <van-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          <div style="background: #ff976a; color: white; text-align: center; padding: 16px; border-radius: 4px; margin-bottom: 8px;">响应式</div>
        </van-col>
        <van-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div style="background: #f2637b; color: white; text-align: center; padding: 16px; border-radius: 4px; margin-bottom: 8px;">响应式</div>
        </van-col>
      </van-row>
    `,
  }),
}; 