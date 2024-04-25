import _ from 'lodash';
import React from 'react';
import { $deletePropsList } from '@/plugins/constants';
import { Icon } from '@/index';
import {
  useRequestDataSource, useHandleMapField, useFormatDataSource,
} from '@/plugins/common/dataSource';

export function useHandleDataSource(props) {
  const dataSourceProps = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', 'dataSource', 'parentField', 'childrenField']);
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

export function useHandleCurrent(props) {
  const value = props.get('value');
  return {
    current: value,
  };
}

export function useHandle(props) {
  const childrenProps = props.get('children');
  const BaseComponents = props.get('render');
  const children = React.Children.map(childrenProps, (item: any) => {
    if (React.isValidElement(item) && _.get(item, 'props.icon', false)) {
      return React.cloneElement(item, { icon: <Icon name={_.get(item, 'props.icon', undefined)} /> });
    }
    return item;
  });
  const render = React.useCallback(() => {
    return <BaseComponents>{children}</BaseComponents>;
  }, [children]);

  return {
    children,
    render,
  };
}
