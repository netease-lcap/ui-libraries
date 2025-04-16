import _, { isFunction } from 'lodash';
import { listToTree } from '@lcap/vue2-utils/utils';
import { createUseUpdateSync } from '@lcap/vue2-utils';
import { computed } from '@vue/composition-api';
import { NaslComponentPluginOptions, Slot } from '@lcap/vue2-utils/plugins/types.js';

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils';
export { useFormFieldClass } from '../../../plugins/use-form-field-class';
export { usePopupTheme } from '../../../plugins/use-popup-theme';
export const useUpdateSync = createUseUpdateSync();

export const useCascaderSelect: NaslComponentPluginOptions = {
  props: ['valueField', 'labelField', 'parentField', 'data', 'optionIsSlot'],
  setup(props, ctx) {
    const valueField = props.useComputed('valueField', (v) => v || 'value');
    const textField = props.useComputed('textField', (v) => v || 'label');
    const parentField = props.useComputed('parentField', (v) => v);

    const childrenField = props.useComputed(
      'childrenField',
      (v) => v || 'children',
    );

    const options = props.useComputed('data', (data) => {
      if (_.isEmpty(data)) return undefined;
      if (_.isNil(parentField.value)) return data;
      return listToTree(data, {
        valueField: valueField.value,
        parentField: parentField.value,
        childrenField: childrenField.value,
      });
    });

    const keys = props.useComputed('keys', (v) => (_.isObject(v) ? v : {}));

    return {
      options,
      class: 'cw-form-field',
      keys: computed(() => ({
        value: valueField.value,
        label: textField.value,
        children: childrenField.value,
        ...keys.value,
      })),
      slotOptionLabel: ({ item, index }) => {
        const [optionIsSlot, slotOption] = props.get<[boolean, Slot]>(['optionIsSlot', 'slotOption']);

        if (optionIsSlot && isFunction(slotOption)) {
          return slotOption({
            item,
            index,
          });
        }

        return null;
      },
      slotOption: () => null,
    };
  },
};
