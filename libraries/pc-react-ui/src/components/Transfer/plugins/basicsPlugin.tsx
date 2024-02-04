import { $deletePropsList } from '@/plugins/constants';

export function useHandleTransform(props) {
  const deletePropsList = props.get($deletePropsList, []).concat(['dataSourceField']);
  const textField = props.get('textField', 'title');
  const valueField = props.get('valueField', 'key');
  // const childrenField = props.get('childrenField', 'children');
  // const fieldNames = props.get('fieldNames');
  return {
    [$deletePropsList]: deletePropsList,
    dataSourceField: 'dataSource',
    textField,
    valueField,
    // fieldNames: {
    //   title: textField,
    //   key: valueField,
    //   children: childrenField,
    //   ...fieldNames,
    // },
  };
}

export function useHandleSourceAndTargetTitle(props) {
  const sourceTitle = props.get('sourceTitle', 'sourceTitle');
  const targetTitle = props.get('targetTitle', 'targetTitle');
  const deletePropsList = props.get($deletePropsList, []).concat(['sourceTitle', 'targetTitle']);
  const title = [sourceTitle, targetTitle];
  return {
    title,
    [$deletePropsList]: deletePropsList,
  };
}
