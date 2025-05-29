/* 组件功能扩展插件 */
import _ from 'lodash';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  
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
  ];
  const [
    timestampField,
    hideTimestampField,
    centerField,
    placementField,
    typeField,
    colorField,
    sizeField,
    iconField,
    hollowField,
  ] = fields.map((field) => props.get(field));

  // 字段映射对象构建
  const fieldsMap = _.pickBy(
    {
      timestamp: timestampField,
      hideTimestamp: hideTimestampField,
      center: centerField,
      placement: placementField,
      type: typeField,
      color: colorField,
      size: sizeField,
      icon: iconField,
      hollow: hollowField,
    },
    (value) => !_.isUndefined(value),
  );

  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({
    dataSource: useFormatDataSource(data),
    fieldsMap,
  });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

  const dataSourceSlots = useMemo(
    () =>
      _.isNil(dataConfig)
        ? {}
        : {
            default: () =>
              _.map(dataSource, (item) => (
                <el-timeline-item
                  {...item}
                  v-slots={{
                    default: () => slots.content?.({ item }),
                  }}
                />
              )),
          },
    [dataSource, slots, dataConfig],
  );

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data: dataSource,
    slots: _.assign(slots, dataSourceSlots),
  };
}
