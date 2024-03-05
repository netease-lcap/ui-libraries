import { useControllableValue, useWhyDidYouUpdate } from 'ahooks';
import React from 'react';
import _ from 'lodash';
import { Icon } from '@/index';

export function useHandleRef(props) {
  const onChangeProps = props.get('onChange');
  const result = {
    onChange: _.wrap(onChangeProps, (fn, e) => {
      fn(e?.target?.value, e);
    }),
  };
  return _.isFunction(onChangeProps) ? result : {};
}
useHandleRef.order = 1;

export function useHandlePrefix(props) {
  const prefixProps = props.get('prefixProps');
  return _.isNil(prefixProps) ? {} : { icon: Icon(prefixProps) };
}
// const icon = props.get('icon');
export function useHandleSuffix(props) {
  const suffixProps = props.get('suffix');
  return _.isNil(suffixProps) ? {} : { icon: Icon(suffixProps) };
}
