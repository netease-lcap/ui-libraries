import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import { ProFormSelect, ProFormSelectProps } from '@ant-design/pro-components';
import { $deletePropsList } from '@/plugins/constants';
import style from '../index.module.less';
import { SelectOption } from '@/index';
import {
  useRequestDataSource, useHandleMapField, useFormatDataSource,
} from '@/plugins/common/dataSource';

export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.select, className),
  };
}

export function useHandleFormItemComponent(props) {
  return {
    FormItemComponent: ProFormSelect,
  };
}
useHandleFormItemComponent.order = 2;

export function useHandleChildren(props) {
  const childrenProps = props.get('children');
  const dataSourceProps = props.get('dataSource');
  const dataSource = React.useMemo(() => React.Children.map(childrenProps, (item) => {
    if (item.type === SelectOption) {
      return _.omit(item.props, 'children');
    }
    return null;
  })?.filter(Boolean), [childrenProps]);
  return { dataSource: dataSourceProps ?? dataSource, children: null };
}
useHandleChildren.order = 2;

export function useHandleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', 'dataSource', 'parentField', 'childrenField']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const selfRef = React.useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceResult = _.isEmpty(dataSource) ? {} : { options: dataSource };
  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    ...dataSourceResult,
  };
}
