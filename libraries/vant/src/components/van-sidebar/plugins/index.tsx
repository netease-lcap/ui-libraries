import _ from 'lodash';
import { useMemo } from '@/plugins/hooks';
import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';

export { handleControllableValue } from '@/plugins/common/index';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'text');
  const valueField = props.get('valueField', 'value');
  const slots = props.get('slots');
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceSlot = _.isNil(dataConfig)
    ? {}
    : { default: () => _.map(dataSource, (item) => <van-sidebar-item {...item} />) };

  return {
    ref: selfRef,
    loading,
    slots: _.assign(slots, dataSourceSlot),
  };
}

export function handleTextToSlot(props) {
  const text = props.get('text');
  const slots = props.get('slots');
  const deletePropsList = props.get('$deletePropsList', []).concat(['text']);
  const defaultSlot = text ? { default: () => text } : {};

  return {
    slots: _.assign(slots, defaultSlot),
    $deletePropsList: deletePropsList,
  };
}

export function handleActiveState(props) {
  const modelValue = props.get('modelValue');
  const defaultActive = props.get('defaultActive');
  const active = props.get('active');

  // 如果设置了 active 属性，优先使用
  if (active !== undefined) {
    return { active };
  }

  // 如果设置了 modelValue，使用 modelValue
  if (modelValue !== undefined) {
    return { active: modelValue };
  }

  // 如果设置了 defaultActive，使用 defaultActive
  if (defaultActive !== undefined) {
    return { active: defaultActive };
  }

  return {};
}
