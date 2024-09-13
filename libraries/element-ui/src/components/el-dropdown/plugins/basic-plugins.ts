/* 组件功能扩展插件 */
import { at, isFunction, isNil } from 'lodash';
import { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/index';
import { ElDropdownMenu, ElDropdownItem } from '../index';
import ElText from '../../el-text';

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils/plugins/index';

export const useExtendsPlugin: NaslComponentPluginOptions = {
  props: ['data', 'textField', 'valueField', 'iconField', 'itemProps', 'text'],
  setup: (props, { h }) => {
    const currentSize = props.useComputed(['size'], (size) => {
      return size || 'small';
    });

    return {
      size: currentSize,
      slotDropdown: () => {
        const data = props.get<any[]>('data') || [];
        const [
          textField = 'text',
          valueField = 'value',
          iconField = 'icon',
        ] = props.get<string[]>([
          'textField',
          'valueField',
          'iconField',
        ]);

        const [slotDropdown, slotItems] = props.get(['slotDropdown', 'slotItems']);
        const itemProps = props.get<(c: any) => any>('itemProps') || (() => ({}));

        let itemVNodes = typeof slotItems === 'function' ? slotItems() : [];
        if ((!slotItems || !Array.isArray(itemVNodes) || itemVNodes.length === 0) && data.length === 0) {
          return typeof slotDropdown === 'function' ? slotDropdown() : [];
        }

        if (!isNil(props.get('dataSource'))) {
          itemVNodes = [];
          itemVNodes.push(
            ...data.map((item, i) => {
              const [text, value, icon] = at(item, textField, valueField, iconField);
              let itemAttrs: any = {};
              if (typeof itemProps === 'function') {
                itemAttrs = itemProps({
                  item,
                  index: i,
                });
              }

              return h(ElDropdownItem, {
                attrs: {
                  ...itemAttrs,
                  command: value,
                  icon,
                },
              }, [
                h(ElText, { attrs: { text } }),
              ]);
            }),
          );
        }

        return [
          h(ElDropdownMenu, {}, itemVNodes),
        ];
      },
      slotDefault: () => {
        const slotDefault = props.get('slotDefault');
        const [splitButton, text = '下拉菜单'] = props.get<[boolean, string]>(['splitButton', 'text']);
        if (splitButton) {
          return [h('span', {}, text)];
        }

        const vnodes = isFunction(slotDefault) ? slotDefault() : [];

        return vnodes;
      },
    };
  },
};
