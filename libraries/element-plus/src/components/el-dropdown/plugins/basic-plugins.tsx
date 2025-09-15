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
    dataSource: useFormatDataSource(data),
    fieldsMap: {
      divided: dividedField,
      disabled: disabledField,
    },
  });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  // TODO
  const condSlotRender = useCallback(
    _.cond([
      [
        _.conforms({
          dataConfig: (dataConfig) => !!dataConfig,
          slotsItems: _.stubTrue,
          dataSource: _.stubTrue,
          slotsDropdown: _.stubTrue,
        }),
        ({ dataSource }) => {
          console.log('dataSource');
          return (
            <el-dropdown-menu>
              {dataSource.map((item) => (
                <el-dropdown-item key={item.value} {...item}>
                  <el-text text={item.label} />
                </el-dropdown-item>
              ))}
            </el-dropdown-menu>
          );
        },
      ],
      [
        _.conforms({
          slotsItems: (slotsItems) => !!slotsItems,
        }),
        ({ slotsItems }) => {
          console.log('slotsItems');
          return <el-dropdown-menu>{slotsItems()}</el-dropdown-menu>;
        },
      ],
      [
        _.stubTrue,
        ({ slotsDropdown }) => {
          console.log('slotsDropdown');
          return slotsDropdown?.();
        },
      ],
    ]),
    [],
  );
  const dropdownSlotRender = useCallback(() => {
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
  }, [dataConfig, dataSource, slots.items, slots.dropdown]);
  const slotDropdown = useMemo(
    () => condSlotRender({ dataConfig, dataSource, slotsItems: slots.items, slotsDropdown: slots.dropdown }),
    [condSlotRender, dataConfig, dataSource, slots],
  );

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data,
    slots: {
      ...slots,
      dropdown: dropdownSlotRender,
      // condSlotRender({ dataConfig, dataSource, slotsItems: slots.items, slotsDropdown: slots.dropdown }),
    },
  };
}

export function handleDefaultSlot(props) {
  const slots = props.get('slots');
  return {
    slots: {
      ...slots,
      default: slots.default ? () => <div style={{ width: 'auto' }}>{slots.default()}</div> : undefined,
    },
  };
}
handleDefaultSlot.order = 2;
