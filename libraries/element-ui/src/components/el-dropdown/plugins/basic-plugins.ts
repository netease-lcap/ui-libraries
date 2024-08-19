/* 组件功能扩展插件 */
import { at } from 'lodash';
import { NaslComponentPluginOptions } from '@lcap/nasl-hoc-vue/index';
import { ElDropdownMenu, ElDropdownItem } from '../index';
import ElText from '../../el-text';

export { useDataSource, useInitialLoaded } from '@lcap/nasl-hoc-vue/index';

export const useExtendsPlugin: NaslComponentPluginOptions = {
  props: ['data', 'textField', 'valueField', 'iconField', 'itemProps'],
  setup: (props, { h }) => {
    return {
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

        const itemVNodes = typeof slotItems === 'function' ? slotItems() : [];
        if ((!slotItems || !Array.isArray(itemVNodes) || itemVNodes.length === 0) && data.length === 0) {
          return typeof slotDropdown === 'function' ? slotDropdown() : [];
        }

        if (data.length > 0) {
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
    };
  },
};
