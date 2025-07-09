import Component from '../index';

export default {
  id: 'van-circle-examples',
  title: '组件列表/Circle 环形进度条/示例',
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
      return {
        args,
      };
    },
    template: `
      <van-circle v-bind="args" />
    `,
  }),
  args: {
    value: 30,
    rate: 100,
    size: '100px',
    strokeWidth: 40,
    color: '#337eff',
    layerColor: '#E5E5E5',
    fill: '#ffffff',
    text: '30%',
    speed: 0,
    clockwise: true,
    strokeLinecap: 'round',
    showText: true,
  },
};

export const DifferentValues = {
  name: '不同进度值',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-circle value="0" text="0%" />
        <van-circle value="25" text="25%" />
        <van-circle value="50" text="50%" />
        <van-circle value="75" text="75%" />
        <van-circle value="100" text="100%" />
      </div>
    `,
  }),
};

export const DifferentSizes = {
  name: '不同尺寸',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <van-circle value="30" size="60px" text="30%" />
        <van-circle value="30" size="100px" text="30%" />
        <van-circle value="30" size="150px" text="30%" />
        <van-circle value="30" size="200px" text="30%" />
      </div>
    `,
  }),
};

export const DifferentColors = {
  name: '不同颜色',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-circle value="30" color="#1989fa" text="30%" />
        <van-circle value="30" color="#07c160" text="30%" />
        <van-circle value="30" color="#ee0a24" text="30%" />
        <van-circle value="30" color="#ff976a" text="30%" />
        <van-circle value="30" color="#7232dd" text="30%" />
      </div>
    `,
  }),
};

export const DifferentStrokeWidths = {
  name: '不同线条宽度',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-circle value="30" stroke-width="20" text="30%" />
        <van-circle value="30" stroke-width="40" text="30%" />
        <van-circle value="30" stroke-width="60" text="30%" />
        <van-circle value="30" stroke-width="80" text="30%" />
      </div>
    `,
  }),
};

export const Animation = {
  name: '动画效果',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-circle value="30" speed="100" text="30%" />
        <van-circle value="60" speed="200" text="60%" />
        <van-circle value="90" speed="300" text="90%" />
      </div>
    `,
  }),
};

export const Direction = {
  name: '方向控制',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-circle value="30" clockwise text="顺时针" />
        <van-circle value="30" :clockwise="false" text="逆时针" />
      </div>
    `,
  }),
};

export const StrokeLinecap = {
  name: '线条端点样式',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-circle value="30" stroke-linecap="butt" text="默认" />
        <van-circle value="30" stroke-linecap="round" text="圆形" />
        <van-circle value="30" stroke-linecap="square" text="方形" />
      </div>
    `,
  }),
};

export const TextPosition = {
  name: '文字位置',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-circle value="30" text-position="top" text="顶部" />
        <van-circle value="30" text-position="center" text="居中" />
        <van-circle value="30" text-position="bottom" text="底部" />
      </div>
    `,
  }),
};

export const CustomText = {
  name: '自定义文字',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-circle value="30" text-color="#1989fa" text-size="16px">
          <div style="text-align: center;">
            <div style="font-size: 20px; font-weight: bold;">30%</div>
            <div style="font-size: 12px; color: #969799;">完成度</div>
          </div>
        </van-circle>
        <van-circle value="60" text-color="#07c160" text-size="18px">
          <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: bold;">60</div>
            <div style="font-size: 12px; color: #969799;">分</div>
          </div>
        </van-circle>
        <van-circle value="90" text-color="#ee0a24" text-size="14px">
          <div style="text-align: center;">
            <div style="font-size: 18px; font-weight: bold;">优秀</div>
            <div style="font-size: 10px; color: #969799;">90%</div>
          </div>
        </van-circle>
      </div>
    `,
  }),
};

export const HideText = {
  name: '隐藏文字',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-circle value="30" :show-text="false" />
        <van-circle value="60" :show-text="false" />
        <van-circle value="90" :show-text="false" />
      </div>
    `,
  }),
};

export const CustomFill = {
  name: '自定义填充',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-circle value="30" fill="#f7f8fa" text="30%" />
        <van-circle value="30" fill="#e8f4fd" text="30%" />
        <van-circle value="30" fill="#f0f9ff" text="30%" />
        <van-circle value="30" fill="#f0fdf4" text="30%" />
      </div>
    `,
  }),
}; 