/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import { Slot } from '@lcap/vue2-utils/plugins/types';
import CarouselItem from 'element-ui/lib/carousel-item';
import { at, isNil } from 'lodash';

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils/plugins';

export const useExtendsPlugin: NaslComponentPluginOptions = {
  props: ['data', 'nameField', 'labelField'],
  setup: (props, { h }) => {
    const settedDataSouce = props.useComputed('dataSource', (v) => {
      return !isNil(v) && (typeof v === 'function' || Array.isArray(v) || Array.isArray(v.list));
    });

    const renderDataSource = () => {
      const data = props.get<any[]>('data') || [];
      const slotItem = props.get<Slot>('slotItem') || (() => []);
      const [nameField = 'name', labelField] = props.get<string[]>(['nameField', 'labelField']);

      return data.map((item, i) => {
        const current = {
          item,
          index: i,
          rowIndex: i,
        };
        const [name] = at(item, nameField);
        let label: any;
        if (labelField) {
          // eslint-disable-next-line prefer-destructuring
          label = at(item, labelField)[0];
        }

        return h(CarouselItem, {
          attrs: {
            name,
            label,
          },
        }, slotItem(current));
      });
    };

    return {
      onChange: (index, oldIndex) => {
        // 获取当前绑定 change 事件
        const onChange = props.get('onChange');

        if (typeof onChange === 'function') {
          onChange({
            index,
            oldIndex,
          });
        }
      },
      slotDefault: () => {
        if (settedDataSouce.value) {
          return renderDataSource();
        }
        const slotDefault = props.get<Slot>('slotDefault') || (() => []);
        return slotDefault();
      },
    };
  },
  order: 2,
};
