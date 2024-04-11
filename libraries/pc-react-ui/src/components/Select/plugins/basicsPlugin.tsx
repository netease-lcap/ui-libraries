import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import { $deletePropsList } from '@/plugins/constants';
import style from '../index.module.less';
import FormContext from '@/components/Form/form-context';
import { Col, FormItem, SelectOption } from '@/index';
import { FORMITEMPROPSFIELDS } from '@/components/Form/constants';
import { COLPROPSFIELDS } from '@/components/Row/constants';
import {
  useRequestDataSource, useHandleMapField, useFormatDataSource,
} from '@/plugins/common/dataSource';

export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.select, className),
  };
}

export function useHandleChildren(props) {
  const childrenProps = props.get('children');
  const dataSourceProps = props.get('dataSource');
  const dataSource = React.useMemo(() => React.Children.map(childrenProps, (item) => {
    if (item.type === SelectOption) {
      return _.omit(item.props, 'children');
    }
    return null;
  })?.filter(Boolean), [childrenProps]);
  return { dataSource: dataSourceProps ?? dataSource, children: null };
}
useHandleChildren.order = 2;

export function useHandleDataSource(props) {
  const dataSourceProps = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
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
  };
}
