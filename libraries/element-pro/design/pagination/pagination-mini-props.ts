/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ElPaginationMiniProps } from '../pagination/type';
import { PropType } from 'vue';

export default {
  /** 按钮禁用配置 */
  disabled: {
    type: [Boolean, Object] as PropType<ElPaginationMiniProps['disabled']>,
  },
  /** 按钮方向 */
  layout: {
    type: String as PropType<ElPaginationMiniProps['layout']>,
    default: 'horizontal' as ElPaginationMiniProps['layout'],
    validator(val: ElPaginationMiniProps['layout']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 是否展示当前按钮 */
  showCurrent: {
    type: Boolean,
    default: true,
  },
  /** 按钮尺寸 */
  size: {
    type: String as PropType<ElPaginationMiniProps['size']>,
    default: 'medium' as ElPaginationMiniProps['size'],
    validator(val: ElPaginationMiniProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 提示文案配置，值为 `true` 显示默认文案；值为 `false` 不显示提示文案；值类型为对象则单独配置文案内容 */
  tips: {
    type: Object as PropType<ElPaginationMiniProps['tips']>,
  },
  /** 按钮形式 */
  variant: {
    type: String as PropType<ElPaginationMiniProps['variant']>,
    default: 'text' as ElPaginationMiniProps['variant'],
    validator(val: ElPaginationMiniProps['variant']): boolean {
      if (!val) return true;
      return ['text', 'outline'].includes(val);
    },
  },
  /** 按钮点击事件回调 */
  onChange: Function as PropType<ElPaginationMiniProps['onChange']>,
};
