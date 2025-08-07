import { Popup, Field, datePickerProps, DatePicker, PickerGroup, pickerGroupProps, TimePicker } from 'vant';
import { createNamespace } from 'vant/es/utils';
import { ref, watch } from 'vue';
import _ from 'lodash';
import { useCallback, useMemo, useControllableValue, useEffect } from '@/plugins/hooks';
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
import { categoryProps } from '@/utils/dom';

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
  const inLink = _.isNil(props.get('inLink')) ? true : props.get('inLink');
  const { index, columnsType, timeIndex, timeColumnsType } = useMemo(() => {
    return getUnitIndex(unit, type);
  }, [unit, type]);
  return {
    unitIndex: index,
    columnsType,
    unit,
    timeUnitIndex: timeIndex,
    timeColumnsType,
    inLink,
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
  const type = props.get('type') || 'date';
  const unit = props.get('unit');
  const validUnit = getValidUnit(unit, type);
  const refProp = props.get('ref');
  const open = () => {
    setPopupShow(true);
  };
  const close = () => {
    setPopupShow(false);
  };
  const { maxDateValue, minDateValue } = useMemo(() => {
    return getMaxMinDates(props.get('maxDate'), props.get('minDate'));
  }, [props.get('maxDate'), props.get('minDate')]);
  const selfRef = _.assign(refProp, { open, close });
  return {
    popupShow,
    setPopupShow,
    inputAlign,
    unit: validUnit,
    ref: selfRef,
    maxDate: maxDateValue,
    minDate: minDateValue,
    type,
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
  const timeUnitIndex = props.get('timeUnitIndex');
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
  const unit = props.get('unit');
  const showFormatter = props.get('showFormatter');
  const advancedFormatEnable = props.get('advancedFormatEnable');
  const advancedFormatValue = props.get('advancedFormatValue');
  const formatValue = useMemo(() => {
    return getFormatValue([[currentValue, currentTimeValue]], { unit, showFormatter, advancedFormatEnable, advancedFormatValue });
  }, [currentValue, unit, showFormatter, advancedFormatEnable, advancedFormatValue]);
  const isRange = props.get('isRange');
  if (isRange) {
    return {};
  }
  return {
    modelValue: currentValue,
    setModelValue,
    modelTimeValue: currentTimeValue,
    onSetCurrentValue,
    currentValueRef,
    formatValue,
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
  const timeUnitIndex = props.get('timeUnitIndex');
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
  const unit = props.get('unit');
  const showFormatter = props.get('showFormatter');
  const advancedFormatEnable = props.get('advancedFormatEnable');
  const advancedFormatValue = props.get('advancedFormatValue');
  const formatValue = useMemo(() => {
    return getFormatValue(
      [
        [currentStartValue, currentStartTimeValue],
        [currentEndValue, currentEndTimeValue],
      ],
      { unit, showFormatter, advancedFormatEnable, advancedFormatValue },
    );
  }, [currentStartValue, currentStartTimeValue, currentEndValue, currentEndTimeValue, unit, showFormatter, advancedFormatEnable, advancedFormatValue]);
  return {
    startValue: currentStartValue,
    setStartValue,
    endValue: currentEndValue,
    setEndValue,
    onSetCurrentStartValue,
    onSetCurrentEndValue,
    currentStartValueRef,
    currentEndValueRef,
    currentStartTimeValueRef,
    currentEndTimeValueRef,
    onSetCurrentStartTimeValue,
    onSetCurrentEndTimeValue,
    formatValue,
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
handleCancelButtonClick.order = 4;

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
  const type = props.get('type');
  const setStartValue = props.get('setStartValue');
  const setEndValue = props.get('setEndValue');
  const setModelValue = props.get('setModelValue');
  const onConfirm = useCallback(
    (data: any) => {
      _.attempt(onConfirmProps, data);
      setPopupShow(false);
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
        const startValue = toValue(currentStartValue, currentStartTimeValue, props.get('converter'));
        const endValue = toValue(currentEndValue, currentEndTimeValue, props.get('converter'));
        setStartValue(startValue);
        setEndValue(endValue);
        emit('sync:state', 'startValue', startValue);
        emit('sync:state', 'endValue', endValue);
      } else {
        let currentDateValue = data?.selectedValues || [];
        let currentTimeValue = [];
        if (Array.isArray(data)) {
          currentDateValue = data[0]?.selectedValues || [];
          currentTimeValue = data[1]?.selectedValues || [];
        }
        const currentValueStr = toValue(currentDateValue, currentTimeValue, props.get('converter'));
        setModelValue(currentValueStr);
        emit('sync:state', 'modelValue', currentValueStr);
      }
    },
    [onConfirmProps, unitIndex],
  );
  return {
    onConfirm,
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
          const startTimeValue = (startTimeComponentRef.value as any)?.getSelectedTime();
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
            const startDateValue = (startDateComponentRef.value as any)?.getSelectedDate();
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
          const endTimeValue = (endTimeComponentRef.value as any)?.getSelectedTime();
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
            const endDateValue = (endDateComponentRef.value as any)?.getSelectedDate();
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
          title: options.slots?.title,
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
  const setPopupShow = props.get('setPopupShow');
  const render = useCallback(
    (props, { attrs, slots }) => {
      const { formatValue, isRange, placeholder, inputAlign, closeOnClickOverlay, inLink, readonly, disabled, popupShow } = props;
      const outerProps = categoryProps(props);
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
            readonly
            disabled={disabled}
            class={[bem('field'), readonly && bem('readonly')]}
            v-slots={{ label: slots.label, input: inputSlot }}
            onClick={onFieldClick}
            modelValue={formatValue}
            inputAlign={inputAlign}
            isLink={inLink}
          />
          <Popup
            show={popupShow}
            onClose={() => setPopupShow(false)}
            position="bottom"
            round
            lazy-render={false}
            closeOnClickOverlay={closeOnClickOverlay}
            {..._.pick(attrs, ['class', 'style'])}
            {...outerProps}>
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
    [],
  );

  return { render };
}
handleBasicRender.order = 3;
