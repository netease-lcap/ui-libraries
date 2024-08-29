/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import { at } from 'lodash';
import { createUseUpdateSync } from '@lcap/vue2-utils';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change' }]);

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils/plugins/index';

export const useDataSourceRender: NaslComponentPluginOptions = {
  props: ['data', 'valueField', 'textField', 'disabledField'],
  setup({ get: propGet, useComputed }) {
    const dataList = useComputed(['data'], () => {
      const textField = propGet<string>('textField') || 'label';
      const valueField = propGet<string>('valueField') || 'value';
      const disabledField = propGet<string>('disabledField') || 'disabled';
      const data = propGet<any>('data') || [];

      const optionList = data.map((item) => {
        const [text, value, disabled] = at(item, [textField, valueField, disabledField]);
        return {
          value,
          label: text,
          disabled,
        };
      });
      return optionList;
    });

    return {
      data: dataList,
    };
  },
};

export const useCustomSlotRender: NaslComponentPluginOptions = {
  setup({ get: propGet, useComputed }) {
    const slotFooter = useComputed(['slotFootersource', 'slotFootertarget'], (slotFootersource, slotFootertarget) => {
      const hasFooterSource = typeof slotFootersource === 'function';
      const hasFooterTarget = typeof slotFootertarget === 'function';
      if (!hasFooterSource && !hasFooterSource) {
        return null;
      }
      return (footerProps) => {
        if (footerProps.type === 'source' && hasFooterSource) {
          return slotFootersource();
        }
        if (footerProps.type === 'target' && hasFooterTarget) {
          return slotFootertarget();
        }
        return null;
      };
    });

    return {
      slotTitle: (titleProps) => {
        const slotTitlesource = propGet('slotTitlesource');
        const slotTitletarget = propGet('slotTitletarget');
        const titleSourceVnode = typeof slotTitlesource === 'function' ? slotTitlesource() : null;
        const titleTargetVnode = typeof slotTitletarget === 'function' ? slotTitletarget() : null;
        if (titleProps.type === 'source') {
          return titleSourceVnode;
        }
        if (titleProps.type === 'target') {
          return titleTargetVnode;
        }
        return null;
      },
      slotFooter,
    };
  },
};
