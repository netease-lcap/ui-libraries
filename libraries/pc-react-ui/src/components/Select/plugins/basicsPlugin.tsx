/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import React from 'react';
// import moduleName from 'module';
import { useRequest } from 'ahooks';
// import {renm} from 'futil';
// import type { ButtonProps } from 'antd';
// import F from 'futil';
// import { hookType } from '@/plugins/type';

export function useHandleTransformOption(props) {
  const options = props.get('options');
  const transformOption = _.cond([
    [_.isArray, _.constant(() => Promise.resolve(options))],
    [_.isFunction, _.constant(() => Promise.resolve(options()))],
    [_.stubTrue, _.constant(() => Promise.resolve([]))],
  ]);
  const conformsArray = _.cond([
    [Array.isArray, _.identity],
    [_.stubTrue, _.stubArray],
  ]);
  const { data, loading } = useRequest(transformOption(options));
  return _.isNil(options) ? {} : { options: conformsArray(data), loading };
}

export function useHandleTextAndValueField(props) {
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const $deletePropsList = props.get('$deletePropsList', []).concat(['textField', 'valueField']);
  const options = props.get('options');

  const convertOption = React.useMemo(() => {
    const logicFn = _.map(options, (item) => ({ label: item[textField], value: item[valueField] }));
    const decisionCallback = _.cond([
      [_.matches({ textField: _.isString }), _.constant(logicFn)],
      [_.matches({ valueField: _.isString }), _.constant(logicFn)],
      [_.stubTrue, _.constant(options)],
    ]);
    return decisionCallback({ textField, valueField });
  }, [options, textField, valueField]);

  return _.isNil(options) ? { $deletePropsList } : { options: convertOption, $deletePropsList };
}
