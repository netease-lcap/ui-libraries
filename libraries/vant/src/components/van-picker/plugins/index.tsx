import _ from 'lodash';
import { Field, Popup } from 'vant';
import { useMemo, useCallback, useControllableValue } from '@/plugins/hooks';
import { $deletePropsList, $dataSourceDeleteField, $mergeRef } from '@/plugins/constants';
import { categoryProps } from '@/utils/dom';

import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';

import { handleControllableValue } from '@/plugins/common/index';

export { handleComponentInForm } from '@/components/van-form/plugins/form-item';

export function handleDefaultValue(props) {
  const { modelValue, ...valueProps } = handleControllableValue(props.merge({ defaultValue: [] }));
  return {
    modelValue: _.isArray(modelValue) ? modelValue : [],
    ...valueProps,
  };
}
handleDefaultValue.order = 2;

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField') || 'text';
  const valueField = props.get('valueField');
  const parentField = props.get('parentField');
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField, ['formTagName'], 'data');
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ textField, valueField, label: 'text', dataSource: useFormatDataSource(data) });
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
  const mergeRef = props.get($mergeRef);
  const onCancelProps = props.get('onCancel', () => {});
  const onConfirmProps = props.get('onConfirm', () => {});
  const value = props.get('modelValue');
  const setValue = props.get('onUpdate:modelValue');
  // const [value, setValue] = useControllableValue(props, {
  //   defaultValue: [],
  // });
  const fieldValue = useMemo(() => {
    const selected = _.map(value, (item) => _.find(columns, (columnsItem) => columnsItem.value === item)?.text);
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
    mergeRef,
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
      const { setShow, show, value, setValue, fieldValue, clearable, mergeRef, ...componentProps } = props;
      const rightIcon = clearable ? 'clear' : '';
      const { outerProps, innerProps } = categoryProps(componentProps);

      return [
        <Field
          placeholder={props.placeholder}
          onClick={() => setShow(true)}
          {..._.omit(outerProps, 'onUpdate:modelValue')}
          modelValue={fieldValue}
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
          {..._.omit(innerProps, 'columns', 'expose', 'onConfirm')}
        >
          <Component
            {..._.omit(props, [
              'value',
              'modelValue',
              'pickerValue',
              'onUpdate:modelValue',
              'mergeRef',
              'setValue',
              'setShow',
              'expose',
              'show',
            ])}
            modelValue={value}
            ref={mergeRef}
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
