export default {
  title: 'VanIframe/Iframe',
  component: () => import('../index.tsx'),
  argTypes: {
    src: {
      control: { type: 'text' },
      description: '需要嵌入的网页地址',
    },
  },
};

const Template = (args) => ({
  props: Object.keys(args),
  template: `
    <van-iframe v-bind="$props" style="width: 100%; height: 400px; border: 1px solid #ddd; border-radius: 4px;"></van-iframe>
  `,
});

export const Default = Template.bind({});
Default.args = {
  src: 'https://vant-ui.github.io/vant/#/zh-CN/',
};

export const Example = {
  name: '示例页面',
  render: () => ({
    template: `
      <div style="padding: 20px;">
        <h3 style="margin: 0 0 16px 0; color: #333;">Iframe 组件示例</h3>
        <van-iframe 
          src="https://vant-ui.github.io/vant/#/zh-CN/" 
          style="width: 100%; height: 500px; border: 1px solid #e5e5e5; border-radius: 8px;"
          @load="onLoad"
        ></van-iframe>
      </div>
    `,
    methods: {
      onLoad() {
        console.log('Iframe loaded');
      },
    },
  }),
}; 