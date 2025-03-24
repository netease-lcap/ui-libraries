/* eslint-disable no-shadow */
import _ from 'lodash';
import { useControllableValue, useMemo } from '@/plugins/hooks';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { ElIcon } from '../../index';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField') || 'label';
  const valueField = props.get('valueField') || 'value';
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
  const ref = props.get('ref');
  const onTabClick = props.get('onTabClick') ?? (() => {});

  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ textField, valueField, value: 'name', dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

  const [value, setValue, updateVal] = useControllableValue(props);

  const dataSourceSlots = useMemo(() => (
    _.isNil(dataConfig)
    ? {}
    : {
      default: () => _.map(dataSource, (item) => (
        <el-tab-pane
          {...item}
          v-slots={{
            label: () => slots?.label?.({ item }),
            default: () => slots?.content?.({ item }),
          }}
        />
      )),
    }
  ), [dataConfig, dataSource, textField, valueField, slots]);

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data,
    slots: _.assign(slots, dataSourceSlots),
    ...updateVal,
    onTabClick: _.wrap(onTabClick, (fn, ...args) => {
      _.attempt(fn, ...args);
    }),
  };
}

export function handleAddIcon(props) {
  const addIcon = props.get('addIcon');
  const slots = props.get('slots');
  if (!addIcon) return {};

  const addIconSlot = {
    'add-icon': () => {
      return <ElIcon name={addIcon} />;
    },
  };

  return {
    slots: {
      ...slots,
      ...addIconSlot,
    },
  };
}
