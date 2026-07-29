import _ from 'lodash';
// import { Icon } from 'vant';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'text');
  const valueField = props.get('valueField', 'value');
  const disabledField = props.get('disabledField', 'disabled');
  const iconField = props.get('iconField', 'icon');
  // const activeColor = props.get('activeColor', '#1989fa');
  // const slots = props.get('slots');
  const ref = props.get('ref');
  // const onChange = props.get('onChange');
  const deletePropsList = props.get($deletePropsList, []).concat($dataSourceDeleteField);

  // const [value, setValue, valueProps] = useControllableValue(props, {
  //   valuePropName: 'modelValue',
  // });

  const { data, run: reload, loading } = useRequestDataSource(dataConfig, {});
  const dataSource = useHandleMapField({
    label: 'text',
    textField,
    valueField,
    disabledField,
    // iconField,
    dataSource: useFormatDataSource(data),
    fieldsMap: {
      icon: iconField,
    },
  });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  // console.log(dataSource, 'dataSource===');

  // const options = useMemo(() => {
  //   return _.map(dataSource, (item: any) => ({
  //     text: item[textField],
  //     value: item[valueField],
  //     disabled: item[disabledField],
  //     icon: item[iconField],
  //   }));
  // }, [dataSource, textField, valueField, disabledField, iconField]);

  // console.log('👨‍👩‍👧‍👦', dataSource);
  // const dataSourceSlots = useMemo(() => {
  //   return _.isNil(dataConfig) ? {} : {
  //     // TODO LD:需要传 disabled
  //     default: () => _.map(dataSource, (item) => (
  //       <van-dropdown-item-son
  //         center
  //         title={item[textField]}
  //         disabled={item[disabledField]}
  //         icon={item[iconField]}
  //         titleStyle={{
  //           color: value === item[valueField] ? activeColor : item[disabledField] ? '#999' : '',
  //           cursor: item[disabledField] ? 'not-allowed' : 'pointer',
  //         }}
  //         onClick={() => {
  //           if (item[disabledField]) return;
  //           setValue(item[valueField]);
  //           onChange?.(item[valueField]);
  //           selfRef?.toggle?.();
  //         }}
  //         v-slots={{
  //           'right-icon': value === item[valueField] ? () => <Icon name="success" color={activeColor} /> : null,
  //         }}
  //       />
  //     )),
  //   };
  // }, [dataSource, textField, valueField, disabledField, iconField, value]);

  return {
    // ...valueProps,
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data,
    options: dataSource,
  };
}
