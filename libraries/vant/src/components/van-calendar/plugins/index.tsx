import { Field, Calendar } from 'vant';
import { createNamespace } from 'vant/es/utils';
import { ref } from 'vue';
import _ from 'lodash';
import { useCallback, useMemo, useControllableValue } from '@/plugins/hooks';
import { getMaxMinDates, getCurrentValue, toValue, getFormatValue } from './utils-format';
import { $deletePropsList } from '@/plugins/constants';

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
  const isRange = props.get('isRange');
  const multiple = props.get('multiple');
  let type = 'single';
  if (isRange) {
    type = 'range';
  } else if (multiple) {
    type = 'multiple';
  }
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
  const deletePropsList = props
  .get($deletePropsList, [])
  .concat(['multiple', 'isRange']);
  return {
    popupVisible,
    inputAlign,
    unit,
    ref: selfRef,
    maxDate: maxDateValue,
    minDate: minDateValue,
    inLink,
    type,
    [$deletePropsList]: deletePropsList,
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
  const [startValue, setStartValue] = useControllableValue(props, {
    valuePropName: 'startValue',
  });
  const [endValue, setEndValue] = useControllableValue(props, {
    valuePropName: 'endValue',
  });
  const type = props.get('type');
  const defaultDate = getCurrentValue(props.get('defaultDate'));
  const showFormatter = props.get('showFormatter');
  const advancedFormatEnable = props.get('advancedFormatEnable');
  const advancedFormatValue = props.get('advancedFormatValue');
  const currentValue = useMemo(() => {
    let values = modelValue;
    if (type === 'range') {
      values = [startValue, endValue];
    }
    return getCurrentValue(values);
  }, [modelValue, type, startValue, endValue]);
  const formatValue = useMemo(() => {
    let values = modelValue;
    if (type === 'range') {
      values = [startValue, endValue];
    }
    return getFormatValue(values, { showFormatter, advancedFormatEnable, advancedFormatValue, type });
  }, [modelValue, showFormatter, advancedFormatEnable, advancedFormatValue, type, startValue, endValue]);
  const returnData = {
    modelValue: currentValue,
    setModelValue,
    formatValue,
    setStartValue,
    setEndValue,
  } as any;
  if (currentValue || defaultDate) {
    returnData.defaultDate = currentValue || defaultDate;
  }
  return returnData;
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
  const setStartValue = props.get('setStartValue');
  const setEndValue = props.get('setEndValue');
  const type = props.get('type');
  const onConfirmClick = useCallback(
    (data: any) => {
      if (_.isFunction(onConfirm)) {
        _.attempt(onConfirm, data);
      }
      popupVisible.value = false;
      const currentValueStr = toValue(data, props.get('converter'));
      if (type === 'range' && currentValueStr) {
        setStartValue(currentValueStr[0]);
        setEndValue(currentValueStr[1]);
        emit('sync:state', 'startValue', currentValueStr[0]);
        emit('sync:state', 'endValue', currentValueStr[1]);
      } else {
        setModelValue(currentValueStr);
        emit('sync:state', 'modelValue', currentValueStr);
      }
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
  const readonly = props.get('readonly');
  const onFieldClick = () => {
    if (disabled || readonly) {
      return;
    }
    popupVisible.value = true;
  };
  const render = useCallback(
    (props, { attrs, slots }) => {
      const { formatValue, placeholder, inputAlign, inLink, type, readonly } = props;
      const calendarProps = _.omit(props, ['show']);
      const inputSlot = useCallback(() => {
        if (!formatValue) {
          if (placeholder) {
            return <div class={bem('placeholder')}>{placeholder}</div>;
          }
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
      }, [formatValue, type, placeholder]);
      return (
        <div {..._.pick(attrs, ['class', 'data-nodepath', 'style'])} class={bem('root')}>
          <Field
            readonly
            type="textarea"
            rows="1"
            autosize
            disabled={disabled}
            class={[bem('field'), readonly && bem('readonly')]}
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
