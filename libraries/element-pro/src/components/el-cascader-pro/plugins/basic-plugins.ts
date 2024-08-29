import _ from 'lodash';
import dayjs from 'dayjs';

import { $render, createUseUpdateSync } from '@lcap/vue2-utils';

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils';
export const useUpdateSync = createUseUpdateSync();

function listToTree(list, parentId = null, parentField, valueField) {
  const tree = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const item of list) {
    if (item[parentField] === parentId) {
      const children = listToTree(
        list,
        item[valueField],
        parentField,
        valueField,
      );
      if (children.length > 0) {
        item.children = children;
      }
      tree.push(item);
    }
  }
  return tree;
}

export const useSelect = {
  props: ['valueField', 'labelField', 'data'],
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
      return listToTree(data, null, parentField.value, valueField.value);
    });
    const keys = props.useComputed('keys', (v) => (_.isObject(v) ? v : {}));
    return {
      options,
      keys: {
        value: valueField.value,
        label: textField.value,
        children: childrenField.value,
        ...keys.value,
      },
    };
  },
};
