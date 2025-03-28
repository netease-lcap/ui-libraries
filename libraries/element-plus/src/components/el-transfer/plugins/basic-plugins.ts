/* 组件功能扩展插件 */

import _ from 'lodash';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';
export function handleTitle(props) {
  const leftTitle = props.get('leftTitle');
  const rightTitle = props.get('rightTitle');
  const titles = [leftTitle, rightTitle];
  return {
    titles,
  };
}

export function handleButtonText(props) {
  const leftButtonText = props.get('leftButtonText');
  const rightButtonText = props.get('rightButtonText');
  return {
    buttonTexts: [leftButtonText, rightButtonText],
  };
}

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField') || 'label';
  const valueField = props.get('valueField') || 'value';
  const disabledField = props.get('disabledField') || 'disabled';
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField, ['formTagName']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ value: 'key', textField, valueField, disabledField, dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data: dataSource,
    formTagName: 'el-form-transfer',
  };
}
