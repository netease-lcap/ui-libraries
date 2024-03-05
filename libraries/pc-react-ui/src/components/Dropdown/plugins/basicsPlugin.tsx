import React from 'react';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';
import { MenuItem } from '@/index';
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
  const menuItem = React.Children.toArray(props.get('menuItem'));
  const ItemsProps = _.filter(menuItem, (item) => React.isValidElement(item) && item.type === MenuItem).map((item) => item.props);
  const menu = props.get('menu');
  const items = props.get('items', ItemsProps);
  return {
    menu: {
      ...menu,
      items,
    },
  };
}
useMergeMenu.order = 6;