/* 组件功能扩展插件 */
import _ from 'lodash';
import styles from '../index.module.css';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';
import { ElCollapseItem } from '@/index';

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
    () => (_.isNil(dataConfig)
        ? {}
        : {
            default: () => _.map(dataSource, (item) => (
              <ElCollapseItem
                {...item}
                v-slots={{
                    title: () => slots.title?.({ item }),
                    icon: () => slots.icon?.({ item }),
                    default: () => slots.content?.({ item }),
                  }}
              />
              )),
          }),
    [dataSource, slots, dataConfig],
  );

  // const displayClass = useMemo(() => {
  //   const isEmpty = dataConfig && _.isEmpty(data);
  //   return isEmpty ? styles.empty : '';
  // }, [dataSource, data, dataConfig]);

  return {
    // class: displayClass,
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data: dataSource,
    slots: _.assign(slots, dataSourceSlots),
  };
}
