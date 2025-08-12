import _ from 'lodash';
import { Field, Popup } from 'vant';
import { useMemo, useControllableValue, useCallback } from '@/plugins/hooks';
import { categoryProps } from '@/utils/dom';
import { $mergeRef } from '@/plugins/constants';

import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';

export { handleControllableValue } from '@/plugins/common/index';
export { handleComponentInForm } from '@/components/van-form/plugins/form-item';

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

/**
 * @param {Array} options - 级联数据源
 * @param {any} targetValue - 目标值
 * @returns {string|null} - 返回路径字符串，未找到返回null
 */
function findRegionPath(options, targetValue) {
  // 内部递归函数，返回路径数组或null
  function search(arr, currentPathArr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return arr.reduce((result, item) => {
      if (result) return result;
      const nextPathArr = currentPathArr.concat(item.text);
      if (item.value === targetValue) {
        return nextPathArr.join('/');
      }
      if (Array.isArray(item.children) && item.children.length > 0) {
        const childResult = search(item.children, nextPathArr);
        if (childResult) return childResult;
      }
      return null;
    }, null);
  }
  return search(options, []);
}

export function handlewFieldState(props) {
  const options = props.get('options');
  const mergeRef = props.get($mergeRef);
  const onCancelProps = props.get('onCancel', () => {});
  const onFinishProps = props.get('onFinish', () => {});
  const onCloseProps = props.get('onClose', () => {});
  const [value, setValue] = useControllableValue(props);
  const fieldValue = useMemo(() => findRegionPath(options, value), [value, options]);
  const [show, setShow] = useControllableValue(props, {
    valuePropName: 'show',
  });

  const onCancel = useCallback(
    _.wrap(onCancelProps, (fn, ...args) => {
      _.attempt(fn, ...args);
      setShow(false);
    }),
    [onCancelProps],
  );

  const onFinish = useCallback(
    _.wrap(onFinishProps, (fn, { value, selectedOptions, ...args }: { [x: string]: any }) => {
      _.attempt(fn, { value, selectedOptions, ...args });
      setValue(value);
      setShow(false);
    }),
    [onFinishProps],
  );

  const onClose = useCallback(
    _.wrap(onCloseProps, (fn, ...args) => {
      _.attempt(fn, ...args);
      setShow(false);
    }),
    [onCloseProps],
  );
  return {
    mergeRef,
    show,
    setShow,
    value,
    setValue,
    fieldValue,
    onCancel,
    onFinish,
    onClose,
    tagName: 'van-cascader',
    formTagName: 'van-form-cascader',
  };
}

export function handleFieldRender(props) {
  const Component = props.get('render');
  const render = useCallback(
    (props) => {
      const { setShow, show, value, setValue, fieldValue, clearable, mergeRef, ...componentProps } = props;
      const { outerProps, innerProps } = categoryProps(componentProps);
      const rightIcon = clearable ? 'clear' : '';
      return [
        <Field
          modelValue={fieldValue}
          onClick={() => setShow(true)}
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
          onClose={() => {
            setShow(false);
          }}
          lazy-render={false}
          round
          position="bottom"
          {...innerProps}
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
