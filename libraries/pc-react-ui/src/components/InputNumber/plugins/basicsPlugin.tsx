import numbro from 'numbro';
import _ from 'lodash';
import classnames from 'classnames';
import { $deletePropsList } from '@/plugins/constants';
import style from '../index.module.less';

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
export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.inputNumber, className),
  };
}
