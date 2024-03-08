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
  const fragment = props.get('menuItem');
  const menuItem = React.Children.toArray(_.get(fragment, 'props.children', []));
  // console.log(menuItem.props.children, 'menuItem');
  console.log(menuItem, 'menuItem');
  const ItemsProps = _.filter(menuItem, (item) => React.isValidElement(item) && item.type === MenuItem)?.map((item) => ({ ..._.omit(item.props, 'children'), key: item.key }));
  const menu = props.get('menu');
  const items = props.get('items', ItemsProps);
  console.log(items, 'items');
  return {
    menu: {
      onClick(arg) {
        console.log(arg);
        if (!arg.key) return;
        if (_.isValidLink(arg.key)) {
          window.location.href = arg.key;
        }
        window.history.pushState({}, '', arg.key);
      },
      ...menu,
      items,
    },
  };
}
useMergeMenu.order = 6;
