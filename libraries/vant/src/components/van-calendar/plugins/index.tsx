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
  const inLink = _.isNil(props.get('inLink')) ? true : props.get('inLink');
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
    inLink,
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
  const showFormatter = props.get('showFormatter');
  const advancedFormatEnable = props.get('advancedFormatEnable');
  const advancedFormatValue = props.get('advancedFormatValue');
  const currentValue = useMemo(() => {
    return getCurrentValue(modelValue);
  }, [modelValue, type]);
  const formatValue = useMemo(() => {
    return getFormatValue(modelValue, { showFormatter, advancedFormatEnable, advancedFormatValue, type });
  }, [modelValue, showFormatter, advancedFormatEnable, advancedFormatValue, type]);
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
      const { formatValue, placeholder, inputAlign, inLink, type } = props;
      const calendarProps = _.omit(props, ['show']);
      const inputSlot = useCallback(() => {
        if (!formatValue) {
          return null;
        }
        if (type === 'range') {
          return (
            <div class={bem('rangevalue')}>
              <div class={bem('startvalue')}>{formatValue[0]}</div>
              <div class={bem('separator')}>-</div>
              <div class={bem('endvalue')}>{formatValue[1]}</div>
            </div>
          );
        }
        return <div class={bem('value')}>{formatValue}</div>;
      }, [formatValue, type]);
      return (
        <div {..._.pick(attrs, ['class', 'data-nodepath', 'style'])} class={bem('root')}>
          <Field
            readonly
            type="textarea"
            rows="1"
            autosize
            disabled={disabled}
            class={bem('field')}
            v-slots={{ label: slots.label, input: inputSlot }}
            onClick={onFieldClick}
            modelValue={formatValue}
            placeholder={placeholder}
            inputAlign={inputAlign}
            isLink={inLink}
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
