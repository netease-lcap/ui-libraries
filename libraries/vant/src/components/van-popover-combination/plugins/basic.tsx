import _ from 'lodash';
import { createNamespace } from 'vant/es/utils';
import { useMemo } from '@/plugins/hooks';
import { $dataSourceDeleteField, $deletePropsList } from '@/plugins/constants';
import { useFormatDataSource, useHandleMapField, useRequestDataSource } from '@/plugins/common/dataSource';

const [, bem] = createNamespace('popover');
export function handleOffset(props) {
  const offsetX = props.get('offsetX') || 0;
  const offsetY = props.get('offsetY') || 8;

  const offset = [offsetX, offsetY];
  return {
    offset,
  };
}

export function handleSlots(props) {
  const slots = props.get('slots');
  const isCustomContent = props.get('isCustomContent');

  return {
    slots: _.assign(slots, {
      default: isCustomContent ? slots.default : undefined,
    }),
  };
}

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
  const ref = props.get('ref');

  const staticActions = props.get('actions');
  // const textField = props.get('textField') || 'text';
  const iconField = props.get('iconField') || 'icon';
  const colorField = props.get('colorField') || 'color';
  const disabledField = props.get('disabledField') || 'disabled';

  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

  const dataSource2Actions = useMemo(() => {
    if (!dataSource || !Array.isArray(dataSource) || dataSource.length === 0) {
      return [];
    }
    return _.map(dataSource, (item) => ({
      // text: item[textField],
      color: item[colorField],
      icon: item[iconField],
      disabled: item[disabledField],
      ...item,
    }));
  }, [dataSource, colorField, iconField, disabledField]);

  const actions = useMemo(() => {
    return dataSource2Actions.length > 0 ? dataSource2Actions : staticActions;
  }, [dataSource, dataSource2Actions, staticActions]);

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data,
    actions,
  };
}

const wrappedSlotsMap = new WeakMap();
export function handleReferenceSlots(props) {
  const slots = props.get('slots');
  const classPorps = props.get('class');
  const cwCssRuleClassName = classPorps?.split(' ').find((item: string) => item?.startsWith('cw-css-rule')) || '';

  if (!slots.reference || wrappedSlotsMap.has(slots.reference)) {
    return {};
  }

  const originalReferenceSlot = slots.reference;

  const wrappedReferenceSlot = () => {
    const nodes = originalReferenceSlot();
    return <span class={`${bem('reference')} ${cwCssRuleClassName}`}>{nodes}</span>;
  };

  // 标记原始插槽函数已经被处理过，避免重复包裹
  wrappedSlotsMap.set(originalReferenceSlot, true);
  wrappedSlotsMap.set(wrappedReferenceSlot, true);

  return {
    slots: _.assign(slots, {
      reference: wrappedReferenceSlot,
    }),
  };
}
