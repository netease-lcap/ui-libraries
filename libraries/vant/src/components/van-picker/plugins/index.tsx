import _ from 'lodash';
import { Field, Popup } from 'vant';
import { useMemo, useCallback, useState, useControllableValue, useEffect, useRef } from '@/plugins/hooks';
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
  const columns = props.get('columns');
  const onCancelProps = props.get('onCancel');
  const onConfirmProps = props.get('onConfirm');
  const [value, setValue] = useControllableValue(props);
  const [fieldValue, setFieldValue] = useState(value);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const selected = _.filter(columns, (item) => _.includes(value, item.value))
      .map((item) => item.text)
      .join(',');
    if (selected === value) return;
    setFieldValue(selected);
  }, [value, columns]);
  const onCancel = useCallback(
    _.wrap(onCancelProps, (fn, ...args) => {
      _.assign(fn, ...args);
      setShow(false);
    }),
    [onCancelProps],
  );
  const onConfirm = useCallback(
    _.wrap(onConfirmProps, (fn, { selectedValues, selectedOptions, ...args }: { [x: string]: any }) => {
      _.assign(fn, { selectedValues, selectedOptions, ...args });
      setValue(selectedValues);
      setFieldValue(_.map(selectedOptions, (item) => item.text).join(','));
      setShow(false);
    }),
    [onConfirmProps],
  );
  const render = useCallback(
    (props) => {
      const { setShow, show, value, setFieldValue, setValue, fieldValue } = props;
      return [
        <Field
          modelValue={fieldValue}
          onClick={() => setShow(true)}
          readonly
          is-link
          right-icon="clear"
          onClickRightIcon={(e) => {
            e.stopPropagation();
            setValue([]);
            setFieldValue([]);
          }}
        />,
        <Popup show={show} onClose={() => setShow(false)} lazy-render={false} round position="bottom">
          <Component
            {..._.omit(props, ['value', 'modelValue', 'pickerValue', 'onUpdate:modelValue'])}
            modelValue={value}
            ref={props.mergeRef}
          />
        </Popup>,
      ];
    },
    [Component],
  );

  return {
    render,
    show,
    setShow,
    value,
    setFieldValue,
    setValue,
    fieldValue,
    onCancel,
    onConfirm,
  };
}
