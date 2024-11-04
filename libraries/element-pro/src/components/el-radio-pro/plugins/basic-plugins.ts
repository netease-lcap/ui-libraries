/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import { provide } from '@vue/composition-api';
import { at, isObject } from 'lodash';
import { createUseUpdateSync } from '@lcap/vue2-utils';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change' }]);

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils/plugins/index';

export const useDataSourceRender: NaslComponentPluginOptions = {
  props: ['data', 'valueField', 'shape'],
  setup({ get: propGet, useComputed }) {
    const shapeRef = useComputed('shape', (v) => (v || 'normal'));
    const options = useComputed(['data', 'shape'], (data, shape) => {
      const dataSource = propGet('dataSource');
      if (dataSource) {
        const slotItemContent = propGet('slotItem');
        const valueField = propGet<any>('valueField') || 'value';
        const itemProps = propGet<(c: any) => any>('itemProps') || (() => ({}));
        return data.map((item, i) => {
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
            button: shape === 'button',
            label: contents,
          };
        });
      }
      return [];
    });

    provide('EL_RADIO_GROUP_SHAPE', shapeRef);

    return {
      options,
      slotDefault: () => {
        const dataSource = propGet('dataSource');
        const slotDefault = propGet('slotDefault');
        if (!dataSource) {
          return typeof slotDefault === 'function' ? slotDefault() : null;
        }
        return null;
      },
    };
  },
};
