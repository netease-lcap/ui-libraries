import _ from 'lodash';
import { Field, Popup, Search } from 'vant';
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
    columns: TreeData,
    formTagName: 'van-form-picker',
    tagName: 'van-picker',
  };
}

export function handleSearchRender(props) {
  const [searchValue, setSearchValue] = useControllableValue(props, {
    defaultValue: '',
    valuePropName: 'searchValue',
    trigger: 'onUpdate:searchValue',
    onChange: (searchValue) => {
      props.get('emit')('sync:state', 'filterText', searchValue);
    },
  });
  const columns = props.get('columns');
  const filterable = props.get('filterable');
  const remote = props.get('remote');
  const searchColumns = useMemo(() => {
    if (remote || !filterable) return columns;
    return columns.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()));
  }, [columns, searchValue, remote, filterable]);

  return {
    columns: searchColumns,
    searchValue,
    setSearchValue,
  };
}
handleSearchRender.order = 5;

export function handlewFieldState(props) {
  const columns = props.get('columns');
  const mergeRef = props.get($mergeRef);
  const refProps = props.get('ref');
  const onCancelProps = props.get('onCancel', () => {});
  const onConfirmProps = props.get('onConfirm', () => {});

  const value = props.get('modelValue');
  const setValue = props.get('onUpdate:modelValue');

  const fieldValue = useMemo(() => {
    const selected = _.map(value, (item) => _.find(columns, (columnsItem) => columnsItem.value === item)?.text);
    return _.join(selected, ',');
  }, [value, columns]);
  const [show, setShow] = useControllableValue(props, {
    defaultValue: false,
    valuePropName: 'show',
    trigger: 'onUpdate:show',
  });
  const ref = useMemo(
    () => _.assign(refProps, {
        show: () => setShow(true),
        close: () => setShow(false),
      }),
    [setShow, refProps],
  );
  const onCancel = useCallback(
    _.wrap(onCancelProps, (fn, ...args) => {
      _.attempt(fn, ...args);
      setShow(false);
    }),
    [onCancelProps],
  );
  const onConfirm = useCallback(
    _.wrap(onConfirmProps, (fn, { selectedValues, selectedOptions, ...args }: { [x: string]: any }) => {
      setValue(selectedValues);
      _.attempt(fn, { selectedValues, selectedOptions, ...args });
      setShow(false);
    }),
    [onConfirmProps],
  );

  return {
    ref,
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
    (props, { attrs, slots }) => {
      const {
        setShow,
        show,
        value,
        setValue,
        fieldValue,
        clearable,
        mergeRef,
        searchValue,
        setSearchValue,
        filterable,
        optionSlot,
        preview,
        disabled,
        ...componentProps
      } = props;
      const rightIcon = clearable ? 'clear' : '';
      const { outerProps, innerProps } = categoryProps(componentProps);

      return [
        <Field
          placeholder={props.placeholder}
          disabled={disabled}
          onClick={() => {
            if (preview || disabled) {
              return;
            }
            setShow(true);
          }}
          {..._.omit(outerProps, 'onUpdate:modelValue')}
          modelValue={fieldValue}
          readonly
          is-link
          right-icon={rightIcon}
          onClickRightIcon={(e) => {
            e.stopPropagation();
            setValue([]);
          }}
          {..._.pick(attrs, ['class'])}
        />,
        <Popup
          show={show}
          onClose={() => {
            setSearchValue('');
            setShow(false);
          }}
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
            v-slots={{
              ...slots,
              ...(optionSlot
                ? {
                    option: (item, index) => slots.item?.({ item, index }),
                  }
                : {}),
              'columns-top': filterable ? (
                <Search modelValue={searchValue} onUpdate:modelValue={setSearchValue} />
              ) : null,
            }}
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
