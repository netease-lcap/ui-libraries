/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
// import React from 'react';
import numbro from 'numbro';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';

export function Handleformat(props: any & { formatType: 'thousandths' | 'percentSign' }) {
  const formatType = props.get('formatType');
  const deletePropsList = props.get($deletePropsList, []).concat(['formatType']);
  const thousandthsResult = {
    formatter: (value) => numbro(+value).format({ thousandSeparated: true }),
    parser: (value) => numbro.unformat(value),
  };
  const percentSignResult = {
    formatter: (value) => `${value}%`,
    parser: (value) => _.replace(value, '%', ''),
  };
  const result = _.cond([
    [_.matches('thousandths'), _.constant(thousandthsResult)],
    [_.matches('percentSign'), _.constant(percentSignResult)],
    [_.stubTrue, _.stubObject],
  ]);
  return _.assign({ [$deletePropsList]: deletePropsList }, result(formatType));
}
