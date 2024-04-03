import React from 'react';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';
import { MenuItem, Icon } from '@/index';
import { $deletePropsList, $dataSourceField } from '@/plugins/constants';

export function useHandleTransform(props) {
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', 'items']);
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'key');
  return {
    [$deletePropsList]: deletePropsList,
    [$dataSourceField]: 'items',
    // fieldNames: {
    //   label: textField,
    //   value: valueField,
    // },
  };
}

// }

export function useMergeMenu(props) {
  const fragment = props.get('menuItem');
  const menuItem = React.Children.toArray(_.get(fragment, 'props.children', []));
  // console.log(menuItem, 'menuItem');
  const ItemsProps = _.filter(menuItem, (item) => React.isValidElement(item) && item.type === MenuItem)?.map((item) => {
    const { icon } = item.props;
    return {
      ..._.omit(item.props, 'children'),
      ..._.isNil(icon) ? {} : { icon: <Icon name={icon} /> },
    };
  });
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
