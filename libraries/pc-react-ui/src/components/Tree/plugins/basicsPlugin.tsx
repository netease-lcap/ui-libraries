import _ from 'lodash';
import { useControllableValue } from 'ahooks';
import React from 'react';
import {
  useRequestDataSource, useHandleMapField, useFormatDataSource, useDataSourceToTree,
} from '@/plugins/common/dataSource';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleValue(props) {
  const valueProps = props.get('value');
  const onChangeProps = props.get('onChange');
  const refProps = props.get('ref');
  const [value, onChange] = useControllableValue(_.filterUnderfinedValue({ value: valueProps, onChange: onChangeProps }));
  const ref = _.assign(refProps, { value });
  return {
    value,
    onChange,
    ref,
  };
}
useHandleValue.order = 1;
export function useHandleDataSource(props) {
  const dataSourceProps = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const parentField = props.get('parentField');
  const childrenField = props.get('childrenField');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', 'dataSource', 'parentField', 'childrenField']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataSourceProps);
  const dataSourceFormat = useFormatDataSource(data);
  const dataSource = useHandleMapField({
    textField, valueField, dataSource: dataSourceFormat, label: 'title', value: 'key',
  });
  const TreeData = useDataSourceToTree(dataSource, parentField, valueField);
  const selfRef = React.useMemo(() => _.assign(ref, { reload, data: TreeData }), [TreeData, reload, ref]);
  const dataSourceResult = _.isEmpty(dataSource) ? {} : { treeData: TreeData };
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
