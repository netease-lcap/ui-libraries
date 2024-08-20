/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-11-24 14:47:35
 * */

import { ElSwitchProps } from './type';
import { PropType } from 'vue';

export default {
  /** 开关内容，[打开时的值，关闭时的值]。默认为 [true, false]。示例：[1, 0] */
  customValue: {
    type: Array as PropType<ElSwitchProps['customValue']>,
  },
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 开关内容，[开启时内容，关闭时内容]。示例：['开', '关'] 或 (value) => value ? '开' : '关' */
  label: {
    type: [Array, Function] as PropType<ElSwitchProps['label']>,
    default: (): ElSwitchProps['label'] => [],
  },
  /** 是否处于加载中状态 */
  loading: Boolean,
  /** 开关尺寸 */
  size: {
    type: String as PropType<ElSwitchProps['size']>,
    default: 'medium' as ElSwitchProps['size'],
    validator(val: ElSwitchProps['size']): boolean {
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 开关值 */
  value: {
    type: [String, Number, Boolean] as PropType<ElSwitchProps['value']>,
    default: false,
  },
  /** 开关值，非受控属性 */
  defaultValue: {
    type: [String, Number, Boolean] as PropType<ElSwitchProps['defaultValue']>,
    default: false,
  },
  /** 数据发生变化时触发 */
  onChange: Function as PropType<ElSwitchProps['onChange']>,
};
