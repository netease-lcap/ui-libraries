import _ from 'lodash';
import { useMemo } from '@/plugins/hooks';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const nameField = props.get('nameField') || 'name';
  const slots = props.get('slots');
  const disabledField = props.get('disabledField') || 'disabled';
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({
    fieldsMap: {
      name: nameField,
      disabled: disabledField,
    },
    dataSource: useFormatDataSource(data),
  });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const rightIcon = props.get('rightIcon');

  const dataSourceSlots = useMemo(
    () => (_.isNil(dataConfig)
        ? {}
        : {
            default: () => _.map(dataSource, (item) => (
              <van-collapse-item
                key={item.name}
                {...item}
                v-slots={{
                  title: () => slots.title?.({ item }),
                  value: () => slots.value?.({ item }),
                  label: () => slots.label?.({ item }),
                }}
                rightIcon={rightIcon}
              >
                {slots.content?.({ item })}
              </van-collapse-item>
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
}
