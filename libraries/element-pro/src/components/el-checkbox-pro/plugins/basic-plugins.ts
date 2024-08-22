/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import { at } from 'lodash';
import { createUseUpdateSync } from '@lcap/vue2-utils';
import { ElCheckboxPro } from '../index';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change' }]);

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils/plugins/index';

export const useDataSourceRender: NaslComponentPluginOptions = {
  props: ['data', 'valueField'],
  setup({ get: propGet }, { h }) {
    return {
      slotDefault: () => {
        const slotDefault = propGet('slotDefault');
        const slotItemContent = propGet('slotItem');
        const data = propGet('data') || [];
        const valueField = propGet<string>('valueField') || 'value';
        const itemProps = propGet<(c: any) => any>('itemProps') || (() => ({}));
        if (!Array.isArray(data) || data.length === 0) {
          return typeof slotDefault === 'function' ? slotDefault() : null;
        }
        return data.map((item, i) => {
          const [value] = at(item, [valueField]);
          const current = {
            item,
            index: i,
            rowIndex: i,
            value,
          };
          const childNodes: any[] = [];
          const contents = typeof slotItemContent === 'function' ? slotItemContent(current) : [];
          const props = itemProps(current);

          childNodes.push(h('template', { slot: 'default' }, contents));
          return h(ElCheckboxPro, {
            key: value ? String(value) : `index_${i}`,
            attrs: {
              value,
              ...props,
            },
          }, [
            ...childNodes,
          ]);
        });
      },
    };
  },
};
