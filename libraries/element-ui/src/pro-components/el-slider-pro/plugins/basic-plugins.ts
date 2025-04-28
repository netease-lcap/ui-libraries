/* 组件功能扩展插件 */
import { createUseUpdateSync } from '@lcap/vue2-utils';
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change' }]);

export const useExtendprops: NaslComponentPluginOptions = {
  props: ['showLabelTooltip', 'unit', 'marks'],
  setup({ get: propGet, useComputed }, { h }) {
    const currentLabel = useComputed(['showLabelTooltip', 'unit'], (showLabelTooltip, unit) => {
      if (showLabelTooltip === undefined || showLabelTooltip === null || showLabelTooltip) {
        if (unit) {
          return `\${value}${unit}`;
        }
        return true;
      }
      return false;
    });

    const currentMarks = useComputed(['marks', 'unit'], (value, unit) => {
      if (Array.isArray(value)) {
        const markMap = {};
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
