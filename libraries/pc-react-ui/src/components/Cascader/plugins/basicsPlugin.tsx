import classnames from 'classnames';
import { $deletePropsList, $dataSourceField } from '@/plugins/constants';
import style from '../index.module.less';

export function useHandleTransform(props) {
  const deletePropsList = props.get($deletePropsList, []).concat(['dataSource', 'childrenField']);
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const childrenField = props.get('childrenField', 'children');
  const fieldNames = props.get('fieldNames');
  return {
    [$deletePropsList]: deletePropsList,
    [$dataSourceField]: 'options',
    // fieldNames: {
    //   label: textField,
    //   value: valueField,
    //   children: childrenField,
    //   ...fieldNames,
    // },
  };
}

export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.cascader, className),
  };
}
