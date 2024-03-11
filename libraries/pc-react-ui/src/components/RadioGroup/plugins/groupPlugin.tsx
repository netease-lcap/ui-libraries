/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
// import React from 'react';
import { useControllableValue } from 'ahooks';
import React from 'react';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
import {
  useRequestDataSource, useHandleMapField, useFormatDataSource,
} from '@/plugins/common/dataSource';

export function useHandleValue(props) {
  const onChangeProps = props.get('onChange');
  return {
    onChange: _.wrap(onChangeProps, (fn, e: React.ChangeEvent<HTMLInputElement>) => {
      _.attempt(fn, e?.target?.value, e);
    }),
  };
}

export function useHandleRef(props) {
  const ref = props.get('ref');
  const valueProps = props.get('value');
  const onChangeProps = props.get('onChange');
  const defaultValue = props.get('defaultValue');
  const [value, onChange] = useControllableValue(_.filterUnderfinedValue({ value: valueProps, onChange: onChangeProps, defaultValue }));
  return {
    value,
    onChange,
    ref: _.assign(ref, { value, setValue: onChange }),
  };
}
useHandleRef.order = 1;

export function useHandleDataSource(props) {
  const dataSourceProps = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const childrenField = props.get('childrenField');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', 'dataSource', 'parentField', 'childrenField']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataSourceProps);
  const dataSourceFormat = useFormatDataSource(data);
  const dataSource = useHandleMapField({ textField, valueField, dataSource: dataSourceFormat });
  const selfRef = React.useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceResult = _.isEmpty(dataSource) ? {} : { options: dataSource };
  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    ...dataSourceResult,
    fieldNames: {
      children: childrenField,
    },
  };
}
