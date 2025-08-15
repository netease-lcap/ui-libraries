import _ from 'lodash';
import { Radio as VantRadio } from 'vant';
import { useMemo } from '@/plugins/hooks';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

export { handleControllableValue } from '@/plugins/common/index';
export { handleComponentInForm } from '@/components/van-form/plugins/form-item';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'text');
  const valueField = props.get('valueField', 'value');
  const slots = props.get('slots');
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({
    textField,
    valueField,
    label: 'text',
    value: 'name',
    dataSource: useFormatDataSource(data),
  });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceSlots = _.isNil(dataConfig)
    ? {}
    : {
        default: () => _.map(dataSource, (item) => <VantRadio {...item}>{item.text}</VantRadio>),
      };

  return {
    ref: selfRef,
    loading,
    slots: _.assign(slots, dataSourceSlots),
    tagName: 'van-radio-group',
    formTagName: 'van-form-radio-group',
  };
}
