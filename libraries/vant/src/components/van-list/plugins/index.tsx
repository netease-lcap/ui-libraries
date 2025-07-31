import _ from 'lodash';
import { Cell } from 'vant';
import { useMemo, useCallback, useRef } from '@/plugins/hooks';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
// 格式化数据源结果

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField') || 'label';
  const valueField = props.get('valueField') || 'value';
  const slots = props.get('slots');
  const isCell = props.get('isCell');
  const cellWrap = isCell ? (node) => <Cell>{{ title: node }}</Cell> : (node) => node;
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField, ['formTagName'], 'data');
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceSlots = _.isNil(dataConfig)
    ? {}
    : { default: () => _.map(dataSource, (item) => cellWrap(slots?.item?.(item))) };
  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    slots: _.assign({}, slots, dataSourceSlots),
    data: dataSource,
  };
}
