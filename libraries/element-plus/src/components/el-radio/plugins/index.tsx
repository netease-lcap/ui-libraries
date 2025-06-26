/* eslint-disable no-shadow */
import _ from 'lodash';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';
import { ElRadio, ElRadioButton } from 'element-plus';

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';

export function handleTagName(props) {
  return {
    formTagName: 'el-form-radio-group',
    tagName: 'el-radio-group',
  };
}

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList, []).concat($dataSourceDeleteField);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig, {});
  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceSlots = useMemo(
    () => (_.isNil(dataConfig)
        ? {}
        : {
            default: () => _.map(dataSource, (item) => <el-radio {...item}>{slots.item ? slots.item({ item }) : item.label}</el-radio>),
          }),
    [dataSource, slots, dataConfig],
  );

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data,
    slots: _.assign(slots, dataSourceSlots),
  };
}

export function handleItemType(props) {
  const type = props.get('type');
  const slots = props.get('slots');
  const defaultSlots = slots.default?.() ?? [];
  const defaultRenderCond = _.cond([
    [
      _.matches('button'),
      _.constant(_.map(defaultSlots, (node) => <ElRadioButton {...node.props} v-slots={node.children} />)),
    ],
    [
      _.matches('border'),
      _.constant(_.map(defaultSlots, (node) => <ElRadio {...node.props} v-slots={node.children} border />)),
    ],
    [_.stubTrue, _.constant(_.map(defaultSlots, (node) => <ElRadio {...node.props} v-slots={node.children} />))],
  ]);
  return {
    slots: {
      ...slots,
      default: () => defaultRenderCond(type),
    },
  };
}
