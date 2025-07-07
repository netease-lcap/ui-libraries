import _ from 'lodash';
import { useMemo, useCallback, GetAccumulatedMapType } from '@/plugins/hooks';
import { PickerAccumulateTypes } from './type';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

// export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';

export function handleDataSource(props: GetAccumulatedMapType<typeof PickerAccumulateTypes>) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField') || 'text';
  const valueField = props.get('valueField') || 'value';
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField, ['formTagName'], 'data');
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

  // 转换为picker格式的columns
  const columns = useMemo(() => {
    if (!dataSource || !Array.isArray(dataSource) || dataSource.length === 0) {
      return [];
    }
    return dataSource.map((item: any) => ({
      text: item[textField],
      value: item[valueField],
    }));
  }, [dataSource, textField, valueField]);

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    slots,
    columns,
    formTagName: 'van-form-picker',
    tagName: 'van-picker',
  };
}

export function handlePickerProps(props) {
  const placeholder = props.get('placeholder') || '请选择';
  const title = props.get('title') || placeholder;

  return {
    title,
    placeholder,
  };
}
