/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ElCheckTagGroupProps } from '../tag/type';
import { PropType } from 'vue';

export default {
  /** 透传标签选中态属性 */
  checkedProps: {
    type: Object as PropType<ElCheckTagGroupProps['checkedProps']>,
  },
  /** 是否支持选中多个标签 */
  multiple: Boolean,
  /** 标签选项列表 */
  options: {
    type: Array as PropType<ElCheckTagGroupProps['options']>,
  },
  /** 透传标签未选态属性 */
  uncheckedProps: {
    type: Object as PropType<ElCheckTagGroupProps['uncheckedProps']>,
  },
  /** 选中标签值 */
  value: {
    type: Array as PropType<ElCheckTagGroupProps['value']>,
    default: undefined,
  },
  /** 选中标签值，非受控属性 */
  defaultValue: {
    type: Array as PropType<ElCheckTagGroupProps['defaultValue']>,
    default: (): ElCheckTagGroupProps['defaultValue'] => [],
  },
  /** null */
  onChange: Function as PropType<ElCheckTagGroupProps['onChange']>,
};
