import classnames from 'classnames';
import { useRequest } from 'ahooks';
import _ from 'lodash';
import React from 'react';
import { $deletePropsList, $dataSourceField } from '@/plugins/constants';
import style from '../index.module.less';
import { useHandleDataSourceToRequest, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

function useHandleTransform(props) {
  const deletePropsList = props.get($deletePropsList, []).concat(['dataSource', 'childrenField']);
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const childrenField = props.get('childrenField', 'children');
  const fieldNames = props.get('fieldNames');
  return {
    [$deletePropsList]: deletePropsList,
    [$dataSourceField]: 'options',
    // fieldNames: {
    //   label: textField,
    //   value: valueField,
    //   children: childrenField,
    //   ...fieldNames,
    // },
  };
}

export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.cascader, className),
  };
}
export function useHandleDataSource(props) {
  const dataSourceProps = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField']);
  const ref = props.get('ref');
  const dataSourceRequest = useHandleDataSourceToRequest(dataSourceProps);
  const { data, run: reload, loading } = useRequest(dataSourceRequest);
  const dataSourceFormat = useFormatDataSource(data);
  const dataSource = useHandleMapField({ textField, valueField, dataSource: dataSourceFormat });
  const selfRef = React.useMemo(() => _.assign(ref, { reload, data }), [data, reload, ref]);
  const dataSourceResult = _.isEmpty(dataSource) ? {} : { options: dataSource };
  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    ...dataSourceResult,
  };
}
