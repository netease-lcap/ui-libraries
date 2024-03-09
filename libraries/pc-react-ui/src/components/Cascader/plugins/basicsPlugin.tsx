import classnames from 'classnames';
import { useRequest } from 'ahooks';
import _ from 'lodash';
import React from 'react';
import { $deletePropsList } from '@/plugins/constants';
import style from '../index.module.less';
import {
  useHandleDataSourceToRequest, useHandleMapField, useFormatDataSource, useDataSourceToTree,
} from '@/plugins/common/dataSource';

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
  const parentField = props.get('parentField');
  const childrenField = props.get('childrenField');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', 'dataSource', 'parentField', 'childrenField']);
  const ref = props.get('ref');
  const dataSourceRequest = useHandleDataSourceToRequest(dataSourceProps);
  const { data, run: reload, loading } = useRequest(dataSourceRequest);
  React.useEffect(() => { reload(); }, [dataSourceProps]);
  const dataSourceFormat = useFormatDataSource(data);
  const dataSource = useHandleMapField({ textField, valueField, dataSource: dataSourceFormat });
  const TreeData = useDataSourceToTree(dataSource, parentField, valueField);
  const selfRef = React.useMemo(() => _.assign(ref, { reload, data: TreeData }), [TreeData, reload, ref]);
  const dataSourceResult = _.isEmpty(dataSource) ? {} : { options: TreeData };
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
