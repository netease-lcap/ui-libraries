/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import { at, isObject } from 'lodash';
import { createUseUpdateSync } from '@lcap/vue2-utils';
import { ElCheckboxPro } from '../index';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change', defaultValue: [] }]);

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils/plugins/index';

export const useDataSourceRender: NaslComponentPluginOptions = {
  props: ['data', 'valueField', 'checkAll', 'itemProps'],
  setup({ get: propGet, useComputed }, { h }) {
    const options = useComputed(['data'], () => {
      const dataSource = propGet('dataSource');
      if (dataSource) {
        const slotItemContent = propGet('slotItem');
        const valueField = propGet<any>('valueField') || 'value';
        const itemProps = propGet<(c: any) => any>('itemProps') || (() => ({}));
        const data = propGet<any>('data') || [];
        const checkAll = propGet<boolean>('checkAll');

        const optionList = data.map((item, i) => {
          const [value] = isObject(item) ? at(item, valueField) : [item];
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
        if (checkAll) {
          const hasCheckedAll = optionList.some((item: any) => item.checkAll);
          if (!hasCheckedAll) {
            optionList.unshift({ label: '全选', checkAll: true });
          }
        }
        return optionList;
      }
      return [];
    });

    return {
      options,
      slotDefault: () => {
        const slotDefault = propGet('slotDefault');
        const dataSource = propGet('dataSource');
        if (!dataSource) {
          const checkAll = propGet<boolean>('checkAll');

          let vnodes = typeof slotDefault === 'function' ? slotDefault() : null;
          if (checkAll) {
            vnodes = vnodes || [];
            vnodes.unshift(h(ElCheckboxPro, {
              attrs: {
                checkAll: true,
                label: '全选',
              },
            }));
          }
          return vnodes;
        }
        return null;
      },
    };
  },
};
