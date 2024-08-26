/* 组件功能扩展插件 */
import { createUseUpdateSync, $deletePropList } from '@lcap/vue2-utils';
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change' }]);

export const useExtendprops: NaslComponentPluginOptions = {
  props: ['showLabelTooltip', 'unit'],
  setup({ get: propGet, useComputed }, { h }) {
    const currentLabel = useComputed(['showLabelTooltip'], (showLabelTooltip) => {
      const unit = propGet('unit');
      if (showLabelTooltip === undefined || showLabelTooltip === null || showLabelTooltip) {
        if (unit) {
          return `\${value}${unit}`;
        }
        return true;
      }
      return false;
    });
    const currentMarks = useComputed(['marks'], (value) => {
      if (Array.isArray(value)) {
        const markMap = {};
        const unit = propGet('unit');
        value.forEach((valueItem) => {
          markMap[valueItem] = unit ? `${valueItem}${unit}` : `${valueItem}`;
        });
        return markMap;
      }
      return value;
    });
    return {
      label: currentLabel,
      marks: currentMarks,
    };
  },
};
