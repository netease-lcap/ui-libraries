/* 组件功能扩展插件 */
import styles from '../index.module.css';
import _ from 'lodash';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';

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

  const dataSourceSlots = useMemo(
    () =>
      _.isNil(dataConfig)
        ? {}
        : {
            default: () =>
              _.map(dataSource, (item) => (
                <el-collapse-item
                  {...item}
                  v-slots={{
                    title: () => slots.title?.({ item }),
                    icon: () => slots.icon?.({ item }),
                    default: () => slots.content?.({ item }),
                  }}
                />
              )),
          },
    [dataSource, slots, dataConfig],
  );

  const displayClass = useMemo(() => {
    if (dataConfig && data && data.length === 0) {
      return styles.empty;
    }
    return '';
  }, [dataSource, data, dataConfig]);

  return {
    class: displayClass,
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data: dataSource,
    slots: _.assign(slots, dataSourceSlots),
  };
}
