import _ from 'lodash';
import { Field, Popup } from 'vant';
import { useMemo, useControllableValue, useCallback } from '@/plugins/hooks';

import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';

export { handleControllableValue } from '@/plugins/common/index';
// export * from './ide';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'text');
  const valueField = props.get('valueField', 'value');
  const parentField = props.get('parentField', 'parentid');
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const TreeData = useMemo(() => useDataSourceToTree(dataSource, parentField, valueField), [dataSource]);
  const selfRef = useMemo(() => _.assign(ref, { reload, data: TreeData }), [TreeData, reload, ref]);

  return {
    ref: selfRef,
    loading,
    options: TreeData,
  };
}

export function handleShowField(props) {
  const Component = props.get('render');
  const columns = props.get('columns');
  const onCancelProps = props.get('onCancel');
  const onConfirmProps = props.get('onConfirm');
  const [value, setValue] = useControllableValue(props);
  const fieldValue = useMemo(() => {
    const selected = _.map(value, (item) => _.find(columns, (columnsItem) => columnsItem.value === item).text);
    return selected.join(',');
  }, [value, columns]);
  const [show, setShow] = useControllableValue(props, {
    defaultValue: false,
    valuePropName: 'show',
  });
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
      setShow(false);
    }),
    [onConfirmProps],
  );
  const render = useCallback(
    (props) => {
      const { setShow, show, value, setValue, fieldValue, clearable } = props;
      const rightIcon = clearable ? 'clear' : '';
      return [
        <Field
          modelValue={fieldValue}
          onClick={() => setShow(true)}
          data-nodepath={props['data-nodepath']}
          data-enable-events={props['data-enable-events']}
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
          data-drawer-dropdown-status={props['data-drawer-dropdown-status']}
          data-drawer-dropdown-selector={props['data-drawer-dropdown-selector']}
          data-nodepath={props['data-nodepath']}
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
    show,
    setShow,
    value,
    setValue,
    fieldValue,
    onCancel,
    onConfirm,
  };
}
