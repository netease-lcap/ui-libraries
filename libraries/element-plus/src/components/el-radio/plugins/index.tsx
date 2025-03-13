/* eslint-disable no-shadow */
import _ from 'lodash';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useState, useMemo } from '@/plugins/hooks';

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList, []).concat($dataSourceDeleteField);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig, {});

  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceSlots = useMemo(
    () => (_.isNil(dataConfig)
        ? {}
        : {
            default: () => _.map(dataSource, (item) => (
              <el-radio {...item}>{slots.item ? slots.item({ item }) : item.label}</el-radio>
              )),
          }),
    [dataSource, slots, dataConfig],
  );

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data,
    slots: _.assign(slots, dataSourceSlots),
  };
}
export function handleValue(props) {
  const [value, setValue] = useState([]);
  const propsValue = _.isEmpty(props.get('modelValue')) ? value : props.get('modelValue');
  const onChangeProps = props.get('onChange', () => {});
  const emit = props.get('emit');
  return {
    onChange: _.wrap(onChangeProps, (fn, value) => {
      _.attempt(fn, value);
      emit('update:modelValue', value);
      setValue(value);
    }),
    modelValue: propsValue,
    formTagName: 'el-form-radio-group',
  };
}
