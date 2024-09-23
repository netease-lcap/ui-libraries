/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import { at, isObject } from 'lodash';
import { ElTimelineItem } from '../index';

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils/plugins/index';

export const useDataSourceRender: NaslComponentPluginOptions = {
  props: ['data', 'valueField', 'itemProps', 'dotStyle'],
  setup({ get: propGet }, { h }) {
    return {
      slotDefault: () => {
        const slotDefault = propGet('slotDefault');
        const slotItemContent = propGet('slotContent');
        const data = propGet<any>('data') || [];
        const dataSource = propGet('dataSource');
        const valueField = propGet<string>('valueField') || 'value';
        const itemProps = propGet<(c: any) => any>('itemProps') || (() => ({}));
        const dotStyle = propGet<(c: any) => any>('dotStyle') || (() => ({}));
        if (!dataSource) {
          return typeof slotDefault === 'function' ? slotDefault() : null;
        }
        return data.map((item, i) => {
          const [value] = isObject(item) ? at(item, [valueField]) : [item];
          const current = {
            item,
            index: i,
            rowIndex: i,
            value,
          };
          const childNodes: any[] = [];
          const contents = typeof slotItemContent === 'function' ? slotItemContent(current) : [];
          const props = itemProps(current);
          const dotStyleValue = dotStyle(current);

          childNodes.push(h('template', { slot: 'default' }, contents));
          return h(ElTimelineItem, {
            key: value ? String(value) : `index_${i}`,
            attrs: {
              ...props,
              dotStyle: dotStyleValue,
            },
          }, [
            ...childNodes,
          ]);
        });
      },
    };
  },
};
