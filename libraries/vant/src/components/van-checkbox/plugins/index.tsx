import _ from 'lodash';
import { useMemo } from '@/plugins/hooks';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

export { handleControllableValue } from '@/plugins/common/index';
// export * from './ide';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'text');
  const valueField = props.get('valueField', 'value');
  const slots = props.get('slots');
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ textField, valueField, value: 'name', dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceSlots = _.isNil(dataConfig)
    ? {}
    : {
        default: () => _.map(dataSource, (item) => <van-checkbox {...item}>{item.text}</van-checkbox>),
      };

  return {
    ref: selfRef,
    loading,
    slots: _.assign(slots, dataSourceSlots),
  };
}
