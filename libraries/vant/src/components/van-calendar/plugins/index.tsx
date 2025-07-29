import { Field, Calendar } from 'vant';
import { createNamespace } from 'vant/es/utils';
import { ref } from 'vue';
import _ from 'lodash';
import { useCallback, useMemo, useControllableValue } from '@/plugins/hooks';
import { getMaxMinDates, getCurrentValue, toValue, getFormatValue } from './utils-format';

const [name, bem] = createNamespace('calendar');

/**
 * 处理自定义属性
 */
export function handleCustomProps(props: any) {
  const popupOpened = props.get('popupOpened');
  const popupVisible = ref(popupOpened);
  const inputAlign = props.get('inputAlign') || 'right';
  const unit = props.get('unit') || 'day';
  const refProp = props.get('ref');
  const open = () => {
    popupVisible.value = true;
  };
  const close = () => {
    popupVisible.value = false;
  };
  const selfRef = _.assign(refProp, { open, close });
  const { maxDateValue, minDateValue } = useMemo(() => {
    return getMaxMinDates(props.get('maxDate'), props.get('minDate'));
  }, [props.get('maxDate'), props.get('minDate')]);
  return {
    popupVisible,
    inputAlign,
    unit,
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
  const [modelValue, setModelValue] = useControllableValue(props);
  const type = props.get('type');
  const defaultDate = getCurrentValue(props.get('defaultDate'));
  const currentValue = useMemo(() => {
    return getCurrentValue(modelValue);
  }, [modelValue, type]);
  const formatValue = useMemo(() => {
    return getFormatValue(modelValue, props);
  }, [modelValue, props]);
  return {
    modelValue: currentValue,
    setModelValue,
    defaultDate: currentValue || defaultDate || null,
    formatValue,
  };
}
handleModelValue.order = 2;

/**
 * 处理确认按钮点击
 * @param props
 * @returns
 */
export function handleConfirmButtonClick(props: any) {
  const onConfirm = props.get('onConfirm');
  const onSelect = props.get('onSelect');
  const popupVisible = props.get('popupVisible');
  const emit = props.get('emit');
  const setModelValue = props.get('setModelValue');
  const onConfirmClick = useCallback(
    (data: any) => {
      if (_.isFunction(onConfirm)) {
        _.attempt(onConfirm, data);
      }
      popupVisible.value = false;
      const currentValueStr = toValue(data, props.get('converter'));
      setModelValue(currentValueStr);
      emit('sync:state', 'modelValue', currentValueStr);
    },
    [onConfirm, popupVisible],
  );
  const onSelectFunction = useCallback(
    (data: any) => {
      if (_.isFunction(onSelect)) {
        _.attempt(onSelect, data);
      }
    },
    [onSelect],
  );
  return {
    onConfirm: onConfirmClick,
    onSelect: onSelectFunction,
  };
}
handleConfirmButtonClick.order = 4;

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
      const { formatValue, placeholder, inputAlign } = props;
      const calendarProps = _.omit(props, ['show']);
      return (
        <div {..._.pick(attrs, ['class', 'node-path', 'style'])}>
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
          <Calendar v-model:show={popupVisible.value} {...calendarProps} v-slots={slots} />
        </div>
      );
    },
    [props],
  );

  return { render, ...props, popupVisible };
}
handleBasicRender.order = 3;
