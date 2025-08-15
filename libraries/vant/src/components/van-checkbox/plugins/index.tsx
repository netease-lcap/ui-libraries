import _ from 'lodash';
import { Checkbox as VantCheckbox } from 'vant';
import { useMemo } from '@/plugins/hooks';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

export { handleControllableValue } from '@/plugins/common/index';
export { handleComponentInForm } from '@/components/van-form/plugins/form-item';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'text');
  const valueField = props.get('valueField', 'value');
  const onUpdateModelValue = props.get('onUpdate:modelValue');
  const onChange = props.get('onChange');
  const slots = props.get('slots');
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({
    textField,
    valueField,
    label: 'test',
    value: 'name',
    dataSource: useFormatDataSource(data),
  });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceSlots = _.isNil(dataConfig)
    ? {}
    : {
        default: () => _.map(dataSource, (item) => <VantCheckbox {...item}>{item.test}</VantCheckbox>),
      };

  return {
    ref: selfRef,
    loading,
    slots: _.assign(slots, dataSourceSlots),
    tagName: 'van-checkbox-group',
    formTagName: 'van-form-checkbox-group',
    onChange: (value) => {
      // van checkbox 监听了值改变触发 change 会导致问题所以这里给置空
    },
    'onUpdate:modelValue': _.wrap(onUpdateModelValue, (fn, value) => {
      console.log(value,'==');
      _.attempt(onChange, value);
      _.attempt(fn, value);
    }),
  };
}
