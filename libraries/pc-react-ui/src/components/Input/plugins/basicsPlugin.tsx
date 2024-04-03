import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import { Icon, Col, FormItem } from '@/index';
import FormContext, { QueryFormContext } from '@/components/Form/form-context';
import { FORMITEMPROPSFIELDS } from '@/components/Form/constants';
import { $deletePropsList } from '@/plugins/constants';
import { COLPROPSFIELDS } from '@/components/Row/constants';
import { RouterContext } from '@/components/Router/router-context';

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
  return _.isNil(prefixProps) ? {} : { prefix: <Icon name={prefixProps} /> };
}
// const icon = props.get('icon');
export function useHandleSuffix(props) {
  const suffixProps = props.get('suffix');
  return _.isNil(suffixProps) ? {} : { suffix: <Icon name={suffixProps} /> };
}
export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.input, className),
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
