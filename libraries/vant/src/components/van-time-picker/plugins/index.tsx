import { Popup, Field, timePickerProps, TimePicker, PickerGroup, pickerGroupProps } from 'vant';
import { createNamespace } from 'vant/es/utils';
import _ from 'lodash';
import { ref, watch } from 'vue';
import { useCallback, useMemo, useControllableValue, useEffect } from '@/plugins/hooks';
import { toValue, getCurrentValue, getFormatValue } from './utils-format';
import { categoryProps } from '@/utils/dom';

export { handleControllableValue } from '@/plugins/common/index';
export { handleComponentInForm } from '@/components/van-form/plugins/form-item';

const [name, bem] = createNamespace('time-picker');

export function handleFormTagName(props) {
  return {
    tagName: 'van-time-picker',
    formTagName: 'van-form-time-picker',
  };
}

/**
 * 处理单位
 * @param props
 * @returns
 */
function getUnitIndex(unit: string) {
  const defaultColumnsType = ['hour', 'minute', 'second'];
  let index = defaultColumnsType.indexOf(unit);
  if (index === -1) {
    index = 1;
  }
  return {
    index,
    columnsType: defaultColumnsType.slice(0, index + 1),
  };
}
export function handleColumnsType(props: any) {
  const unit = props.get('unit') || 'second';
  const { index, columnsType } = useMemo(() => {
    return getUnitIndex(unit);
  }, [unit]);
  return {
    unitIndex: index,
    columnsType,
    unit,
  };
}
handleColumnsType.order = 1;

/**
 * 处理自定义属性
 */
export function handleCustomProps(props: any) {
  const popupOpened = props.get('popupOpened');
  const [popupShow, setPopupShow] = useControllableValue(props, {
    valuePropName: 'popupShow',
    defaultValuePropName: 'popupOpened',
  });
  // 当这个属性绑定的是动态表达式的时候，需要改变
  useEffect(() => {
    watch(
      popupOpened,
      () => {
        setPopupShow(popupOpened);
      },
      { immediate: true },
    );
  }, [popupOpened]);
  const inputAlign = props.get('inputAlign') || 'right';
  const unit = props.get('unit') || 'second';
  const inLink = _.isNil(props.get('inLink')) ? true : props.get('inLink');
  const refProp = props.get('ref');
  const open = () => {
    setPopupShow(true);
  };
  const close = () => {
    setPopupShow(false);
  };
  const selfRef = _.assign(refProp, { open, close });
  const startTimeTabTitle = props.get('startTimeTabTitle') || '开始时间';
  const endTimeTabTitle = props.get('endTimeTabTitle') || '结束时间';
  return {
    popupShow,
    setPopupShow,
    inputAlign,
    unit,
    ref: selfRef,
    inLink,
    startTimeTabTitle,
    endTimeTabTitle,
  };
}
handleCustomProps.order = 0;

/**
 * 处理 modelValue
 * @param props
 * @returns
 */
export function handleModelValue(props: any) {
  const [modelValue, setModelValue] = useControllableValue(props);
  const unitIndex = props.get('unitIndex');
  const showFormatter = props.get('showFormatter');
  const unit = props.get('unit');
  const currentValue = useMemo(() => {
    return getCurrentValue(modelValue, unitIndex);
  }, [modelValue, unitIndex]);
  const formatValue = useMemo(() => {
    return getFormatValue([currentValue], unit, showFormatter);
  }, [currentValue, unit, showFormatter]);
  const isRange = props.get('isRange');
  if (isRange) {
    return {};
  }
  return {
    modelValue: currentValue,
    formatValue,
    setModelValue,
  };
}
handleModelValue.order = 2;

/**
 * 处理范围模式下的 modelValue
 * @param props
 * @returns
 */
export function handleRangeModelValue(props: any) {
  const [startValue, setStartValue] = useControllableValue(props, {
    valuePropName: 'startValue',
  });
  const [endValue, setEndValue] = useControllableValue(props, {
    valuePropName: 'endValue',
  });
  const unitIndex = props.get('unitIndex');
  // 开始值：转成数组
  const currentStartValue = useMemo(() => {
    return getCurrentValue(startValue, unitIndex);
  }, [startValue, unitIndex]);
  // 结束值：转成数组
  const currentEndValue = useMemo(() => {
    return getCurrentValue(endValue, unitIndex);
  }, [endValue, unitIndex]);
  const showFormatter = props.get('showFormatter');
  const unit = props.get('unit');
  // 格式化值
  const formatValue = useMemo(() => {
    return getFormatValue([currentStartValue, currentEndValue], unit, showFormatter);
  }, [currentStartValue, currentEndValue, unit, showFormatter]);
  // TODO 开始值：用于改变时暂存数据
  const currentStartValueRef = ref(currentStartValue);
  // 结束值：用于改变时暂存数据
  const currentEndValueRef = ref(currentEndValue);
  // 设置开始值
  const onSetCurrentStartValue = (value: Array<string>) => {
    currentStartValueRef.value = value;
  };
  // 设置结束值
  const onSetCurrentEndValue = (value: Array<string>) => {
    currentEndValueRef.value = value;
  };
  const isRange = props.get('isRange');
  if (!isRange) {
    return {};
  }
  return {
    startValue: currentStartValue,
    endValue: currentEndValue,
    onSetCurrentStartValue,
    onSetCurrentEndValue,
    currentStartValueRef,
    currentEndValueRef,
    formatValue,
    setStartValue,
    setEndValue,
  };
}
handleRangeModelValue.order = 2;

/**
 * 处理取消按钮点击
 * @param props
 * @returns
 */
