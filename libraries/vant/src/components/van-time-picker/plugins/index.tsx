import { Popup, Field, timePickerProps, TimePicker, PickerGroup, pickerGroupProps } from 'vant';
import { createNamespace } from 'vant/es/utils';
import { ref } from 'vue';
import _ from 'lodash';
import { useCallback, useMemo } from '@/plugins/hooks';
import { toValue, getCurrentValue, getFormatValue } from './utils-format';

const [name, bem] = createNamespace('time-picker');

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
  const isRange = props.get('isRange');
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
  const formatValue = ref('');
  const popupOpened = props.get('popupOpened');
  const popupVisible = ref(popupOpened);
  const inputAlign = props.get('inputAlign') || 'right';
  const unit = props.get('unit') || 'second';
  const refProp = props.get('ref');
  const open = () => {
    popupVisible.value = true;
  };
  const close = () => {
    popupVisible.value = false;
  };
  const selfRef = _.assign(refProp, { open, close });
  return {
    formatValue,
    popupVisible,
    inputAlign,
    unit,
    ref: selfRef,
  };
}
handleCustomProps.order = 0;

/**
 * 处理 modelValue
 * @param props
 * @returns
 */
export function handleModelValue(props: any) {
  const modelValue = props.get('modelValue');
  const unitIndex = props.get('unitIndex');
  const formatValue = props.get('formatValue');
  const currentValue = useMemo(() => {
    return getCurrentValue(modelValue, unitIndex);
  }, [modelValue, unitIndex]);
  const isRange = props.get('isRange');
  if (isRange) {
    return {};
  }
  formatValue.value = getFormatValue([currentValue], props.get('unit'), props.get('showFormatter'));
  const currentValueRef = ref(currentValue);
  const onSetCurrentValue = (value: Array<string>) => {
    currentValueRef.value = value;
  };
  return {
    modelValue: currentValue,
    onSetCurrentValue,
    currentValueRef,
  };
}
handleModelValue.order = 2;

/**
 * 处理范围模式下的 modelValue
 * @param props
 * @returns
 */
export function handleRangeModelValue(props: any) {
  const startValue = props.get('startValue');
  const endValue = props.get('endValue');
  const unitIndex = props.get('unitIndex');
  const formatValue = props.get('formatValue');
  // 开始值：转成数组
  const currentStartValue = useMemo(() => {
    return getCurrentValue(startValue, unitIndex);
  }, [startValue, unitIndex]);
  // 结束值：转成数组
  const currentEndValue = useMemo(() => {
    return getCurrentValue(endValue, unitIndex);
  }, [endValue, unitIndex]);
  const isRange = props.get('isRange');
  if (!isRange) {
    return {};
  }
  // 开始值：用于改变时暂存数据
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
  // 格式化值
  formatValue.value = getFormatValue(
    [currentStartValue, currentEndValue],
    props.get('unit'),
    props.get('showFormatter'),
  );
  return {
    startValue: currentStartValue,
    endValue: currentEndValue,
    onSetCurrentStartValue,
    onSetCurrentEndValue,
    currentStartValueRef,
    currentEndValueRef,
  };
}
handleRangeModelValue.order = 2;

/**
 * 处理取消按钮点击
 * @param props
 * @returns
 */
export function handleCancelButtonClick(props: any) {
  const onCancel = props.get('onCancel');
  const popupVisible = props.get('popupVisible');
  const onCancelClick = useCallback(
    (data: any) => {
      if (_.isFunction(onCancel)) {
        _.attempt(onCancel);
      }
      popupVisible.value = false;
    },
    [onCancel, popupVisible],
  );
  return {
    onCancel: onCancelClick,
  };
}
handleCancelButtonClick.order = 4;

/**
 * 处理确认按钮点击
 * @param props
 * @returns
 */
export function handleConfirmButtonClick(props: any) {
  const onConfirm = props.get('onConfirm');
  const popupVisible = props.get('popupVisible');
  const formatValue = props.get('formatValue');
  const unitIndex = props.get('unitIndex');
  const isRange = props.get('isRange');
  const emit = props.get('emit');
  const onConfirmClick = useCallback(
    (data: any) => {
      if (_.isFunction(onConfirm)) {
        _.attempt(onConfirm);
      }
      popupVisible.value = false;
      if (isRange === true) {
        const currentStartValue = data[0]?.selectedValues || [];
        const currentEndValue = data[1]?.selectedValues || [];
        const startValues = currentStartValue?.slice(0, unitIndex + 1);
        const endValues = currentEndValue?.slice(0, unitIndex + 1);
        formatValue.value = getFormatValue([startValues, endValues], props.get('unit'), props.get('showFormatter'));
        const startValue = toValue(startValues);
        const endValue = toValue(endValues);
        emit('update:startValue', startValue);
        emit('sync:state', 'startValue', startValue);
        emit('update:endValue', endValue);
        emit('sync:state', 'endValue', endValue);
      } else {
        const currentValue = data?.selectedValues || [];
        formatValue.value = getFormatValue([currentValue], props.get('unit'), props.get('showFormatter'));
        const currentValueStr = toValue(currentValue);
        emit('update:modelValue', currentValueStr);
        emit('sync:state', 'modelValue', currentValueStr);
      }
    },
    [onConfirm, unitIndex, popupVisible],
  );
  return {
    onConfirm: onConfirmClick,
  };
}
handleConfirmButtonClick.order = 4;

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
      tabs={['开始时间', '结束时间']}
      onCancel={props.onCancel}
      onConfirm={props.onConfirm}
    >
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
  const { modelValue, onSetCurrentValue } = props;
  return (
    <TimePicker
      key="basic"
      {..._.pick(props, Object.keys(timePickerProps))}
      modelValue={modelValue}
      v-slots={{
        title: options.slots?.title?.(),
      }}
      onChange={(value) => {
        onSetCurrentValue(value.selectedValues);
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
  const popupVisible = ref(props.get('popupVisible') || false);
  const disabled = props.get('disabled');
  const onFieldClick = () => {
    if (disabled) {
      return;
    }
    popupVisible.value = true;
  };
  const render = useCallback(
    (props, { attrs, slots }) => {
      const label = slots.label?.();
      const { formatValue, isRange, placeholder, inputAlign, closeOnClickOverlay } = props;
      return (
        <div {...attrs}>
          <Field
            readonly
            disabled={disabled}
            class={bem('field')}
            v-slots={{ label }}
            onClick={onFieldClick}
            modelValue={formatValue}
            placeholder={placeholder}
            inputAlign={inputAlign}
          />
          <Popup
            v-model:show={popupVisible.value}
            position="bottom"
            round
            closeOnClickOverlay={closeOnClickOverlay}
            {...attrs}>
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
    },
    [props],
  );

  return { render, ...props, popupVisible };
}
handleBasicRender.order = 3;
