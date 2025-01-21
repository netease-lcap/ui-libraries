/* eslint-disable no-shadow */
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
import {
  useRequestDataSource, useHandleMapField, useFormatDataSource,
} from '@/plugins/common/dataSource';

export function handleDataSource(props, { useState, useEffect, useMemo }) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');

  const slots = props.get('slots');
  const deletePropsList = props
    .get($deletePropsList, [])
    .concat(['textField', 'valueField', 'parentField', 'childrenField', 'props']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig, {}, { useState, useEffect, useMemo });
  const dataSource = useHandleMapField(
    { textField, valueField, dataSource: useFormatDataSource(data, { useMemo }) },
    { useMemo },
  );
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceSlots = _.isNil(dataConfig) ? {} : {
    default: () => _.map(dataSource, (item) => (<el-checkbox {...item} />)),
  };

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    slots: _.assign(slots, dataSourceSlots),
  };
}
export function handleValue(props, { useState, useEffect }) {
  const [value, setValue] = useState('');
  const propsValue = props.get('value', value);
  // const modelValue = props.get('modelValue');
  const onInputProps = props.get('onChange', () => { });
  const deleteList = props.get('deleteList') ?? [];
  const emit = props.get('emit');

  // console.log(modelValue, 'modelValue=');
  return {
    deleteList: [...deleteList, 'value'],
    onChange: _.wrap(onInputProps, (fn, ...arg) => {
      emit('update:value', ...arg);
      _.attempt(fn, ...arg);
      setValue(arg[0]);
    }),

    // modelValue: _.isEmpty(modelValue) ? propsValue : modelValue ?? propsValue,
    modelValue: propsValue,
  };
}
