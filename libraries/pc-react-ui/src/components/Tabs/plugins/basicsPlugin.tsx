import classnames from 'classnames';
import style from '../index.module.less';

import {
  $labelKey, $valueKey, $dataSourceField, $deletePropsList,
} from '@/plugins/constants';

export function useHandleTransform(props) {
  return {
    [$deletePropsList]: props.get($deletePropsList, []).concat(['loading', 'dataSource']),
    [$dataSourceField]: 'items',
    [$labelKey]: 'label',
    [$valueKey]: 'key',
    valueField: 'key',
  };
}
export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.tabs, className),
  };
}
