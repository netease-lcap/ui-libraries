import _ from 'lodash';
import dayjs from 'dayjs';

import { $render, createUseUpdateSync } from '@lcap/vue2-utils';

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils';
export const useUpdateSync = createUseUpdateSync();

function listToTree(dataSource, parentField, valueField = 'value') {
  if (_.isNil(parentField)) return dataSource;
  const map = new Map<string, Record<string, any>>(
    dataSource.map((item) => [_.get(item, valueField), item]),
  );
  const tree = [] as any[];
  dataSource.forEach((item) => {
    if (map.get(_.get(item, parentField))) {
      const parent = map.get(_.get(item, parentField));
      if (!parent) return;
      if (!Array.isArray(parent.children)) parent.children = [];
      parent.children.push(map.get(_.get(item, valueField)));
    } else {
      tree.push(map.get(_.get(item, valueField)));
    }
  });
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
      return listToTree(data, parentField.value, valueField.value);
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
