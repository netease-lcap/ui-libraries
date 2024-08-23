/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import { at } from 'lodash';
import { createUseUpdateSync } from '@lcap/vue2-utils';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change', defaultValue: [] }]);

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils/plugins/index';

export const useDataSourceRender: NaslComponentPluginOptions = {
  props: ['data', 'valueField'],
  setup({ get: propGet, useComputed }) {
    const dataSource = propGet('dataSource');
    const options = useComputed(['data'], () => {
      if (dataSource) {
        const slotItemContent = propGet('slotItem');
        const valueField = propGet<string>('valueField') || 'value';
        const itemProps = propGet<(c: any) => any>('itemProps') || (() => ({}));
        const data = propGet<any>('data') || [];
        return data.map((item, i) => {
          const [value] = at(item, [valueField]);
          const current = {
            item,
            index: i,
            rowIndex: i,
            value,
          };
          const contents = typeof slotItemContent === 'function' ? slotItemContent(current) : [];
          const props = itemProps(current);
          return {
            value,
            ...props,
            label: contents,
          };
        });
      }
      return [];
    });

    return {
      options,
      slotDefault: () => {
        const slotDefault = propGet('slotDefault');
        if (!dataSource) {
          return typeof slotDefault === 'function' ? slotDefault() : null;
        }
        return null;
      },
    };
  },
};
