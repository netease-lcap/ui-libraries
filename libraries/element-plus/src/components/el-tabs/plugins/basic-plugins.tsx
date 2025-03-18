/* eslint-disable no-shadow */
import _ from 'lodash';
import { useMemo } from '@/plugins/hooks';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField') || 'label';
  const valueField = props.get('valueField') || 'value';
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ textField, valueField, value: 'name', dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

  const value = props.get('modelValue');
  // 获取第一个数据项的值作为默认选中值
  const defaultModelValue = dataSource?.[0]?.[valueField];

  const dataSourceSlots = _.isNil(dataConfig)
    ? {}
    : {
      default: () => _.map(dataSource, (item) => (
        <el-tab-pane
          {...item}
          v-slots={{
            // 把从el-tabs中收集到的slots数据传递给el-tab-pane的插槽
            label: () => slots?.label?.({ item }),
            default: () => slots?.content?.({ item }),
          }}
        />
      )),
    };

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data,
    slots: _.assign(slots, dataSourceSlots),
    modelValue: value || defaultModelValue,
  };
}

export function handleEvents(props) {
  return {
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
      const [onTabEdit, onEdit] = props.get(['onTabEdit', 'onEdit']);
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
  };
}
