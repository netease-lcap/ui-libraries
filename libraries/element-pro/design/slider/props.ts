/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ElSliderProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 用于控制数字输入框组件，值为 false 表示不显示数字输入框；值为 true 表示呈现默认数字输入框；值类型为 Object 表示透传属性到数字输入框组件 */
  inputNumberProps: {
    type: [Boolean, Object] as PropType<ElSliderProps['inputNumberProps']>,
    default: false,
  },
  /** 滑块当前值文本。<br />值为 true 显示默认文案；值为 false 不显示滑块当前值文本；<br />值为 `${value}%` 则表示组件会根据占位符渲染文案；<br />值类型为函数时，参数 `value` 标识滑块值，参数 `position=start` 表示范围滑块的起始值，参数 `position=end` 表示范围滑块的终点值 */
  label: {
    type: [String, Boolean, Function] as PropType<ElSliderProps['label']>,
    default: true,
  },
  /** 滑块布局方向 */
  layout: {
    type: String as PropType<ElSliderProps['layout']>,
    default: 'horizontal' as ElSliderProps['layout'],
    validator(val: ElSliderProps['layout']): boolean {
      if (!val) return true;
      return ['vertical', 'horizontal'].includes(val);
    },
  },
  /** 刻度标记，示例：[0, 10, 40, 200] 或者 `{ 10: (val) => val + '%', 50: (h) => <button>50</button> }` */
  marks: {
    type: [Object, Array] as PropType<ElSliderProps['marks']>,
  },
  /** 滑块范围最大值 */
  max: {
    type: Number,
    default: 100,
  },
  /** 滑块范围最小值 */
  min: {
    type: Number,
    default: 0,
  },
  /** 双游标滑块 */
  range: Boolean,
  /** 步长 */
  step: {
    type: Number,
    default: 1,
  },
  /** 透传提示组件属性 */
  tooltipProps: {
    type: Object as PropType<ElSliderProps['tooltipProps']>,
  },
  /** 滑块值 */
  value: {
    type: [Number, Array] as PropType<ElSliderProps['value']>,
  },
  /** 滑块值，非受控属性 */
  defaultValue: {
    type: [Number, Array] as PropType<ElSliderProps['defaultValue']>,
  },
  /** 滑块值变化时触发 */
  onChange: Function as PropType<ElSliderProps['onChange']>,
  /** 松开拖动`mouseup` 或点击滑块条时触发，适合不希望在拖动滑块过程频繁触发回调的场景实用 */
  onChangeEnd: Function as PropType<ElSliderProps['onChangeEnd']>,
};
