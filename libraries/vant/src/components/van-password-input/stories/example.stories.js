import Component from '../index';

export default {
  id: 'van-password-input-examples',
  title: '组件列表/PasswordInput 密码输入框/示例',
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
      <van-password-input v-bind="args" />
    `,
  }),
  args: {
    modelValue: '',
    length: 6,
    placeholder: '请输入密码',
    disabled: false,
    readonly: false,
    autofocus: false,
    mask: true,
    showCursor: true,
    error: false,
    errorMessage: '',
  },
};

export const DifferentLengths = {
  name: '不同长度',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <van-password-input length="4" placeholder="4位密码" />
        <van-password-input length="6" placeholder="6位密码" />
        <van-password-input length="8" placeholder="8位密码" />
        <van-password-input length="10" placeholder="10位密码" />
      </div>
    `,
  }),
};

export const ShowPassword = {
  name: '显示密码',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <van-password-input :mask="true" placeholder="隐藏密码" />
        <van-password-input :mask="false" placeholder="显示密码" />
      </div>
    `,
  }),
};

export const Cursor = {
  name: '光标显示',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <van-password-input :show-cursor="true" placeholder="显示光标" />
        <van-password-input :show-cursor="false" placeholder="隐藏光标" />
      </div>
    `,
  }),
};

export const ErrorState = {
  name: '错误状态',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <van-password-input error placeholder="错误状态" />
        <van-password-input error error-message="密码错误，请重新输入" placeholder="错误状态" />
      </div>
    `,
  }),
};

export const Disabled = {
  name: '禁用状态',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <van-password-input disabled placeholder="禁用状态" />
        <van-password-input readonly placeholder="只读状态" />
      </div>
    `,
  }),
};

export const CustomSize = {
  name: '自定义尺寸',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <van-password-input size="25px" placeholder="小尺寸" />
        <van-password-input size="35px" placeholder="默认尺寸" />
        <van-password-input size="45px" placeholder="大尺寸" />
        <van-password-input size="55px" placeholder="超大尺寸" />
      </div>
    `,
  }),
};

export const CustomGutter = {
  name: '自定义间距',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <van-password-input gutter="0px" placeholder="无间距" />
        <van-password-input gutter="4px" placeholder="小间距" />
        <van-password-input gutter="8px" placeholder="默认间距" />
        <van-password-input gutter="16px" placeholder="大间距" />
      </div>
    `,
  }),
};

export const CustomColors = {
  name: '自定义颜色',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <van-password-input color="#1989fa" placeholder="蓝色主题" />
        <van-password-input color="#07c160" placeholder="绿色主题" />
        <van-password-input color="#ee0a24" placeholder="红色主题" />
        <van-password-input color="#ff976a" placeholder="橙色主题" />
        <van-password-input color="#7232dd" placeholder="紫色主题" />
      </div>
    `,
  }),
};

export const CustomBackground = {
  name: '自定义背景',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <van-password-input background-color="#f7f8fa" placeholder="浅灰背景" />
        <van-password-input background-color="#e8f4fd" placeholder="浅蓝背景" />
        <van-password-input background-color="#f0f9ff" placeholder="浅青背景" />
        <van-password-input background-color="#f0fdf4" placeholder="浅绿背景" />
      </div>
    `,
  }),
};

export const CustomBorder = {
  name: '自定义边框',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <van-password-input border-color="#1989fa" placeholder="蓝色边框" />
        <van-password-input border-color="#07c160" placeholder="绿色边框" />
        <van-password-input border-color="#ee0a24" placeholder="红色边框" />
        <van-password-input border-color="#ff976a" placeholder="橙色边框" />
      </div>
    `,
  }),
};

export const CustomBorderRadius = {
  name: '自定义圆角',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <van-password-input border-radius="0px" placeholder="直角" />
        <van-password-input border-radius="4px" placeholder="小圆角" />
        <van-password-input border-radius="8px" placeholder="中圆角" />
        <van-password-input border-radius="16px" placeholder="大圆角" />
        <van-password-input border-radius="50%" placeholder="圆形" />
      </div>
    `,
  }),
};

export const Validation = {
  name: '验证功能',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <van-password-input minlength="4" maxlength="8" placeholder="4-8位密码" />
        <van-password-input required placeholder="必填密码" />
        <van-password-input name="password" placeholder="表单字段" />
      </div>
    `,
  }),
}; 