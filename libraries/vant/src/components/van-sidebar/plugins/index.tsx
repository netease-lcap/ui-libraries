import _ from 'lodash';
import { useMemo } from '@/plugins/hooks';
import { useRequestDataSource, useFormatDataSource } from '@/plugins/common/dataSource';

export { handleControllableValue } from '@/plugins/common/index';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const slots = props.get('slots');
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useFormatDataSource(data);
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceSlot = _.isNil(dataConfig)
    ? {}
    : {
        default: () => _.map(dataSource, (item) => slots.item(item)),
      };

  return {
    ref: selfRef,
    loading,
    slots: _.assign(slots, dataSourceSlot),
  };
}
