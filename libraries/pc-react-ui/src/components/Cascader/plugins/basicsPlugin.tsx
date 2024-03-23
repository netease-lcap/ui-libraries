import classnames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { useControllableValue } from 'ahooks';
import { $deletePropsList } from '@/plugins/constants';
import FormContext, { QueryFormContext } from '@/components/Form/form-context';
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

function useHandleFormWarp(props) {
  const { isForm } = React.useContext(FormContext);
  const BaseComponent = props.get('render');
  const FormCascader = React.useCallback((selfProps) => {
    const nodepath = selfProps['data-nodepath'];
    return (
      <Col
        span={24}
        {..._.pick(selfProps, COLPROPSFIELDS)}
        data-nodepath={nodepath}
        data-tag-name="FormCascader"
        data-has-mutation="true"
      >
        <FormItem {..._.pick(selfProps, FORMITEMPROPSFIELDS)}>
          <BaseComponent {..._.omit(selfProps, [...FORMITEMPROPSFIELDS, ...COLPROPSFIELDS, 'data-nodepath', 'children'])} />
        </FormItem>
      </Col>
    );
  }, [BaseComponent]);
  const render = isForm ? FormCascader : BaseComponent;
  return {
    render,
  };
}

export function useHandleFormWarplabel(props) {
  const deletePropsList = props.get($deletePropsList).concat('labelIsSlot', 'labelText');
  const labelIsSlot = props.get('labelIsSlot');
  const labelProps = props.get('label');
  const labelText = props.get('labelText');
  const label = labelIsSlot ? labelProps : labelText;
  return {
    [$deletePropsList]: deletePropsList,
    label,
  };
}
export function useHandleFormItemProps(props) {
  const BaseComponent = props.get('render');
  const render = React.useCallback((selfProps) => {
    const formItemProps = _.pick(selfProps, FORMITEMPROPSFIELDS);
    const fieldProps = _.omit(selfProps, FORMITEMPROPSFIELDS);
    return <BaseComponent {...{ ...formItemProps, fieldProps }} />;
  }, [BaseComponent]);
  return {
    render,
  };
}
