/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import React from 'react';
// import moduleName from 'module';
import { useRequest } from 'ahooks';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleTransformOption(props) {
  const dataSourceField = props.get('dataSourceField', 'options');
  const dataSource = props.get(dataSourceField);
  const transformOption = _.cond([
    [_.isArray, _.constant(() => Promise.resolve(dataSource))],
    [_.isFunction, _.constant(() => Promise.resolve(dataSource()))],
  ]);
  const conformsArray = _.cond([
    [Array.isArray, _.identity],
    [_.stubTrue, _.stubArray],
  ]);
  const { data, loading } = useRequest(transformOption(dataSource));

  return _.isNil(dataSource) ? {} : { [dataSourceField]: conformsArray(data), loading };
}

export function useHandleTextAndValueField(props) {
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField']);
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
  return _.isNil(options)
    ? { [$deletePropsList]: deletePropsList }
    : { options: convertOption, [$deletePropsList]: deletePropsList };
}
