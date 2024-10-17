/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ElButtonProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否为块级元素 */
  block: Boolean,
  /** 按钮内容 */
  content: {
    type: [String, Function] as PropType<ElButtonProps['content']>,
  },
  /** 按钮内容 */
  default: {
    type: [String, Function] as PropType<ElButtonProps['default']>,
  },
  /** 禁用状态 */
  disabled: Boolean,
  /** 是否为幽灵按钮（镂空按钮） */
  ghost: Boolean,
  /** 跳转地址。href 存在时，按钮标签默认使用 `<a>` 渲染；如果指定了 `tag` 则使用指定的标签渲染 */
  href: {
    type: String,
    default: '',
  },
  /** 按钮内部图标，可完全自定义 */
  icon: {
    type: Function as PropType<ElButtonProps['icon']>,
  },
  /** 是否显示为加载状态 */
  loading: Boolean,
  /** 按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形 */
  shape: {
    type: String as PropType<ElButtonProps['shape']>,
    default: 'rectangle' as ElButtonProps['shape'],
    validator(val: ElButtonProps['shape']): boolean {
      if (!val) return true;
      return ['rectangle', 'square', 'round', 'circle'].includes(val);
    },
  },
  /** 组件尺寸 */
  size: {
    type: String as PropType<ElButtonProps['size']>,
    default: 'medium' as ElButtonProps['size'],
    validator(val: ElButtonProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 右侧内容，可用于定义右侧图标 */
  suffix: {
    type: Function as PropType<ElButtonProps['suffix']>,
  },
  /** 渲染按钮的 HTML 标签，默认使用标签 `<button>` 渲染，可以自定义为 `<a>` `<div>` 等。透传全部 HTML 属性，如：`href/target/data-*` 等。⚠️ 禁用按钮 `<button disabled>`无法显示 Popup 浮层信息，可通过修改 `tag=div` 解决这个问题 */
  tag: {
    type: String as PropType<ElButtonProps['tag']>,
    validator(val: ElButtonProps['tag']): boolean {
      if (!val) return true;
      return ['button', 'a', 'div'].includes(val);
    },
  },
  /** 组件风格，依次为默认色、品牌色、危险色、警告色、成功色 */
  theme: {
    type: String as PropType<ElButtonProps['theme']>,
    validator(val: ElButtonProps['theme']): boolean {
      if (!val) return true;
      return ['default', 'primary', 'danger', 'warning', 'success'].includes(val);
    },
  },
  /** 按钮类型 */
  type: {
    type: String as PropType<ElButtonProps['type']>,
    default: 'button' as ElButtonProps['type'],
    validator(val: ElButtonProps['type']): boolean {
      if (!val) return true;
      return ['submit', 'reset', 'button'].includes(val);
    },
  },
  /** 按钮形式，基础、线框、虚线、文字 */
  variant: {
    type: String as PropType<ElButtonProps['variant']>,
    default: 'base' as ElButtonProps['variant'],
    validator(val: ElButtonProps['variant']): boolean {
      if (!val) return true;
      return ['base', 'outline', 'dashed', 'text'].includes(val);
    },
  },
  /** 点击时触发 */
  onClick: Function as PropType<ElButtonProps['onClick']>,
};
