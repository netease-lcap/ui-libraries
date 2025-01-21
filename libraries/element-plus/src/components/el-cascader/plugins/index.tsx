/* eslint-disable no-shadow */
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
import {
  useRequestDataSource, useHandleMapField, useFormatDataSource, useDataSourceToTree,
} from '@/plugins/common/dataSource';

export function handleDataSource(props, { useState, useEffect, useMemo }) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const parentField = props.get('parentField');
  const deletePropsList = props
    .get($deletePropsList, [])
    .concat(['textField', 'valueField', 'parentField', 'childrenField', 'props']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig, {}, { useState, useEffect, useMemo });
  const dataSource = useHandleMapField(
    { textField, valueField, dataSource: useFormatDataSource(data, { useMemo }) },
    { useMemo },
  );
  const TreeData = useMemo(() => useDataSourceToTree(dataSource, parentField, valueField), [dataSource, parentField, valueField]);
  const selfRef = useMemo(() => _.assign(ref, { reload, data: TreeData }), [TreeData, reload, ref]);
  const dataSourceResult = _.isEmpty(TreeData) ? {} : { options: TreeData };

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    ...dataSourceResult,
  };
}
export function handleValue(props, { useState, useEffect }) {
  const [value, setValue] = useState('');
  const propsValue = props.get('value', value);
  const onInputProps = props.get('onInput', () => { });
  const deleteList = props.get('deleteList') ?? [];
  const emit = props.get('emit');

  return {
    deleteList: [...deleteList, 'value'],
    onChange: _.wrap(onInputProps, (fn, ...arg) => {
      emit('update:value', ...arg);
      _.attempt(fn, ...arg);
      setValue(arg[0]);
    }),
    modelValue: propsValue,
  };
}
