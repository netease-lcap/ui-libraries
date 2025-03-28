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
  const slots = props.get('slots');
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
    () => {
      if (dataConfig) {
        return (
          <el-dropdown-menu>
            {dataSource.map((item) => (
              <el-dropdown-item key={item.value} {...item}>
                <el-text text={item.label} />
              </el-dropdown-item>
            ))}
          </el-dropdown-menu>
        );
      }
      if (slots.items) {
        return <el-dropdown-menu>{slots.items()}</el-dropdown-menu>;
      }
      return slots.dropdown?.();
    },
    [dataConfig, dataSource, slots.items, slots.dropdown]
  );

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data,
    slots: {
      ...slots,
      dropdown: dropdownSlotRender,
    },
  };
}
