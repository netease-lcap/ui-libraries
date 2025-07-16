import { Popup, Field, timePickerProps, Tabs, Tab, TimePicker } from 'vant';
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
    showToolbar: false,
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
  formatValue.value = getFormatValue([currentStartValue, currentEndValue], props.get('unit'), props.get('showFormatter'));
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
  const currentStartValueRef = props.get('currentStartValueRef');
  const currentEndValueRef = props.get('currentEndValueRef');
  const currentValueRef = props.get('currentValueRef');
  const onConfirmClick = useCallback(
    (data: any) => {
      if (_.isFunction(onConfirm)) {
        _.attempt(onConfirm);
      }
      popupVisible.value = false;

      if (isRange === true) {
        const currentStartValue = currentStartValueRef?.value || [];
        const currentEndValue = currentEndValueRef?.value || [];
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
        const currentValue = currentValueRef?.value || [];
        formatValue.value = getFormatValue([currentValue], props.get('unit'), props.get('showFormatter'));
        const currentValueStr = toValue(currentValue);
        emit('update:modelValue', currentValueStr);
        emit('sync:state', 'modelValue', currentValueStr);
      }
    },
    [onConfirm, unitIndex, popupVisible, currentStartValueRef, currentEndValueRef, currentValueRef],
  );
  return {
    onConfirm: onConfirmClick,
  };
}
handleConfirmButtonClick.order = 4;

/**
 * 渲染头部工具栏
 * @param options
 * @returns
 */
function renderToolBar(options: any) {
  const { props, slots } = options;
  const topSlot = slots.topbarleft;
  const topRightSlot = slots.topbarright;
  const topCenterSlot = slots.topbarcenter;
  const onCancel = () => {
    props.onCancel?.();
  };
  const onConfirm = () => {
    props.onConfirm?.();
  };
  return (
    <div class={[bem('toolbar'), 'van-picker__toolbar']}>
      <div class={bem('cancel')} onClick={onCancel} onKeydown={onCancel} role="button" tabindex="0">
        {topSlot && topSlot()}
      </div>
      <div class={bem('title')}>{topCenterSlot && topCenterSlot()}</div>
      <div class={bem('confirm')} onClick={onConfirm} onKeydown={onConfirm} role="button" tabindex="0">
        {topRightSlot && topRightSlot()}
      </div>
    </div>
  );
}

/**
 * 渲染底部栏
 * @param options
 * @returns
 */
function renderBottomBar(options: any) {
  const { props, slots } = options;
  const bottomSlot = slots.bottombarleft;
  const bottomRightSlot = slots.bottombarright;
  const onCancel = () => {
    props.onCancel?.();
  };
  const onConfirm = () => {
    props.onConfirm?.();
  };
  return (
    <div class={bem('bottom-bar')}>
      <div class={bem('bottom-bar-left')} onClick={onCancel} onKeydown={onCancel} role="button" tabindex="0">
        {bottomSlot && bottomSlot()}
      </div>
      <div class={bem('bottom-bar-right')} onClick={onConfirm} onKeydown={onConfirm} role="button" tabindex="0">
        {bottomRightSlot && bottomRightSlot()}
      </div>
    </div>
  );
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
    <Tabs line-width="150px" lazyRender={false}>
      <Tab title="开始">
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
      </Tab>
      <Tab style={{ flex: '0 0 20px' }} title="至" disabled />
      <Tab title="结束">
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
      </Tab>
    </Tabs>
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
      {..._.pick(props, Object.keys(timePickerProps))}
      modelValue={modelValue}
      onChange={(value) => {
        onSetCurrentValue(value.selectedValues);
      }}
      key="basic"
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
      const {
        formatValue,
        isRange,
        placeholder,
        inputAlign,
        closeOnClickOverlay,
      } = props;
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
              {renderToolBar({ props, attrs, slots })}
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
              {renderBottomBar({ props, attrs, slots })}
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
