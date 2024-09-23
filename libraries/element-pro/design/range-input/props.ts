/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ElRangeInputProps } from './type';
import { PropType } from 'vue';

export default {
  /** 输入框高亮状态序号 */
  activeIndex: {
    type: Number,
  },
  /** 无边框模式 */
  borderless: Boolean,
  /** 是否可清空 */
  clearable: Boolean,
  /** 是否禁用范围输入框 */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 指定输入框展示值的格式 */
  format: {
    type: [Array, Function] as PropType<ElRangeInputProps['format']>,
  },
  /** 透传 Input 输入框组件全部属性，数组第一项表示第一个输入框属性，第二项表示第二个输入框属性。示例：`[{ label: 'A', name: 'A-name' }, { label: 'B',  name: 'B-name' }]` */
  inputProps: {
    type: [Object, Array] as PropType<ElRangeInputProps['inputProps']>,
  },
  /** 左侧内容 */
  label: {
    type: [String, Function] as PropType<ElRangeInputProps['label']>,
  },
  /** 占位符，示例：'请输入' 或者 ['开始日期', '结束日期'] */
  placeholder: {
    type: [String, Array] as PropType<ElRangeInputProps['placeholder']>,
  },
  /** 组件前置图标 */
  prefixIcon: {
    type: Function as PropType<ElRangeInputProps['prefixIcon']>,
  },
  /** 只读状态 */
  readonly: Boolean,
  /** 范围分隔符 */
  separator: {
    type: [String, Function] as PropType<ElRangeInputProps['separator']>,
    default: '-',
  },
  /** 输入框内容为空时，悬浮状态是否显示清空按钮，默认不显示 */
  showClearIconOnEmpty: Boolean,
  /** 输入框尺寸 */
  size: {
    type: String as PropType<ElRangeInputProps['size']>,
    default: 'medium' as ElRangeInputProps['size'],
    validator(val: ElRangeInputProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 输入框状态 */
  status: {
    type: String as PropType<ElRangeInputProps['status']>,
    default: 'default' as ElRangeInputProps['status'],
    validator(val: ElRangeInputProps['status']): boolean {
      if (!val) return true;
      return ['default', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 后置图标前的后置内容 */
  suffix: {
    type: [String, Function] as PropType<ElRangeInputProps['suffix']>,
  },
  /** 组件后置图标 */
  suffixIcon: {
    type: Function as PropType<ElRangeInputProps['suffixIcon']>,
  },
  /** 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式 */
  tips: {
    type: [String, Function] as PropType<ElRangeInputProps['tips']>,
  },
  /** 范围输入框的值 */
  value: {
    type: Array as PropType<ElRangeInputProps['value']>,
    default: undefined,
  },
  /** 范围输入框的值，非受控属性 */
  defaultValue: {
    type: Array as PropType<ElRangeInputProps['defaultValue']>,
    default: (): ElRangeInputProps['defaultValue'] => [],
  },
  /** 范围输入框失去焦点时触发 */
  onBlur: Function as PropType<ElRangeInputProps['onBlur']>,
  /** 范围输入框值发生变化时触发 */
  onChange: Function as PropType<ElRangeInputProps['onChange']>,
  /** 清空按钮点击时触发 */
  onClear: Function as PropType<ElRangeInputProps['onClear']>,
  /** 范围输入框点击时触发 */
  onClick: Function as PropType<ElRangeInputProps['onClick']>,
  /** 回车键按下时触发 */
  onEnter: Function as PropType<ElRangeInputProps['onEnter']>,
  /** 范围输入框获得焦点时触发 */
  onFocus: Function as PropType<ElRangeInputProps['onFocus']>,
  /** 进入输入框时触发 */
  onMouseenter: Function as PropType<ElRangeInputProps['onMouseenter']>,
  /** 离开输入框时触发 */
  onMouseleave: Function as PropType<ElRangeInputProps['onMouseleave']>,
};
