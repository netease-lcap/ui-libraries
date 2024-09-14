import { $deletePropList, createUseUpdateSync } from '@lcap/vue2-utils';
import type { NaslComponentPluginOptions, Slot } from '@lcap/vue2-utils/plugins/types';
import { listToTree } from '@lcap/vue2-utils/utils';
import { isFunction, get } from 'lodash';

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils';

export const useListToTree: NaslComponentPluginOptions = {
  order: 2,
  props: ['dataSource', 'data', 'valueField', 'parentField', 'childrenField', 'textField'],
  setup: (props) => {
    const data = props.useComputed('data', (value) => {
      const valueField = props.get<string>('valueField') || 'value';
      const parentField = props.get<string>('parentField') || 'parent';
      const childrenField = props.get<string>('childrenField') || 'children';

      return listToTree(value, {
        valueField,
        parentField,
        childrenField,
      });
    });

    const keys = props.useRef(
      ['valueField', 'childrenField', 'textField'],
      (valueField: string, childrenField: string, textField: string) => {
        return {
          label: textField,
          value: valueField,
          children: childrenField,
        };
      },
    );

    return {
      data,
      keys,
      [$deletePropList]: [],
    };
  },
};

export const useValue: NaslComponentPluginOptions = {
  props: ['value', 'checkable'],
  setup: (props) => {
    const value = props.useRef(['value', 'checkable'], (v, checkable) => {
      return checkable ? v : undefined;
    });

    const actived = props.useRef(['value', 'checkable'], (v, checkable) => {
      return checkable ? undefined : [v];
    });

    const activable = props.useComputed('checkable', (v) => !v);

    return {
      value,
      actived,
      activable,
      onChange: (v) => {
        const onChange = props.get('onChange');
        const onUpdateValue = props.get('update:value');

        value.value = v;

        // 多选时，更新value
        if (isFunction(onUpdateValue)) {
          onUpdateValue(v);
        }

        if (isFunction(onChange)) {
          onChange(v);
        }
      },
      onActive: (v) => {
        const onChange = props.get('onChange');
        const onUpdateValue = props.get('update:value');

        actived.value = v;

        // 单选时，更新value
        if (isFunction(onUpdateValue)) {
          onUpdateValue(v?.[0]);
        }

        if (isFunction(onChange)) {
          onChange(v?.[0]);
        }
      },
    };
  },
};

export const useIcon: NaslComponentPluginOptions = {
  props: ['icon'],
  setup: (props, { h }) => {
    const icon = props.get<string>('icon');
    if (icon) {
      return {
        icon: () => {
          return h('el-icon', {
            attrs: { name: icon },
          });
        },
      };
    }

    return {};
  },
};

export const useSlotLabel: NaslComponentPluginOptions = {
  props: ['textField', 'slotLeaf'],
  setup: (props, { h }) => {
    return {
      slotLabel: (current: any) => {
        const { data: item } = current?.node || {};
        const slot = props.get<Slot>('slotLeaf');
        const textField = props.get<string>('textField') || 'text';

        if (slot) {
          return slot({ item });
        }

        return h('el-text', {
          attrs: { text: get(item, textField) },
        });
      },
      [$deletePropList]: ['slotLeaf'],
    };
  },
};

export const useUpdateSync = createUseUpdateSync([
  { name: 'expanded', event: 'update:expanded' },
]);
