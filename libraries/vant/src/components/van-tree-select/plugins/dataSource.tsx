import _ from 'lodash';
import { useMemo, useCallback } from '@/plugins/hooks';
import { $deletePropsList } from '@/plugins/constants';
import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField') || 'text';
  const valueField = props.get('valueField') || 'id';
  const parentField = props.get('parentField') || null;
  const disabledField = props.get('disabledField') || 'disabled';
  const dotField = props.get('dotField') || 'dot';
  const badgeField = props.get('badgeField') || 'badge';
  const deletePropsList = props
    .get($deletePropsList, [])
    .concat(['textField', 'valueField', 'parentField', 'childrenField', 'disabledField', 'dotField', 'badgeField']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig, {});
  const dataSource = useHandleMapField({
    textField,
    valueField,
    dataSource: useFormatDataSource(data),
    label: 'text',
    value: 'id',
    disabledField,
    fieldsMap: {
      dot: dotField,
      badge: badgeField,
    },
  });
  const TreeData = useMemo(() => useDataSourceToTree(dataSource, parentField, valueField), [dataSource]);
  const selfRef = useMemo(() => _.assign(ref, { reload, data: TreeData, items: TreeData }), [TreeData, reload, ref]);
  const dataSourceResult = _.isEmpty(TreeData) ? {} : { data: TreeData, items: TreeData };

  // 是否自定义插槽
  const customNavText = props.get('customNavText');
  const customContent = props.get('customContent');
  const slots = props.get('slots');
  const customSlots = useMemo(() => {
    return {
      'nav-text': customNavText ? (item) => slots.navtext?.({ item }) : undefined,
      content: customContent ? () => slots.rightcontent?.() : undefined,
    };
  }, [customNavText, customContent, slots]);

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    ...dataSourceResult,
    slots: _.assign(slots, customSlots),
  };
}
