import { Popup, Field, datePickerProps, DatePicker, PickerGroup, pickerGroupProps, TimePicker } from 'vant';
import { createNamespace } from 'vant/es/utils';
import { ref } from 'vue';
import _ from 'lodash';
import { useCallback, useMemo } from '@/plugins/hooks';
import {
  toValue,
  getCurrentValue,
  getCurrentTimeValue,
  getFormatValue,
  getMaxMinDates,
  getTimeBoundary,
  getRangeMaxDate,
  getRangeMinDate,
  getValidUnit,
} from './utils-format';

const [name, bem] = createNamespace('date-picker');

/**
 * 处理单位
 * @param props
 * @returns
 */
function getUnitIndex(unit: string, type: string) {
  const defaultDateColumnsType = ['year', 'month', 'day'];
  const defaultDatetimeColumnsType = ['hour', 'minute', 'second'];
  if (type === 'datetime') {
    let index = defaultDatetimeColumnsType.indexOf(unit);
    if (index === -1) {
      index = 1;
    }
    return {
      index: 2,
      columnsType: defaultDateColumnsType,
      timeIndex: index,
      timeColumnsType: defaultDatetimeColumnsType.slice(0, index + 1),
    };
  }
  let index = defaultDateColumnsType.indexOf(unit);
  if (index === -1) {
    index = 1;
  }
  return {
    index,
    columnsType: defaultDateColumnsType.slice(0, index + 1),
  };
}

