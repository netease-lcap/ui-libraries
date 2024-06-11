import classnames from 'classnames';
import React from 'react';
import _ from 'lodash';
import style from '../index.module.less';
import {
  useRequestDataSource, useHandleMapField, useFormatDataSource,
} from '@/plugins/common/dataSource';

import {
  $labelKey, $valueKey, $dataSourceField, $deletePropsList,
} from '@/plugins/constants';

export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.tabs, className),
  };
}
export function useHandleDataSource(props) {
  const dataSourceProps = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'key');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', 'dataSource', 'parentField', 'childrenField']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataSourceProps);
  const dataSourceFormat = useFormatDataSource(data);
  const dataSource = useHandleMapField({
    textField, valueField, dataSource: dataSourceFormat, value: 'key',
  });
  const selfRef = React.useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceResult = _.isEmpty(dataSource) ? {} : { items: dataSource };
  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    ...dataSourceResult,
  };
}

export function useHandleRender(props) {
  const titleRender = props.get('titleRender');
  const contentRender = props.get('contentRender');
  const itemsProps = props.get('items');
  const items = React.useMemo(() => {
    return _.map(itemsProps, (item, index) => {
      return {
        ...item,
        key: _.isEmpty(item.key) ? index : item.key,
        label: _.isFunction(titleRender) ? titleRender({ item, index }) : item.label,
        children: _.isFunction(contentRender) ? contentRender({ item, index }) : item.children,
      };
    });
  }, [itemsProps, titleRender, contentRender]);
  const itemsResult = _.isEmpty(items) ? {} : { items };
  return {
    ...itemsResult,
  };
}
useHandleRender.order = 5;
