/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import _ from 'lodash';
import { useControllableValue } from 'ahooks';
import { ProFormCheckbox } from '@ant-design/pro-components';
import { $deletePropsList } from '@/plugins/constants';
import {
  useRequestDataSource, useHandleMapField, useFormatDataSource,
} from '@/plugins/common/dataSource';

export function useHandleRef(props) {
  const ref = props.get('ref');
  const valueProps = props.get('value');
  const onChangeProps = props.get('onChange');
  const defaultValue = props.get('defaultValue');
  const [value, onChange] = useControllableValue(_.filterUnderfinedValue({ value: valueProps, onChange: onChangeProps, defaultValue }));
  return {
    value,
    ref: _.assign(ref, { value, setValue: onChange }),
    onChange,
  };
}
useHandleRef.order = 1;

export function useHandleBasicsComponent(props) {
  const deletePropsList = props.get($deletePropsList, []).concat(['FormItemComponent']);
  return {
    [$deletePropsList]: deletePropsList,
    FormItemComponent: ProFormCheckbox.Group,
  };
}
useHandleBasicsComponent.order = 2;

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
  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    options: dataSource,
  };
}

export function useHandleRemoveRef(props) {
  const BaseComponent = props.get('render');
  const render = React.useCallback((selfProps) => {
    return <BaseComponent {..._.omit(selfProps, 'ref')}>{selfProps.children}</BaseComponent>;
  }, [BaseComponent]);
  return {
    render,
  };
}

export * from './lowCode';
export * from '@/components/Form/plugins/formItemPlugin';
export * from './stylePlugin';
