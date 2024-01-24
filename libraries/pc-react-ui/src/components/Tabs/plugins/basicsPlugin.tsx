/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import React from 'react';
import { useRequest } from 'ahooks';

export function useHandleTransformOption(props) {
  const items = props.get('items');
  const transformOption = _.cond([
    [_.isArray, _.constant(() => Promise.resolve(items))],
    [_.isFunction, _.constant(() => Promise.resolve(items()))],
  ]);
  const conformsArray = _.cond([
    [Array.isArray, _.identity],
    [_.stubTrue, _.stubArray],
  ]);
  const { data } = useRequest(transformOption(items));
  return { items: conformsArray(data) };
}

export function useHandleTextAndValueField(props) {
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'key');
  const $deletePropsList = props.get('$deletePropsList', []).concat(['textField', 'valueField']);
  const option = props.get('option');

  const convertOption = React.useMemo(() => {
    const logicFn = _.map(option, (item) => ({ label: item[textField], value: item[valueField] }));
    const decisionCallback = _.cond([
      [_.matches({ textField: _.isString }), _.constant(logicFn)],
      [_.matches({ valueField: _.isString }), _.constant(logicFn)],
      [_.stubTrue, _.constant(option)],
    ]);
    return decisionCallback({ textField, valueField });
  }, [option, textField, valueField]);
  return { option: convertOption, $deletePropsList };
}
