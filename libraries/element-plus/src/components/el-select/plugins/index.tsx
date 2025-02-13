/* eslint-disable no-shadow */
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

export function handleDataSource(props, { useState, useEffect, useMemo }) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const slots = props.get('slots');
  const deletePropsList = props
    .get($deletePropsList, [])
    .concat(['dataSource', 'textField', 'valueField', 'parentField', 'childrenField']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig, {}, { useState, useEffect, useMemo });
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
  };
}
export function handleValue(props, { useState }) {
  const [value, setValue] = useState('');
  const propsValue = props.get('modelValue') || value;
  const onChangeProps = props.get('onChange', () => {});
  const emit = props.get('emit');
  const changeValue = props.get('modelValue') ? _.bind(emit, 'update:modelValue') : setValue;

  return {
    onChange: _.wrap(onChangeProps, (fn, value) => {
      _.attempt(fn, value);
      changeValue(`${value}`);
    }),
    modelValue: propsValue,
  };
}
