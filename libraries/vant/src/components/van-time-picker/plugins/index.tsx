import { Popup, Field, timePickerProps } from 'vant';
import { ref } from 'vue';
import _ from 'lodash';
import { useCallback, useMemo, useControllableValue } from '@/plugins/hooks';
import styles from '../index.module.css';
import { getFormatTimeValue, isValidStringTime } from './utils';

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
  const unit = props.get('unit') || 'minute';
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
 * 将字符串转换为数组
 * @param value
 * @returns
 */
function toValues(value: string | Array<string>) {
  if (typeof value === 'string' && isValidStringTime(value)) {
    return value.split(':');
  }
  return value;
}

/**
 * 将数组转换为字符串
 * @param values
 * @returns
 */
function toValue(values: Array<string>) {
  return values.join(':');
}
/**
 * 处理 modelValue
 * @param props
 * @returns
 */
export function handleModelValue(props: any) {
  const modelValue = props.get('modelValue');
  const unitIndex = props.get('unitIndex');
  const showToolbar = props.get('showToolbar');
  const emit = props.get('emit');
  const currentValue = useMemo(() => {
    const values = toValues(modelValue || []);
    return values.slice(0, unitIndex + 1);
  }, [modelValue, unitIndex]);
  const formatValue = ref(currentValue.join(':'));
  return {
    modelValue: currentValue,
    'onUpdate:modelValue': (value: Array<string>) => {
      if (showToolbar === false) {
        emit('update:modelValue', toValue(value));
      }
    },
    formatValue,
  };
}
handleModelValue.order = 2;

/**
 * 处理取消按钮点击
 * @param props
 * @returns
 */
export function handleCancelButtonClick(props: any) {
  const onCancel = props.get('onCancel');
  const show = props.get('show');
  const onCancelClick = useCallback(
    (data: any) => {
      if (_.isFunction(onCancel)) {
        _.attempt(onCancel);
      }
      show.value = false;
    },
    [onCancel, show],
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
  const show = props.get('show');
  const formatValue = props.get('formatValue');
  const unitIndex = props.get('unitIndex');
  const emit = props.get('emit');
  const onConfirmClick = useCallback(
    (data: any) => {
      if (_.isFunction(onConfirm)) {
        _.attempt(onConfirm);
      }
      show.value = false;

      const values = data.selectedValues.slice(0, unitIndex + 1);
      formatValue.value = values.join(':');
      emit('update:modelValue', toValue(values));
    },
    [onConfirm, formatValue, unitIndex, show],
  );
  return {
    onConfirm: onConfirmClick,
  };
}
handleConfirmButtonClick.order = 4;

/**
 * 处理基本渲染
 * @param props
 * @returns
 */
export function handleBasicRender(props: any) {
  const TimePickerComponent = props.get('render');
  const show = ref(props.get('show') || false);
  const disabled = props.get('disabled');
  const onFieldClick = () => {
    if (disabled) {
      return;
    }
    show.value = true;
  };
  const render = useCallback(
    (props, { attrs, slots }) => {
      const label = slots.label?.();
      const { modelValue, formatValue, 'onUpdate:modelValue': onUpdateModelValue } = props;
      return (
        <div {...attrs}>
          <Field
            readonly
            disabled={disabled}
            class={styles.field}
            v-slots={{ label }}
            onClick={onFieldClick}
            modelValue={formatValue}
          />
          <Popup v-model:show={show.value} position="bottom" round {...attrs}>
            <TimePickerComponent
              {..._.pick(props, Object.keys(timePickerProps))}
              {...attrs}
              v-slots={slots}
              modelValue={modelValue}
              onUpdate:modelValue={onUpdateModelValue}
            />
          </Popup>
        </div>
      );
    },
    [props],
  );

  return { render, ...props, show };
}
handleBasicRender.order = 3;
