import classnames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { useControllableValue } from 'ahooks';
import { $deletePropsList } from '@/plugins/constants';
import FormContext from '@/components/Form/form-context';
import { Col, FormItem } from '@/index';
import { FORMITEMPROPSFIELDS } from '@/components/Form/constants';
import { COLPROPSFIELDS } from '@/components/Row/constants';
import style from '../index.module.less';
import {
  useRequestDataSource, useHandleMapField, useFormatDataSource, useDataSourceToTree,
} from '@/plugins/common/dataSource';

export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.cascader, className),
  };
}
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

function useHandleFormWarplabel(props) {
  const { width, isForm, colSpan } = React.useContext(FormContext);
  const deletePropsList = props.get($deletePropsList).concat('labelIsSlot', 'labelText');
  const labelIsSlot = props.get('labelIsSlot');
  const labelProps = props.get('label');
  const labelText = props.get('labelText');
  const labelWidth = props.get('labelWidth');
  const spanProps = props.get('span');
  const labelCol = _.isNil(labelWidth) ? {} : { labelCol: { flex: `${labelWidth}px` } };
  const label = labelIsSlot ? labelProps : labelText;
  const span = _.defaults({ span: spanProps }, { span: colSpan });
  const formResult = isForm ? {
    width, label, ...labelCol, ...span,
  } : {};
  return {
    [$deletePropsList]: deletePropsList,
    ...formResult,
  };
}
export function useHandleFormItemProps(props) {
  const BaseComponent = props.get('render');
  const render = React.useCallback((selfProps) => {
    const formItemProps = _.pick(selfProps, FORMITEMPROPSFIELDS);
    const colProps = _.pick(selfProps, COLPROPSFIELDS);
    const fieldProps = _.omit(selfProps, [...FORMITEMPROPSFIELDS, ...COLPROPSFIELDS]);
    return <BaseComponent {...{ ...formItemProps, fieldProps, colProps }} />;
  }, [BaseComponent]);
  return {
    render,
  };
}
