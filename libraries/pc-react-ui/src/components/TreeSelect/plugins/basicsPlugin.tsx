import classnames from 'classnames';
import React from 'react';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
import {
  useRequestDataSource, useHandleMapField, useFormatDataSource, useDataSourceToTree,
} from '@/plugins/common/dataSource';
import style from '../index.module.less';

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
    textField, valueField, dataSource: dataSourceFormat,
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
export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.treeSelect, className),
  };
}
