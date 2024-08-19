/* 组件功能扩展插件 */
import TabPane from 'element-ui/lib/tab-pane';
import { at } from 'lodash';
import type { NaslComponentPluginOptions } from '@lcap/nasl-hoc-vue/index';

export { useDataSource, useInitialLoaded } from '@lcap/nasl-hoc-vue/index';

export const useExtendsPlugin: NaslComponentPluginOptions = {
  props: ['data', 'titleField', 'valueField', 'tabPaneProps'],
  setup: ({ get: propGet }, { h }) => {
    return {
      onTabClick(tab) {
        const onTabClick = propGet('onTabClick');
        if (typeof onTabClick === 'function') {
          onTabClick({
            active: tab.active,
            loaded: tab.loaded,
            isClosable: tab.isClosable,
            value: tab.paneName,
          });
        }
      },
      onEdit(value, action) {
        const [onTabEdit, onEdit] = propGet(['onTabEdit', 'onEdit']);
        if (typeof onTabEdit === 'function') {
          onTabEdit({
            value,
            action,
          });
        }

        if (typeof onEdit === 'function') {
          onEdit(value, action);
        }
      },
      slotDefault() {
        const data = propGet('data') || [];
        const slotDefault = propGet('slotDefault');
        const slotTabLabel = propGet('slotLabel');
        const slotTabContent = propGet('slotContent');
        const titleField = propGet('titleField') || 'title';
        const valueField = propGet('valueField') || 'value';
        const tabPaneProps = propGet<(c: any) => any>('tabPaneProps') || (() => ({}));
        if (!Array.isArray(data) || data.length === 0) {
          return typeof slotDefault === 'function' ? slotDefault() : null;
        }

        return data.map((item, i) => {
          const [value, title] = at(item, [valueField, titleField]);
          const current = {
            item,
            index: i,
            rowIndex: i,
            value,
          };

          const childNodes: any[] = [];
          const contents = typeof slotTabContent === 'function' ? slotTabContent(current) : [];
          const titleVNodes = typeof slotTabLabel === 'function' ? slotTabLabel(current) : [];
          const props = tabPaneProps(current);

          childNodes.push(...contents);
          if (Array.isArray(titleVNodes) && titleVNodes.length > 0) {
            childNodes.push(
              h('template', { slot: 'label' }, titleVNodes),
            );
          }

          return h(TabPane, {
            key: value ? String(value) : `index_${i}`,
            attrs: {
              ...props,
              name: value && String(value),
              label: title,
            },
          }, [
            ...contents,
          ]);
        });
      },
    };
  },
};
