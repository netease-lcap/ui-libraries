import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const parentField = props.get('parentField');
  const deletePropsList = props
    .get($deletePropsList, [])
    .concat(['textField', 'valueField', 'parentField', 'childrenField']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig, {});
  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const TreeData = useDataSourceToTree(dataSource, parentField, valueField);
  const selfRef = useMemo(() => _.assign(ref, { reload, data: TreeData }), [TreeData, reload, ref]);
  const dataSourceResult = _.isEmpty(TreeData) ? {} : { data: TreeData };

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    ...dataSourceResult,
  };
}

export function handleTreeProps(props) {
  const checkStrictly = props.get('checkStrictly', false);
  const showCheckbox = props.get('showCheckbox', false);
  const defaultExpandAll = props.get('defaultExpandAll', false);
  const expandOnClickNode = props.get('expandOnClickNode', true);
  const nodeKey = props.get('nodeKey', 'id');
  const propsConfig = props.get('props', {});

  return {
    'check-strictly': checkStrictly,
    'show-checkbox': showCheckbox,
    'default-expand-all': defaultExpandAll,
    'expand-on-click-node': expandOnClickNode,
    'node-key': nodeKey,
    props: {
      children: 'children',
      label: 'label',
      ...propsConfig,
    },
  };
} 