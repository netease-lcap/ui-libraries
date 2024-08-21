/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/nasl-hoc-vue/plugin';
import CollapseItem from 'element-ui/lib/collapse-item';
import { at } from 'lodash';

export { useDataSource, useInitialLoaded } from '@lcap/nasl-hoc-vue/index';

export const useDataSourceRender: NaslComponentPluginOptions = {
  props: ['data', 'valueField'],
  setup({ get: propGet }, { h }) {
    return {
      slotDefault: () => {
        const slotDefault = propGet('slotDefault');
        const slotItemTitle = propGet('slotTitle');
        const slotItemContent = propGet('slotContent');
        const data = propGet('data') || [];
        const valueField = propGet('valueField') || 'value';
        const tabPaneProps = propGet<(c: any) => any>('tabPaneProps') || (() => ({}));
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
          const titleVNodes = typeof slotItemTitle === 'function' ? slotItemTitle(current) : [];
          const props = tabPaneProps(current);

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
