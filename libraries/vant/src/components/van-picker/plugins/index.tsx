import _ from 'lodash';
import { Field, Popup } from 'vant';
import { useMemo, useCallback, useState, useControllableValue } from '@/plugins/hooks';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';

import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';

// export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField');
  const valueField = props.get('valueField');
  const parentField = props.get('parentField');
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField, ['formTagName'], 'data');
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const TreeData = useMemo(
    () => useDataSourceToTree(dataSource, parentField, valueField),
    [dataSource, parentField, valueField],
  );
  const selfRef = useMemo(() => _.assign(ref, { reload, data: TreeData }), [TreeData, reload, ref]);

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    slots,
    columns: TreeData,
    formTagName: 'van-form-picker',
    tagName: 'van-picker',
  };
}

export function handleShowField(props) {
  const Component = props.get('render');
  const [value, setValue] = useControllableValue(props);
  const [pickerValue, setPickerValue] = useState(value);
  const [show, setShow] = useState(false);
  const Render = useCallback(
    (props) => {
      const { setShow, show, value } = props;
      console.log(props, 'props', value);
      const handleConfirm = ({ selectedValues }) => {
        setValue(selectedValues);
        setPickerValue(selectedValues);
        setShow(false);
      };
      return [
        <Field
          modelValue={value}
          onClick={() => setShow(true)}
          readonly
          is-link
          right-icon="clear"
          onClickRightIcon={(e) => {
            e.stopPropagation();
            setValue();
          }}
        />,
        <Popup show={show} onClose={() => setShow(false)} destroy-on-close round position="bottom">
          <Component {...props} onConfirm={handleConfirm} />
        </Popup>,
      ];
    },
    [Component],
  );

  return {
    render: Render,
    show,
    setShow,
    value,
    setValue,
  };
}
