/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import _ from 'lodash';
import { useControllableValue } from 'ahooks';
import { $deletePropsList } from '@/plugins/constants';
import { Col, FormItem, Checkbox } from '@/index';
import { FORMITEMPROPSFIELDS } from '@/components/Form/constants';
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
    setRef: (selfProps) => selfProps,
    ref: _.assign(ref, { value, setValue: onChange }),
    onChange,
  };
}
useHandleRef.order = 1;
function useHandleChildren(props) {
  const childrenProps = props.get('children');
  const dataSourceProps = props.get('dataSource');
  const dataSource = React.useMemo(() => React.Children.map(childrenProps, (item) => {
    if (item.type === Checkbox) {
      return item.props;
    }
    return null;
  })?.filter(Boolean), [childrenProps]);
  return { dataSource: dataSourceProps ?? dataSource, children: null };
}

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

export function useHandleFormWarplabel(props) {
  const deletePropsList = props.get($deletePropsList).concat('labelIsSlot', 'labelText');
  const labelIsSlot = props.get('labelIsSlot');
  const labelProps = props.get('label');
  const labelText = props.get('labelText');
  const label = labelIsSlot ? labelProps : labelText;
  return {
    [$deletePropsList]: deletePropsList,
    label,
  };
}

export function useHandleFormItemProps(props) {
  const BaseComponent = props.get('render');
  const render = React.useCallback((selfProps) => {
    const formItemProps = _.pick(selfProps, FORMITEMPROPSFIELDS);
    const fieldProps = _.omit(selfProps, FORMITEMPROPSFIELDS);
    return <BaseComponent {...{ ...formItemProps, fieldProps }} />;
  }, [BaseComponent]);
  return {
    render,
  };
}

export * from './lowCode';
