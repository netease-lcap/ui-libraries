import classnames from 'classnames';
import React from 'react';
import _ from 'lodash';
import { useControllableValue } from 'ahooks';
import { TreeSelect } from 'antd';
import { $deletePropsList } from '@/plugins/constants';
import FormContext from '@/components/Form/form-context';
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
    showSearch: false,
    showCheckedStrategy: TreeSelect.SHOW_ALL,
  };
}
export function useHandleValueTransform(props) {
  const { isForm } = React.useContext(FormContext);
  if (!isForm) return {};
  return {
    transform(value, name) {
      return {
        [name]: Array.isArray(value) ? value.map((item) => item.value) : value,
      };
    },
  };
}
export function useHandleControllableValue(props) {
  const [value, onChange] = useControllableValue(_.controllableValue(props));
  return {
    value,
    onChange(localValue) {
      const valueFormat = _.isArray(localValue) ? localValue.map((item) => item?.value ?? item) : localValue;
      onChange(valueFormat);
    },

  };
}
export function useHandleBasicsComponent() {
  return {
    BasicsComponent: TreeSelect,
  };
}
useHandleBasicsComponent.order = 2;
