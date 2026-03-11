import _, { isFunction, get as lodashGet } from 'lodash';
import { listToTree } from '@lcap/vue2-utils/utils';
import { createUseUpdateSync } from '@lcap/vue2-utils';
import { computed } from '@vue/composition-api';
import { NaslComponentPluginOptions, Slot } from '@lcap/vue2-utils/plugins/types';

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils';

export { useFormFieldClass } from '../../../plugins/use-form-field-class';
export { usePopupTheme } from '../../../plugins/use-popup-theme';

export const useUpdateSync = createUseUpdateSync();

export const useTreeSelect: NaslComponentPluginOptions = {
  props: ['valueField', 'labelField', 'parentField', 'data', 'optionIsSlot', 'childrenField'],
  setup(props, ctx) {
    const valueField = props.useComputed('valueField', (v) => v || 'value');
    const textField = props.useComputed('textField', (v) => v || 'label');
    const parentField = props.useComputed('parentField', (v) => v);

    const childrenField = props.useComputed(
      'childrenField',
      (v) => v || 'children',
    );
    const data = props.useComputed('data', (dataSource) => {
      if (_.isEmpty(dataSource)) return undefined;
      if (_.isNil(parentField.value)) return dataSource;
      return listToTree(dataSource, {
        valueField: valueField.value,
        parentField: parentField.value,
        childrenField: childrenField.value,
      });
    });
    const keys = props.useComputed('keys', (v) => (_.isObject(v) ? v : {}));

    const renderLabel = (h, node) => {
      const [optionIsSlot, slotOption] = props.get<[boolean, Slot]>(['optionIsSlot', 'slotOption']);

      const defaultContent = [
        h('span', {}, [lodashGet(node.data, textField.value)]),
      ];
      if (!optionIsSlot || !isFunction(slotOption)) {
        return defaultContent;
      }

      return slotOption({
        item: node.data,
      }) || defaultContent;
    };

    const treeProps = computed(() => {
      return {
        label: renderLabel,
      };
    });

    return {
      data,
      keys: computed(() => ({
        value: valueField.value,
        label: textField.value,
        children: childrenField.value,
        ...keys.value,
      })),
      treeProps,
    };
  },
};
