import React from 'react';
import _ from 'lodash';
import { Space } from 'antd';
import { MenuItem, Icon } from '@/index';
import {
  useRequestDataSource, useHandleMapField, useFormatDataSource,
} from '@/plugins/common/dataSource';
import { useHandleLink } from '@/plugins/common/index';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleDataSource(props) {
  const dataSourceProps = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', 'dataSource']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataSourceProps);
  const dataSourceFormat = useFormatDataSource(data);
  const dataSource = useHandleMapField({ textField, valueField, dataSource: dataSourceFormat });
  const selfRef = React.useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceResult = _.isEmpty(dataSource) ? {} : { items: dataSource };
  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    ...dataSourceResult,
  };
}

export function useMergeMenu(props) {
  const fragment = props.get('menuItem');
  const menuItem = React.Children.toArray(_.get(fragment, 'props.children', []));
  const handleLink = useHandleLink();
  function childToJson(children) {
    return React.Children.map(children, (child) => {
      if (child?.type !== MenuItem) return undefined;
      const selfChildren = _.isNil(child.props.children) ? {} : { children: childToJson(child.props.children) };
      const childrenProps = _.isEmpty(selfChildren.children) ? {} : selfChildren;
      const onClickPorps = child.props.onClick;
      const icon = _.isNil(child.props.icon) ? {} : { icon: <Icon name={child.props.icon} /> };
      const label = child.props.labelIsSlot ? child.props.labelSlot : child.props.label;
      return {
        key: child.props?.destination ?? child.props?.path,
        ...child.props,
        ...childrenProps,
        ...icon,
        label,
        onClick: _.wrap(onClickPorps, (fn, arg) => {
          if (_.isFunction(fn)) {
            _.attempt(fn, arg);
            return;
          }
          handleLink(arg.key, child.props?.target);
        }),
      };
    }).filter(Boolean);
  }
  const ItemsProps = childToJson(menuItem);
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
export function useHandleChildren(props) {
  const BaseComponent = props.get('render');
  const render = React.useCallback(React.forwardRef((localProps: any, ref) => {
    return (
      <BaseComponent {...localProps} ref={ref}>
        <Space>
          {localProps.children}
        </Space>
      </BaseComponent>
    );
  }), [BaseComponent]);
  return {
    render,
  };
}
