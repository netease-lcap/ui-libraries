/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ElTagProps } from './type';
import { PropType } from 'vue';

export default {
  /** 标签是否可关闭 */
  closable: Boolean,
  /** 自定义标签颜色 */
  color: String,
  /** 组件子元素 */
  content: {
    type: [String, Function] as PropType<ElTagProps['content']>,
  },
  /** 组件子元素，同 `content` */
  default: {
    type: [String, Function] as PropType<ElTagProps['default']>,
  },
  /** 标签禁用态，失效标签不能触发事件。默认风格（theme=default）才有禁用态 */
  disabled: Boolean,
  /** 标签中的图标，可自定义图标呈现 */
  icon: {
    type: Function as PropType<ElTagProps['icon']>,
    default: undefined,
  },
  /** 标签最大宽度，宽度超出后会出现省略号。示例：'50px' / 80 */
  maxWidth: {
    type: [String, Number] as PropType<ElTagProps['maxWidth']>,
  },
  /** 标签类型，有三种：方形、圆角方形、标记型 */
  shape: {
    type: String as PropType<ElTagProps['shape']>,
    default: 'square' as ElTagProps['shape'],
    validator(val: ElTagProps['shape']): boolean {
      if (!val) return true;
      return ['square', 'round', 'mark'].includes(val);
    },
  },
  /** 标签尺寸 */
  size: {
    type: String as PropType<ElTagProps['size']>,
    default: 'medium' as ElTagProps['size'],
    validator(val: ElTagProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 组件风格，用于描述组件不同的应用场景 */
  theme: {
    type: String as PropType<ElTagProps['theme']>,
    default: 'default' as ElTagProps['theme'],
    validator(val: ElTagProps['theme']): boolean {
      if (!val) return true;
      return ['default', 'primary', 'warning', 'danger', 'success'].includes(val);
    },
  },
  /** 标签风格变体 */
  variant: {
    type: String as PropType<ElTagProps['variant']>,
    default: 'dark' as ElTagProps['variant'],
    validator(val: ElTagProps['variant']): boolean {
      if (!val) return true;
      return ['dark', 'light', 'outline', 'light-outline'].includes(val);
    },
  },
  /** 点击时触发 */
  onClick: Function as PropType<ElTagProps['onClick']>,
  /** 如果关闭按钮存在，点击关闭按钮时触发 */
  onClose: Function as PropType<ElTagProps['onClose']>,
};
