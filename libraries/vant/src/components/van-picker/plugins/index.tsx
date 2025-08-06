import _ from 'lodash';
import { Field, Popup } from 'vant';
import { useMemo, useCallback, useState, useControllableValue } from '@/plugins/hooks';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { categoryProps } from '@/utils/dom';

import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';

export { handleComponentInForm } from '@/components/van-form/plugins/form-item';
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

export function handlewFieldState(props) {
  const columns = props.get('columns');
  const onCancelProps = props.get('onCancel', () => {});
  const onConfirmProps = props.get('onConfirm', () => {});
  const [value, setValue] = useControllableValue(props);
  const fieldValue = useMemo(() => {
    const selected = _.map(value, (item) => _.find(columns, (columnsItem) => columnsItem.value === item).text);
    return _.join(selected, ',');
  }, [value, columns]);
  const [show, setShow] = useControllableValue(props, {
    defaultValue: false,
    valuePropName: 'show',
    trigger: 'onUpdate:show',
  });
  const onCancel = useCallback(
    _.wrap(onCancelProps, (fn, ...args) => {
      _.attempt(fn, ...args);
      setShow(false);
    }),
    [onCancelProps],
  );
  const onConfirm = useCallback(
    _.wrap(onConfirmProps, (fn, { selectedValues, selectedOptions, ...args }: { [x: string]: any }) => {
      _.attempt(fn, { selectedValues, selectedOptions, ...args });
      setValue(selectedValues);
      setShow(false);
    }),
    [onConfirmProps],
  );

  return {
    show,
    setShow,
    value,
    setValue,
    fieldValue,
    onCancel,
    onConfirm,
  };
}

export function handleFieldRender(props) {
  const Component = props.get('render');
  const render = useCallback(
    (props) => {
      const { setShow, show, value, setValue, fieldValue, clearable } = props;
      const rightIcon = clearable ? 'clear' : '';
      const outerProps = categoryProps(props);
      return [
        <Field
          modelValue={fieldValue}
          onClick={() => setShow(true)}
          // data-nodepath={props['data-nodepath']}
          // data-enable-events={props['data-enable-events']}
          {...outerProps}
          readonly
          is-link
          right-icon={rightIcon}
          onClickRightIcon={(e) => {
            e.stopPropagation();
            setValue([]);
          }}
        />,
        <Popup
          show={show}
          onClose={() => setShow(false)}
          lazy-render={false}
          round
          position="bottom"
          {...outerProps}
          // data-drawer-dropdown-status={props['data-drawer-dropdown-status']}
          // data-drawer-dropdown-selector={props['data-drawer-dropdown-selector']}
          // data-nodepath={props['data-nodepath']}
          ide-draggable={props['ide-draggable']}
        >
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
  };
}
