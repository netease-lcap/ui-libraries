/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import React from 'react';
import { useRequest } from 'ahooks';
import { $deletePropsList } from '@/plugins/constants';

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
  return _.isNil(items) ? {} : { items: conformsArray(data) };
}

export function useHandleTextAndValueField(props) {
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'key');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField']);
  const items = props.get('items');

  const convertOption = React.useMemo(() => {
    const logicFn = _.map(items, (item) => ({ label: item[textField], value: item[valueField] }));
    const decisionCallback = _.cond([
      [_.matches({ textField: _.isString }), _.constant(logicFn)],
      [_.matches({ valueField: _.isString }), _.constant(logicFn)],
      [_.stubTrue, _.constant(items)],
    ]);
    return decisionCallback({ textField, valueField });
  }, [items, textField, valueField]);
  return _.isNil(items)
    ? { [$deletePropsList]: deletePropsList }
    : { options: convertOption, [$deletePropsList]: deletePropsList };
}
