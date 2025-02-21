/* eslint-disable no-shadow */
import _ from 'lodash';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import {
  useState, useEffect, useMemo, useRef,
} from '@/plugins/hooks';

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList, []).concat($dataSourceDeleteField, ['formTagName']);
  const ref = props.get('ref');
  const {
    data,
    run: reload,
    loading,
  } = useRequestDataSource(
    dataConfig,
    {},
    {
      useState,
      useEffect,
      useMemo,
      useRef,
    },
  );
  const dataSource = useHandleMapField(
    { textField, valueField, dataSource: useFormatDataSource(data, { useMemo }) },
    { useMemo },
  );
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceSlots = _.isNil(dataConfig)
    ? {}
    : {
      default: () => _.map(dataSource, (item) => <el-option {...item} />),
    };

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    slots: _.assign(slots, dataSourceSlots),

    formTagName: 'el-form-select',
  };
}
function handleValue(props, { useState }) {
  const [value, setValue] = useState('');
  const propsValue = props.get('modelValue') || value;
  const onChangeProps = props.get('onChange', () => {});
  const emit = props.get('emit');
  const changeValue = props.get('modelValue') ? _.bind(emit, 'update:modelValue') : setValue;

  return {
    onChange: _.wrap(onChangeProps, (fn, value) => {
      _.attempt(fn, value);
      changeValue(value);
    }),
    modelValue: propsValue,
  };
}
