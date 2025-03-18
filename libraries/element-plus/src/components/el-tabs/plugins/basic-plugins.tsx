/* eslint-disable no-shadow */
import _ from 'lodash';
import { useControllableValue, useEffect, useMemo } from '@/plugins/hooks';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField') || 'label';
  const valueField = props.get('valueField') || 'value';
  const showInDesigner = props.get('showInDesigner');
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ textField, valueField, value: 'name', dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

  const [value, setValue] = useControllableValue(props, {
    valuePropName: 'modelValue',
  });

  useEffect(() => {
    // 当数据源存在且没有选中值时，自动选中第一项
    if (showInDesigner && !_.isNil(dataConfig) && _.isNil(value) && dataSource?.length) {
      setValue(dataSource[0][valueField] || 'Name0');
    }
  }, [dataConfig, dataSource, value, setValue, valueField, showInDesigner]);

  const dataSourceSlots = useMemo(() => (
    _.isNil(dataConfig)
    ? {}
    : {
      default: () => _.map(dataSource, (item, index) => {
        const current = {
          ...item,
          label: item[textField] || `Label${index}`,
          name: item[valueField] || `Name${index}`,
        };
        return (
          <el-tab-pane
            {...current}
            v-slots={{
              label: () => slots?.label?.({ item: current }),
              default: () => slots?.content?.({ item: current }),
            }}
          />
        );
      }),
    }
  ), [dataConfig, dataSource, textField, valueField, slots]);

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data,
    slots: _.assign(slots, dataSourceSlots),
    modelValue: value,
  };
}

export function handleEvents(props) {
  const ref = props.get('ref');
  const selfRef = useMemo(() => _.assign(ref, {
    onTabClick(tab) {
      const onTabClick = props.get('onTabClick');
      if (typeof onTabClick === 'function') {
        onTabClick({
          active: tab.active,
          loaded: tab.loaded,
          isClosable: tab.isClosable,
          value: tab.paneName,
        });
      }
    },
    onEdit(value, action) {
      const onTabEdit = props.get('onTabClick');
      const onEdit = props.get('onEdit');
      if (typeof onTabEdit === 'function') {
        onTabEdit({
          value,
          action,
        });
      }

      if (typeof onEdit === 'function') {
        onEdit(value, action);
      }
    },
  }), [ref]);

  return {
    ref: selfRef,
  };
}
