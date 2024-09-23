/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import CollapseItem from 'element-ui/lib/collapse-item';
import { at, isObject } from 'lodash';
import { createUseUpdateSync } from '@lcap/vue2-utils';
import styles from '../index.module.css';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change' }]);

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils/plugins/index';

export const useDataSourceRender: NaslComponentPluginOptions = {
  props: ['data', 'valueField'],
  setup({ get: propGet, useComputed }, { h }) {
    // el-collapse 有border样式，当数据为空时，需要添加empty样式
    const displayClass = useComputed(['data'], (data) => {
      const dataSource = propGet('dataSource');
      if (dataSource && data && data.length === 0) {
        return styles.empty;
      }
      return '';
    });

    return {
      class: displayClass,
      slotDefault: () => {
        const slotDefault = propGet('slotDefault');
        const slotItemTitle = propGet('slotTitle');
        const slotItemContent = propGet('slotContent');
        const data = propGet<any>('data') || [];
        const dataSource = propGet('dataSource');
        const valueField = propGet<string>('valueField') || 'value';
        const itemProps = propGet<(c: any) => any>('itemProps') || (() => ({}));
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
          const titleVNodes = typeof slotItemTitle === 'function' ? slotItemTitle(current) : [];
          const props = itemProps(current);

          childNodes.push(h('template', { slot: 'default' }, contents));
          if (Array.isArray(titleVNodes) && titleVNodes.length > 0) {
            childNodes.push(
              h('template', { slot: 'title' }, titleVNodes),
            );
          }
          return h(CollapseItem, {
            key: value ? String(value) : `index_${i}`,
            attrs: {
              name: value && String(value),
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
