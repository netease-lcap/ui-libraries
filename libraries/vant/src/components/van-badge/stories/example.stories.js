import Component from '../index';

export default {
  id: 'van-badge-examples',
  title: '组件列表/Badge 徽标/示例',
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
      <van-badge v-bind="args">
        <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
          内容
        </div>

      </van-badge>
    `,
  }),
  args: {
    content: 5,
    max: 99,
  },
};

export const Types = {
  name: '不同类型',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-badge value="5" type="primary">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            主要
          </div>
        </van-badge>
        <van-badge value="5" type="success">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            成功
          </div>
        </van-badge>
        <van-badge value="5" type="warning">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            警告
          </div>
        </van-badge>
        <van-badge value="5" type="danger">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            危险
          </div>
        </van-badge>
        <van-badge value="5" type="info">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            信息
          </div>
        </van-badge>
      </div>
    `,
  }),
};

export const Dot = {
  name: '小圆点',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-badge is-dot>
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            小圆点
          </div>
        </van-badge>
        <van-badge is-dot type="primary">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            主要
          </div>
        </van-badge>
        <van-badge is-dot type="success">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            成功
          </div>
        </van-badge>
        <van-badge is-dot type="warning">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            警告
          </div>
        </van-badge>
        <van-badge is-dot type="danger">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            危险
          </div>
        </van-badge>
        <van-badge is-dot type="info">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            信息
          </div>
        </van-badge>
      </div>
    `,
  }),
};

export const Max = {
  name: '最大值',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-badge value="5" max="10">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            最大值10
          </div>
        </van-badge>
        <van-badge value="15" max="10">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            超过最大值
          </div>
        </van-badge>
        <van-badge value="99" max="99">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            最大值99
          </div>
        </van-badge>
        <van-badge value="100" max="99">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            超过最大值
          </div>
        </van-badge>
      </div>
    `,
  }),
};

export const ShowZero = {
  name: '显示零值',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-badge value="0" show-zero>
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            显示零值
          </div>
        </van-badge>
        <van-badge value="0" :show-zero="false">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            隐藏零值
          </div>
        </van-badge>
      </div>
    `,
  }),
};

export const CustomColor = {
  name: '自定义颜色',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-badge value="5" color="#1989fa">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            自定义颜色
          </div>
        </van-badge>
        <van-badge value="5" color="linear-gradient(to right, #4bb0ff, #6149f6)">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            渐变色
          </div>
        </van-badge>
      </div>
    `,
  }),
};

export const Positions = {
  name: '不同位置',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-badge value="5" position="top-right">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            右上角
          </div>
        </van-badge>
        <van-badge value="5" position="bottom-right">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            右下角
          </div>
        </van-badge>
        <van-badge value="5" position="top-left">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            左上角
          </div>
        </van-badge>
        <van-badge value="5" position="bottom-left">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            左下角
          </div>
        </van-badge>
      </div>
    `,
  }),
};

export const Content = {
  name: '自定义内容',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <van-badge content="NEW">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            文字
          </div>
        </van-badge>
        <van-badge content="HOT">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            文字
          </div>
        </van-badge>
        <van-badge content="99+">
          <div style="width: 40px; height: 40px; background: #f2f3f5; display: flex; align-items: center; justify-content: center;">
            文字
          </div>
        </van-badge>
      </div>
    `,
  }),
}; 