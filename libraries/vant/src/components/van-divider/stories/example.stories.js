import Component from '../index';

export default {
  id: 'van-divider-examples',
  title: '组件列表/Divider 分割线/示例',
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
      <van-divider v-bind="args">
        分割线
      </van-divider>
    `,
  }),
  args: {
    content: '分割线',
    contentPosition: 'center',
    direction: 'horizontal',
    dashed: false,
    hairline: true,
    color: '#dcdee0',
    fontSize: '14px',
    borderStyle: 'solid',
    marginLeft: '16px',
    marginRight: '16px',
  },
};

export const ContentPosition = {
  name: '内容位置',
  render: () => ({
    template: `
      <div style="padding: 16px;">
        <van-divider content-position="left">
          左侧内容
        </van-divider>
        <van-divider content-position="center">
          中间内容
        </van-divider>
        <van-divider content-position="right">
          右侧内容
        </van-divider>
      </div>
    `,
  }),
};

export const Vertical = {
  name: '垂直分割线',
  render: () => ({
    template: `
      <div style="padding: 16px;">
        <span>文字</span>
        <van-divider direction="vertical" />
        <span>文字</span>
        <van-divider direction="vertical" />
        <span>文字</span>
      </div>
    `,
  }),
};

export const Dashed = {
  name: '虚线',
  render: () => ({
    template: `
      <div style="padding: 16px;">
        <van-divider dashed>
          虚线分割线
        </van-divider>
        <van-divider dashed content-position="left">
          左侧虚线
        </van-divider>
        <van-divider dashed content-position="right">
          右侧虚线
        </van-divider>
      </div>
    `,
  }),
};

export const Hairline = {
  name: '细线',
  render: () => ({
    template: `
      <div style="padding: 16px;">
        <van-divider hairline>
          细线分割线
        </van-divider>
        <van-divider :hairline="false">
          粗线分割线
        </van-divider>
      </div>
    `,
  }),
};

export const CustomContent = {
  name: '自定义内容',
  render: () => ({
    template: `
      <div style="padding: 16px;">
        <van-divider>
          <van-icon name="star" style="margin-right: 8px;" />
          自定义图标
        </van-divider>
        <van-divider>
          <van-button size="small" type="primary">按钮</van-button>
        </van-divider>
        <van-divider>
          <span style="color: #1989fa; font-weight: bold;">自定义样式</span>
        </van-divider>
      </div>
    `,
  }),
};

export const BorderStyle = {
  name: '边框样式',
  render: () => ({
    template: `
      <div style="padding: 16px;">
        <van-divider border-style="solid">
          实线
        </van-divider>
        <van-divider border-style="dashed">
          虚线
        </van-divider>
        <van-divider border-style="dotted">
          点线
        </van-divider>
      </div>
    `,
  }),
};

export const CustomColor = {
  name: '自定义颜色',
  render: () => ({
    template: `
      <div style="padding: 16px;">
        <van-divider color="#1989fa">
          蓝色分割线
        </van-divider>
        <van-divider color="#07c160">
          绿色分割线
        </van-divider>
        <van-divider color="#ee0a24">
          红色分割线
        </van-divider>
        <van-divider color="#ff976a">
          橙色分割线
        </van-divider>
      </div>
    `,
  }),
};

export const CustomFontSize = {
  name: '自定义字体大小',
  render: () => ({
    template: `
      <div style="padding: 16px;">
        <van-divider font-size="12px">
          小字体
        </van-divider>
        <van-divider font-size="14px">
          默认字体
        </van-divider>
        <van-divider font-size="16px">
          大字体
        </van-divider>
        <van-divider font-size="18px">
          更大字体
        </van-divider>
      </div>
    `,
  }),
};

export const Margin = {
  name: '自定义边距',
  render: () => ({
    template: `
      <div style="padding: 16px;">
        <van-divider margin-left="0px" margin-right="0px">
          无边距
        </van-divider>
        <van-divider margin-left="32px" margin-right="32px">
          大边距
        </van-divider>
        <van-divider margin-left="8px" margin-right="8px">
          小边距
        </van-divider>
      </div>
    `,
  }),
}; 