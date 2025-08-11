import Component from '../index';

export default {
  id: 'van-index-bar-examples',
  title: '组件列表/IndexBar 索引栏/示例',
  component: Component,
  parameters: {
    layout: 'fullscreen',
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
      <van-index-bar>
        <van-index-anchor index="A"></van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor index="B"></van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor index="C"></van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor index="D"></van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor index="E"></van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor index="F"></van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor index="G"></van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor index="H"></van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor index="I"></van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor index="J"></van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor index="K"></van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor index="L"></van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>
      </van-index-bar>
    `,
  }),
  args: {
    title: '索引栏',
  },
};

export const Customized = {
  name: '自定义索引栏',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    template: `
      <van-index-bar :index-list="[1, 2, 3, 4, 5, 6, 7, 8, 9]">
        <van-index-anchor :index="1">索引1</van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor :index="2">索引2</van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor :index="3">索引3</van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor :index="4">索引4</van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor :index="5">索引5</van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor :index="6">索引6</van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>

        <van-index-anchor :index="7">索引7</van-index-anchor>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>
        <div>文本内容</div>
      </van-index-bar>
    `,
  }),
  args: {
    title: '自定义索引栏',
  },
};
