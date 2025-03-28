/* 组件功能扩展插件 */
import _ from 'lodash';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';
export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField') || 'label';
  const valueField = props.get('valueField') || 'value';
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField, ['formTagName']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, options: dataSource }), [dataSource, reload, ref]);
  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data,
    formTagName: 'el-form-mention',
  };
}
