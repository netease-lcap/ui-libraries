/* eslint-disable no-shadow */
import _ from 'lodash';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';
import { useCallback } from '../../../plugins/hooks';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'text');
  const valueField = props.get('valueField', 'value');
  const disabledField = props.get('disabledField', 'disabled');
  const dividedField = props.get('dividedField', 'divided');
  const deletePropsList = props.get($deletePropsList, []).concat($dataSourceDeleteField);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig, {});
  const dataSource = useHandleMapField({
    value: 'command',
    textField,
    valueField,
    disabledField,
    dividedField,
    dataSource: useFormatDataSource(data),
  });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dropdownSlotRender = useCallback(
    () => (
      <el-dropdown-menu>
        {dataSource.map((item) => (
          <el-dropdown-item {...item}>
            <el-text text={item.label} />
          </el-dropdown-item>
        ))}
      </el-dropdown-menu>
    ),
    [dataSource],
  );
  const dataSourceSlots = useMemo(
    () => (_.isNil(dataConfig)
        ? {}
        : {
            dropdown: dropdownSlotRender,
          }),
    [dataSource, dataConfig],
  );

  return {
    [$deletePropsList]: deletePropsList,
    ...dataSourceSlots,
    ref: selfRef,
    loading,
    data,
  };
}
