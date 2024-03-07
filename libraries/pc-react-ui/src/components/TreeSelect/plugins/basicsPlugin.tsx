import classnames from 'classnames';
import style from '../index.module.less';

import { $deletePropsList, $dataSourceField } from '@/plugins/constants';

export function useHandleTransform(props) {
  const deletePropsList = props.get($deletePropsList, []).concat(['dataSource', 'textField', 'valueField', 'childrenField']);
  const textField = props.get('textField', 'title');
  const valueField = props.get('valueField', 'value');
  const childrenField = props.get('childrenField', 'children');
  const fieldNames = props.get('fieldNames');
  return {
    [$deletePropsList]: deletePropsList,
    [$dataSourceField]: 'treeData',
    fieldNames: {
      label: textField,
      value: valueField,
      children: childrenField,
      ...fieldNames,
    },
  };
}

export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.treeSelect, className),
  };
}
