/* 组件功能扩展插件 */
import _ from 'lodash';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const isIndicator = props.get('isIndicator');
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

  const dataSourceSlots = useMemo(() => (_.isNil(dataConfig)
      ? {}
      : {
          default: () => _.map(dataSource, (item) => (
            <van-swipe-item
              {...item}
              v-slots={{
                default: () => slots.content?.({ item }),
              }}
            />
          )),
        }
      ), [dataSource, slots, dataConfig]);

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data: dataSource,
    slots: _.assign(slots, {
      ...dataSourceSlots,
      indicator: isIndicator ? slots.indicator : null,
    }),
  };
}
