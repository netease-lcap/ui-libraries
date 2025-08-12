import { Field, Calendar } from 'vant';
import { createNamespace } from 'vant/es/utils';
import { ref, watch } from 'vue';
import _ from 'lodash';
import { useCallback, useMemo, useControllableValue, useEffect } from '@/plugins/hooks';
import { getMaxMinDates, getCurrentValue, toValue, getFormatValue } from './utils-format';
import { $deletePropsList } from '@/plugins/constants';
import { categoryProps } from '@/utils/dom';

export { handleControllableValue } from '@/plugins/common/index';
export { handleComponentInForm } from '@/components/van-form/plugins/form-item';

const [name, bem] = createNamespace('calendar');

export function handleFormTagName(props) {
  return {
    tagName: 'van-calendar',
    formTagName: 'van-form-calendar',
  };
}

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
    setPopupShow(true);
  };
  const close = () => {
    setPopupShow(false);
  };
  const selfRef = _.assign(refProp, { open, close });
  const { maxDateValue, minDateValue } = useMemo(() => {
    return getMaxMinDates(props.get('maxDate'), props.get('minDate'));
  }, [props.get('maxDate'), props.get('minDate')]);
  const deletePropsList = props
  .get($deletePropsList, [])
  .concat(['multiple', 'isRange']);
  return {
    popupShow,
    setPopupShow,
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
  const onSelect = props.get('onSelect');
  const onConfirmProps = props.get('onConfirm', () => {});
  const setPopupShow = props.get('setPopupShow');
  const emit = props.get('emit');
  const setModelValue = props.get('setModelValue');
  const setStartValue = props.get('setStartValue');
  const setEndValue = props.get('setEndValue');
  const type = props.get('type');
  const onConfirm = useCallback(
    (data: any) => {
      _.attempt(onConfirmProps, data);
      setPopupShow(false);
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
    [onConfirmProps],
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
    onConfirm,
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
  const setPopupShow = props.get('setPopupShow');
  const render = useCallback(
    (props, { attrs, slots }) => {
      const { formatValue, placeholder, inputAlign, inLink, type, readonly, disabled, popupShow } = props;
      const calendarProps = _.omit(props, ['show']);
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
      };
      return (
        <div {..._.pick(attrs, ['class', 'style'])} {...outerProps} class={bem('root')}>
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
          <Calendar
            show={popupShow}
            {...innerProps}
            onClose={() => setPopupShow(false)}
            v-slots={slots} />
        </div>
      );
    },
    [],
  );

  return { render };
}
handleBasicRender.order = 3;