export function handleCancelButtonClick(props: any) {
  const onCancelProps = props.get('onCancel', () => {});
  const setPopupShow = props.get('setPopupShow');
  const onCancel = useCallback(
    _.wrap(onCancelProps, (fn, ...args) => {
      _.attempt(fn, ...args);
      setPopupShow(false);
    }),
    [onCancelProps],
  );
  return {
    onCancel,
  };
}

/**
 * 处理确认按钮点击
 * @param props
 * @returns
 */
export function handleConfirmButtonClick(props: any) {
  const onConfirmProps = props.get('onConfirm', () => {});
  const setPopupShow = props.get('setPopupShow');
  const unitIndex = props.get('unitIndex');
  const isRange = props.get('isRange');
  const emit = props.get('emit');
  const setModelValue = props.get('setModelValue');
  const setStartValue = props.get('setStartValue');
  const setEndValue = props.get('setEndValue');
  const onConfirm = useCallback(
    (data: any) => {
      _.attempt(onConfirmProps, data);
      setPopupShow(false);
      if (isRange === true) {
        const currentStartValue = data[0]?.selectedValues || [];
        const currentEndValue = data[1]?.selectedValues || [];
        const startValues = currentStartValue?.slice(0, unitIndex + 1);
        const endValues = currentEndValue?.slice(0, unitIndex + 1);
        const startValue = toValue(startValues);
        const endValue = toValue(endValues);
        setStartValue(startValue);
        setEndValue(endValue);
        emit('sync:state', 'startValue', startValue);
        emit('sync:state', 'endValue', endValue);
      } else {
        const currentValue = data?.selectedValues || [];
        const currentValueStr = toValue(currentValue);
        setModelValue(currentValueStr);
        emit('sync:state', 'modelValue', currentValueStr);
      }
    },
    [onConfirmProps, unitIndex, isRange],
  );
  return {
    onConfirm,
  };
}

/**
 * 渲染范围模式下的内容
 * @param options
 * @returns
 */
function renderRangeContent(options: any) {
  const { props } = options;
  const {
    startValue,
    endValue,
    onSetCurrentStartValue,
    onSetCurrentEndValue,
    currentStartValueRef,
    currentEndValueRef,
  } = props;
  const { minTime, maxTime } = props;
  return (
    <PickerGroup
      {..._.pick(props, Object.keys(pickerGroupProps))}
      v-slots={{ ...options.slots }}
      tabs={[props.startTimeTabTitle, props.endTimeTabTitle]}
      onCancel={props.onCancel}
      onConfirm={props.onConfirm}>
      <TimePicker
        {..._.pick(props, Object.keys(timePickerProps))}
        showToolbar={false}
        modelValue={startValue}
        maxTime={toValue(currentEndValueRef) ?? maxTime}
        onChange={(value) => {
          onSetCurrentStartValue(value.selectedValues);
        }}
        key="start"
      />
      <TimePicker
        {..._.pick(props, Object.keys(timePickerProps))}
        showToolbar={false}
        modelValue={endValue}
        minTime={toValue(currentStartValueRef) ?? minTime}
        onChange={(value) => {
          onSetCurrentEndValue(value.selectedValues);
        }}
        key="end"
      />
    </PickerGroup>
  );
}

/**
 * 渲染基本模式下的内容
 * @param options
 * @returns
 */
function renderBasicContent(options: any) {
  const { props } = options;
  const { modelValue } = props;
  return (
    <TimePicker
      key="basic"
      {..._.pick(props, Object.keys(timePickerProps))}
      modelValue={modelValue}
      v-slots={{
        title: options.slots?.title,
      }}
      onCancel={props.onCancel}
      onConfirm={props.onConfirm}
    />
  );
}

/**
 * 处理组件渲染
 * @param props
 * @returns
 */
export function handleBasicRender(props: any) {
  const setPopupShow = props.get('setPopupShow');
  const render = useCallback((props, { attrs, slots }) => {
    const label = slots.label?.();
    const {
      formatValue,
      isRange,
      placeholder,
      inputAlign,
      closeOnClickOverlay,
      inLink,
      readonly,
      disabled,
      popupShow,
    } = props;
    const { outerProps, innerProps } = categoryProps(props);
    const onFieldClick = () => {
      if (disabled || readonly) {
        return;
      }
      setPopupShow(true);
    };
    const inputSlot = () => {
      if (!formatValue) {
        if (placeholder) {
          return <div class={bem('placeholder')}>{placeholder}</div>;
        }
        return null;
      }
      if (isRange) {
        return (
          <div class={bem('rangevalue')}>
            <div class={bem('startvalue')}>{formatValue[0]}</div>
            <div class={bem('separator')}>-</div>
            <div class={bem('endvalue')}>{formatValue[1]}</div>
          </div>
        );
      }
      return <div class={bem('value')}>{formatValue[0]}</div>;
    };
    return (
      <div {..._.pick(attrs, ['class', 'style'])} {...outerProps} class={bem('root')}>
        <Field
          disabled={disabled}
          class={[bem('field'), readonly && bem('readonly')]}
          v-slots={{ label, input: inputSlot }}
          onClick={onFieldClick}
          modelValue={formatValue}
          placeholder={placeholder}
          inputAlign={inputAlign}
          isLink={inLink}
        />
        <Popup
          show={popupShow}
          onClose={() => setPopupShow(false)}
          position="bottom"
          round
          closeOnClickOverlay={closeOnClickOverlay}
          {..._.pick(attrs, ['class', 'style'])}
          {...innerProps}>
          <div class={bem('content-wrapper')}>
            {isRange === true
              ? renderRangeContent({
                  props,
                  attrs,
                  slots,
                })
              : renderBasicContent({
                  props,
                  attrs,
                  slots,
                })}
          </div>
        </Popup>
      </div>
    );
  }, []);

  return { render };
}
handleBasicRender.order = 3;
