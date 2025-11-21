/* 组件功能扩展插件 */
import _ from 'lodash';
import { carouselProps } from 'element-plus';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';
import { ElCarouselItem } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const CarouselAccumulate = new PluginAccumulateTypes<nasl.ui.ElCarouselOptions<any>, typeof carouselProps>();

export default CarouselAccumulate.addPlugin({
  name: 'handleDataSource',
  handle: (props) => {
    const dataConfig = props.get('dataSource');
    const nameField = props.get('nameField') || 'name';
    const labelField = props.get('labelField') || 'label';
    const slots = props.get('slots');
    const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
    const ref = props.get('ref');
    const { data, run: reload, loading } = useRequestDataSource(dataConfig);
    const dataSource = useHandleMapField({
      dataSource: useFormatDataSource(data),
      fieldsMap: {
        name: nameField,
        label: labelField,
      },
    });
    const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

    const dataSourceSlots = useMemo(
      () => (_.isNil(dataConfig)
          ? {}
          : {
              default: () => _.map(dataSource, (item) => (
                <ElCarouselItem
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