export function handleColumnsType(props: any) {
  const unit = props.get('unit');
  const type = props.get('type') || 'date';
  const { index, columnsType, timeIndex, timeColumnsType } = useMemo(() => {
    return getUnitIndex(unit, type);
  }, [unit, type]);
  return {
    unitIndex: index,
    columnsType,
    unit,
    timeUnitIndex: timeIndex,
    timeColumnsType,
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
  const type = props.get('type') || 'date';
  const unit = props.get('unit');
  const validUnit = getValidUnit(unit, type);
  const refProp = props.get('ref');
  const open = () => {
    popupVisible.value = true;
  };
  const close = () => {
    popupVisible.value = false;
  };
  const { maxDateValue, minDateValue } = useMemo(() => {
    return getMaxMinDates(props.get('maxDate'), props.get('minDate'));
  }, [props.get('maxDate'), props.get('minDate')]);
  const selfRef = _.assign(refProp, { open, close });
  return {
    formatValue,
    popupVisible,
    inputAlign,
    unit: validUnit,
    ref: selfRef,
    maxDate: maxDateValue,
    minDate: minDateValue,
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
  const timeUnitIndex = props.get('timeUnitIndex');
  const formatValue = props.get('formatValue');
  const type = props.get('type');
  const currentValue = useMemo(() => {
    return getCurrentValue(modelValue, unitIndex);
  }, [modelValue, unitIndex, type]);
  const currentTimeValue = useMemo(() => {
    return getCurrentTimeValue(modelValue, timeUnitIndex);
  }, [modelValue, type]);
  const currentValueRef = ref(currentValue);
  const onSetCurrentValue = (value: Array<string>) => {
    currentValueRef.value = value;
  };
  const isRange = props.get('isRange');
  if (isRange) {
    return {};
  }
  formatValue.value = getFormatValue([[currentValue, currentTimeValue]], props);
  return {
    modelValue: currentValue,
    modelTimeValue: currentTimeValue,
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
  const timeUnitIndex = props.get('timeUnitIndex');
  const formatValue = props.get('formatValue');
  // 开始值：转成数组
  const currentStartValue = useMemo(() => {
    return getCurrentValue(startValue, unitIndex);
  }, [startValue, unitIndex]);
  const currentStartTimeValue = useMemo(() => {
    return getCurrentTimeValue(startValue, timeUnitIndex);
  }, [startValue, timeUnitIndex]);
  // 结束值：转成数组
  const currentEndValue = useMemo(() => {
    return getCurrentValue(endValue, unitIndex);
  }, [endValue, unitIndex]);
  const currentEndTimeValue = useMemo(() => {
    return getCurrentTimeValue(endValue, timeUnitIndex);
  }, [endValue, timeUnitIndex]);
  const isRange = props.get('isRange');
  if (!isRange) {
    return {};
  }
  // 开始值：用于改变时暂存数据
  const currentStartValueRef = ref(currentStartValue);
  const currentStartTimeValueRef = ref(currentStartTimeValue);
  // 结束值：用于改变时暂存数据
  const currentEndValueRef = ref(currentEndValue);
  const currentEndTimeValueRef = ref(currentEndTimeValue);
  // 设置开始值
  const onSetCurrentStartValue = (value: Array<string>) => {
    currentStartValueRef.value = value;
  };
  const onSetCurrentStartTimeValue = (value: Array<string>) => {
    currentStartTimeValueRef.value = value;
  };
  // 设置结束值
  const onSetCurrentEndValue = (value: Array<string>) => {
    currentEndValueRef.value = value;
  };
  const onSetCurrentEndTimeValue = (value: Array<string>) => {
    currentEndTimeValueRef.value = value;
  };
  // 格式化值
  formatValue.value = getFormatValue(
    [
      [currentStartValue, currentStartTimeValue],
      [currentEndValue, currentEndTimeValue],
    ],
    props,
  );
  return {
    startValue: currentStartValue,
    endValue: currentEndValue,
    onSetCurrentStartValue,
    onSetCurrentEndValue,
    currentStartValueRef,
    currentEndValueRef,
    currentStartTimeValueRef,
    currentEndTimeValueRef,
    onSetCurrentStartTimeValue,
    onSetCurrentEndTimeValue,
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
  const type = props.get('type');
  const onConfirmClick = useCallback(
    (data: any) => {
      if (_.isFunction(onConfirm)) {
        _.attempt(onConfirm);
      }
      popupVisible.value = false;
      if (isRange === true) {
        let currentStartValue = [];
        let currentStartTimeValue = [];
        let currentEndValue = [];
        let currentEndTimeValue = [];
        if (type === 'date') {
          currentStartValue = data[0]?.selectedValues || [];
          currentEndValue = data[1]?.selectedValues || [];
        } else {
          currentStartValue = data[0]?.selectedValues || [];
          currentStartTimeValue = data[1]?.selectedValues || [];
          currentEndValue = data[2]?.selectedValues || [];
          currentEndTimeValue = data[3]?.selectedValues || [];
        }
        formatValue.value = getFormatValue(
          [
            [currentStartValue, currentStartTimeValue],
            [currentEndValue, currentEndTimeValue],
          ],
          props,
        );
        const startValue = toValue(currentStartValue, currentStartTimeValue, props.get('converter'));
        const endValue = toValue(currentEndValue, currentEndTimeValue, props.get('converter'));
        emit('update:startValue', startValue);
        emit('sync:state', 'startValue', startValue);
        emit('update:endValue', endValue);
        emit('sync:state', 'endValue', endValue);
      } else {
        let currentDateValue = data?.selectedValues || [];
        let currentTimeValue = [];
        if (Array.isArray(data)) {
          currentDateValue = data[0]?.selectedValues || [];
          currentTimeValue = data[1]?.selectedValues || [];
        }
        const currentValueStr = toValue(currentDateValue, currentTimeValue, props.get('converter'));
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
    startTimeValue,
    endTimeValue,
    currentStartTimeValueRef,
    currentEndTimeValueRef,
    onSetCurrentStartTimeValue,
    onSetCurrentEndTimeValue,
  } = props;
  const { minDate, maxDate, type, timeColumnsType } = props;
  const startDateMaxDate = getMaxMinDates(getRangeMaxDate(currentEndValueRef, currentEndTimeValueRef, maxDate), minDate)
    .maxDateValue;
  const endDateMinDate = getMaxMinDates(maxDate, getRangeMinDate(currentStartValueRef, currentStartTimeValueRef, minDate))
    .minDateValue;
  const startTimeMaxTime = getTimeBoundary(
    currentStartValueRef,
    getRangeMaxDate(currentEndValueRef, currentEndTimeValueRef, maxDate),
    minDate,
  ).maxTime;
  const startTimeMinTime = getTimeBoundary(currentStartValueRef, maxDate, minDate).minTime;
  const endTimeMaxTime = getTimeBoundary(currentEndValueRef, maxDate, minDate).maxTime;
  const endTimeMinTime = getTimeBoundary(
    currentEndValueRef,
    maxDate,
    getRangeMinDate(currentStartValueRef, currentStartTimeValueRef, minDate),
  ).minTime;
  const tabsData = useMemo(() => {
    if (type === 'date') {
      return ['开始日期', '结束日期'];
    }
    return ['开始日期', '开始时间', '结束日期', '结束时间'];
  }, [type]);
  const startDateComponentRef = ref(null);
  const endDateComponentRef = ref(null);
  const startTimeComponentRef = ref(null);
  const endTimeComponentRef = ref(null);
  return (
    <PickerGroup
      {..._.pick(props, Object.keys(pickerGroupProps))}
      v-slots={{ ...options.slots }}
      tabs={tabsData}
      onCancel={props.onCancel}
      onConfirm={props.onConfirm}>
      <DatePicker
        {..._.pick(props, Object.keys(datePickerProps))}
        ref={startDateComponentRef}
        showToolbar={false}
        modelValue={startValue}
        maxDate={startDateMaxDate}
        minDate={minDate}
        onChange={(value) => {
          onSetCurrentStartValue(value.selectedValues);
          // TimePicker 还没有触发onChange，所以需要手动获取时间
          const startTimeValue = startTimeComponentRef.value?.getSelectedTime();
          if (startTimeValue) {
            onSetCurrentStartTimeValue(startTimeValue);
          }
        }}
        key="start"
      />
      {type === 'datetime' && (
        <TimePicker
          ref={startTimeComponentRef}
          showToolbar={false}
          columnsType={timeColumnsType}
          modelValue={startTimeValue}
          maxTime={startTimeMaxTime}
          minTime={startTimeMinTime}
          onChange={(value) => {
            onSetCurrentStartTimeValue(value.selectedValues);
            const startDateValue = startDateComponentRef.value?.getSelectedDate();
            if (startDateValue) {
              onSetCurrentStartValue(startDateValue);
            }
          }}
        />
      )}
      <DatePicker
        ref={endDateComponentRef}
        {..._.pick(props, Object.keys(datePickerProps))}
        showToolbar={false}
        modelValue={endValue}
        maxDate={maxDate}
        minDate={endDateMinDate}
        onChange={(value) => {
          onSetCurrentEndValue(value.selectedValues);
          const endTimeValue = endTimeComponentRef.value?.getSelectedTime();
          if (endTimeValue) {
            onSetCurrentEndTimeValue(endTimeValue);
          }
        }}
        key="end"
      />
      {type === 'datetime' && (
        <TimePicker
          ref={endTimeComponentRef}
          showToolbar={false}
          columnsType={timeColumnsType}
          modelValue={endTimeValue}
          maxTime={endTimeMaxTime}
          minTime={endTimeMinTime}
          onChange={(value) => {
            onSetCurrentEndTimeValue(value.selectedValues);
            const endDateValue = endDateComponentRef.value?.getSelectedDate();
            if (endDateValue) {
              onSetCurrentEndValue(endDateValue);
            }
          }}
        />
      )}
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
  const { modelValue, modelTimeValue, type, timeColumnsType, minDate, maxDate, onSetCurrentValue, currentValueRef } =
    props;
  const renderDatePicker = () => {
    return (
      <DatePicker
        key="basic"
        {..._.pick(props, Object.keys(datePickerProps))}
        modelValue={modelValue}
        maxDate={maxDate}
        minDate={minDate}
        v-slots={{
          title: options.slots?.title?.(),
        }}
        onCancel={props.onCancel}
        onConfirm={props.onConfirm}
      />
    );
  };
  const renderDateTimePicker = () => {
    return (
      <PickerGroup
        {..._.pick(props, Object.keys(pickerGroupProps))}
        v-slots={{ ...options.slots }}
        tabs={['选择日期', '选择时间']}
        onCancel={props.onCancel}
        onConfirm={props.onConfirm}>
        <DatePicker
          key="basic"
          {..._.pick(props, Object.keys(datePickerProps))}
          modelValue={modelValue}
          maxDate={maxDate}
          minDate={minDate}
          onChange={(value) => {
            onSetCurrentValue(value.selectedValues);
          }}
        />
        {type === 'datetime' && (
          <TimePicker
            key="time"
            columnsType={timeColumnsType}
            modelValue={modelTimeValue}
            maxTime={getTimeBoundary(currentValueRef, maxDate, minDate).maxTime}
            minTime={getTimeBoundary(currentValueRef, maxDate, minDate).minTime}
          />
        )}
      </PickerGroup>
    );
  };
  if (type === 'datetime') {
    return renderDateTimePicker();
  }
  return renderDatePicker();
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
      const { formatValue, isRange, placeholder, inputAlign, closeOnClickOverlay } = props;
      return (
        <div {...attrs}>
          <Field
            readonly
            disabled={disabled}
            class={bem('field')}
            v-slots={{ label: slots.label }}
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
