import React from 'react';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';
import { $deletePropsList, $dataSourceField } from '@/plugins/constants';

export function useHandleTransform(props) {
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', 'items']);
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'key');
  return {
    [$deletePropsList]: deletePropsList,
    [$dataSourceField]: 'items',
    fieldNames: {
      label: textField,
      value: valueField,
    },
  };
}

// }

export function useMergeMenu(props) {
  const menuItem = props.get('menuItem');
  console.log(menuItem, 'munuItem');
  const menu = props.get('menu');
  const items = props.get('items', []);
  return {
    menu: {
      ...menu,
      items,
    },
  };
}
useMergeMenu.order = 6;
