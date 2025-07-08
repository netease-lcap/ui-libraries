import Component from '../index';

export default {
  id: 'van-tag-examples',
  title: '组件列表/Tag 标签/示例',
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
      <van-tag v-bind="args" />
    `,
  }),
  args: {
    text: '标签',
    type: '',
    size: 'default',
    effect: 'light',
    closable: false,
  },
};

export const Types = {
  name: '不同类型',
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <van-tag text="默认" />
        <van-tag text="主要" type="primary" />
        <van-tag text="成功" type="success" />
        <van-tag text="警告" type="warning" />
        <van-tag text="危险" type="danger" />
      </div>
    `,
  }),
};

export const Sizes = {
  name: '不同尺寸',
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <van-tag text="小" size="small" />
        <van-tag text="默认" size="default" />
        <van-tag text="大" size="large" />
      </div>
    `,
  }),
};

export const Effects = {
  name: '不同主题',
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <van-tag text="深色" effect="dark" />
        <van-tag text="浅色" effect="light" />
        <van-tag text="朴素" effect="plain" />
      </div>
    `,
  }),
};

export const Closable = {
  name: '可关闭',
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <van-tag text="可关闭" closable />
        <van-tag text="主要" type="primary" closable />
        <van-tag text="成功" type="success" closable />
        <van-tag text="警告" type="warning" closable />
        <van-tag text="危险" type="danger" closable />
      </div>
    `,
  }),
};

export const WithIcon = {
  name: '带图标',
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <van-tag text="标签" icon="Star" />
        <van-tag text="主要" type="primary" icon="Star" />
        <van-tag text="成功" type="success" icon="Star" />
        <van-tag text="警告" type="warning" icon="Star" />
        <van-tag text="危险" type="danger" icon="Star" />
      </div>
    `,
  }),
};

export const CustomColor = {
  name: '自定义颜色',
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <van-tag text="自定义颜色" color="#7232dd" />
        <van-tag text="渐变色" color="linear-gradient(to right, #4bb0ff, #6149f6)" />
      </div>
    `,
  }),
}; 