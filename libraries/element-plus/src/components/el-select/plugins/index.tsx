/* eslint-disable no-shadow */
import _ from 'lodash';
import { ElSelectV2 } from 'element-plus';
import { useMemo, useCallback, GetAccumulatedMapType, useState } from '@/plugins/hooks';
import { SelectAccumulateTypes } from './type';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';

export function handleDataSource(props: GetAccumulatedMapType<typeof SelectAccumulateTypes>) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField') || 'label';
  const valueField = props.get('valueField') || 'value';
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField, ['formTagName'], 'data');
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceSlots = _.isNil(dataConfig) ? {} : { default: () => _.map(dataSource, (item) => <el-option {...item} />) };

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    slots: _.assign(slots, dataSourceSlots),
    data,
    formTagName: 'el-form-select',
  };
}

export function handleVirtualize(props) {
  const virtualize = props.get('virtualize');
  const data = props.get('data');
  const render = useCallback((props) => <ElSelectV2 {...props} />, []);
  const result = useMemo(() => {
    return virtualize
      ? {
          options: data,
          render,
        }
      : {};
  }, [virtualize, data, render]);
  return result;
}
