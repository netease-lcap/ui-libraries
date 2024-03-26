import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import { Icon, Col, FormItem } from '@/index';
import FormContext, { QueryFormContext } from '@/components/Form/form-context';
import { FORMITEMPROPSFIELDS } from '@/components/Form/constants';
import { $deletePropsList } from '@/plugins/constants';
import { COLPROPSFIELDS } from '@/components/Row/constants';

import style from '../index.module.less';

export function useHandleRef(props) {
  const onChangeProps = props.get('onChange');
  const result = {
    onChange: _.wrap(onChangeProps, (fn, e: React.ChangeEvent<HTMLInputElement>) => {
      fn(e?.target?.value, e);
    }),
  };
  return _.isFunction(onChangeProps) ? result : {};
}
useHandleRef.order = 1;

export function useHandlePrefix(props) {
  const prefixProps = props.get('prefix');
  return _.isNil(prefixProps) ? {} : { prefix: Icon(prefixProps) };
}
// const icon = props.get('icon');
export function useHandleSuffix(props) {
  const suffixProps = props.get('suffix');
  return _.isNil(suffixProps) ? {} : { suffix: Icon(suffixProps) };
}
export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.input, className),
  };
}

function useHandleFormWarp(props) {
  const { isForm } = React.useContext(FormContext);
  const BaseComponent = props.get('render');
  const FormInput = React.useCallback((selfProps) => {
    const nodepath = selfProps['data-nodepath'];
    return (
      <Col
        span={24}
        {..._.pick(selfProps, COLPROPSFIELDS)}
        data-nodepath={nodepath}
        data-tag-name="FormInput"
        data-has-mutation="true"
      >
        <FormItem {..._.pick(selfProps, FORMITEMPROPSFIELDS)}>
          <BaseComponent {..._.omit(selfProps, [...FORMITEMPROPSFIELDS, ...COLPROPSFIELDS, 'data-nodepath', 'children'])} />
        </FormItem>
      </Col>
    );
  }, [BaseComponent]);
  const render = isForm ? FormInput : BaseComponent;
  return {
    render,
  };
}

function useHandleQueryFormWarp(props) {
  const { isQueryForm } = React.useContext(QueryFormContext);
  const BaseComponent = props.get('render');
  const QueryFormInput = React.useCallback((selfProps) => {
    const nodepath = selfProps['data-nodepath'];
    return (
      <FormItem
        {..._.pick(selfProps, FORMITEMPROPSFIELDS)}
        data-nodepath={nodepath}
        data-tag-name="FormCascader"
        data-has-mutation="true"
      >
        <BaseComponent {..._.omit(selfProps, [...FORMITEMPROPSFIELDS, ...COLPROPSFIELDS, 'data-nodepath', 'children'])} />
      </FormItem>
    );
  }, [BaseComponent]);
  const render = isQueryForm ? QueryFormInput : BaseComponent;
  return {
    render,
  };
}

function useHandleFormWarplabel(props) {
  const { width, isForm } = React.useContext(FormContext);
  const deletePropsList = props.get($deletePropsList).concat('labelIsSlot', 'labelText');
  const labelIsSlot = props.get('labelIsSlot');
  const labelProps = props.get('label');
  const labelText = props.get('labelText');
  const labelWidth = props.get('labelWidth');
  const labelCol = _.isNil(labelWidth) ? {} : { labelCol: { flex: `${labelWidth}px` } };
  const label = labelIsSlot ? labelProps : labelText;
  const formResult = isForm ? { width, label, ...labelCol } : {};
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
