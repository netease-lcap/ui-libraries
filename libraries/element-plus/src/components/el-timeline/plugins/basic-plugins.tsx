/* 组件功能扩展插件 */
import _ from 'lodash';
import { TimelineItemProps } from 'element-plus';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const ElTimelineBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElTimelineOptions<any, any>, TimelineItemProps>();
export default ElTimelineBasicAccumulate.addPlugin({
  name: 'handleDataSource',
  handle(props) {
    const dataConfig = props.get('dataSource');
    const emit = props.get('emit');

    // 批量获取所有需要的字段
    const fields = [
      'timestampField',
      'hideTimestampField',
      'centerField',
      'placementField',
      'typeField',
      'colorField',
      'sizeField',
      'iconField',
      'hollowField',
    ] as const;

    const slots = props.get('slots');
    const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
    const ref = props.get('ref');
    const { data, run: reload, loading } = useRequestDataSource(dataConfig);
    const dataSource = useHandleMapField({
      dataSource: useFormatDataSource(data),
      fieldsMap: _.fromPairs(_.map(fields, (key) => [[key], props.get(key) as string])),
    });
    emit('sync:state', 'data', dataSource);
    const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

    const dataSourceSlots = useMemo(
      () => (_.isNil(dataConfig)
          ? {}
          : {
              default: () => _.map(dataSource, (item) => (
                <el-timeline-item
                  {...item}
                  v-slots={{
                      default: () => slots.content?.({ item: item?.itemSource ?? item } as any),
                    }}
                />
                )),
            }),
      [dataSource, slots, dataConfig],
    );

    return {
      [$deletePropsList]: deletePropsList,
      ref: selfRef,
      loading,
      data: dataSource,
      slots: _.assign(slots, dataSourceSlots),
    };
  },
});
