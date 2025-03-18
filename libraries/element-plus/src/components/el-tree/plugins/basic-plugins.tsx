import _ from 'lodash';
import { ElTreeV2 } from 'element-plus';
import { useRequestDataSource, useHandleMapField, useFormatDataSource, useDataSourceToTree } from '@/plugins/common/dataSource';
import { useMemo, useCallback } from '@/plugins/hooks';
import { $deletePropsList } from '@/plugins/constants';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const parentField = props.get('parentField');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', 'parentField', 'childrenField']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig, {});
  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const TreeData = useMemo(() => useDataSourceToTree(dataSource, parentField, valueField), [dataSource]);
  const selfRef = useMemo(() => _.assign(ref, { reload, data: TreeData }), [TreeData, reload, ref]);
  console.log(TreeData, 'TreeData');
  const dataSourceResult = _.isEmpty(TreeData) ? {} : { data: TreeData };

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    nodeKey: 'value',
    loading,
    ...dataSourceResult,
  };
}

export function handleVirtualize(props) {
  const virtualize = props.get('virtualize');

  const render = useCallback((props) => <ElTreeV2 {...props} />, []);
  const result = useMemo(() => {
    return virtualize
      ? {
          render,
        }
      : {};
  }, [virtualize, render]);
  return result;
}
