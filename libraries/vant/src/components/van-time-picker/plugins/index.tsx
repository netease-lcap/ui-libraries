import { Popup, Field, timePickerProps, Tabs, Tab, TimePicker } from 'vant';
import { createNamespace } from 'vant/es/utils';
import { ref } from 'vue';
import _ from 'lodash';
import { useCallback, useMemo, useControllableValue } from '@/plugins/hooks';
import styles from '../index.module.css';
import { getFormatTimeValue, isValidStringTime } from './utils';

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

function getCurrentValue(value: string | Array<string>, unitIndex: number) {
  const values = toValues(value || []);
  return values.slice(0, unitIndex + 1);
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
    return getCurrentValue(modelValue, unitIndex);
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

export function handleRangeModelValue(props: any) {
  const isRange = props.get('isRange');
  if (isRange === false) {
    return {};
  }
  const startValue = props.get('startValue');
  const endValue = props.get('endValue');
  const unitIndex = props.get('unitIndex');
  const emit = props.get('emit');
  const currentStartValue = useMemo(() => {
    return getCurrentValue(startValue, unitIndex);
  }, [startValue, unitIndex]);
  const currentEndValue = useMemo(() => {
    return getCurrentValue(endValue, unitIndex);
  }, [endValue, unitIndex]);
  return {
    startValue: currentStartValue,
    endValue: currentEndValue,
    'onUpdate:startValue': (value: Array<string>) => {
      //   emit('update:startValue', toValue(value));
      currentStartValue.value = value;
    },
    'onUpdate:endValue': (value: Array<string>) => {
      //   emit('update:endValue', toValue(value));
      currentEndValue.value = value;
    },
    currentStartValue,
    currentEndValue,
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
  const isRange = props.get('isRange');
  const emit = props.get('emit');
  const onConfirmClick = useCallback(
    (data: any) => {
      if (_.isFunction(onConfirm)) {
        _.attempt(onConfirm);
      }
      show.value = false;

      if (isRange === true) {
        const currentStartValue = props.get('currentStartValue') || [];
        const currentEndValue = props.get('currentEndValue') || [];
        const startValues = currentStartValue?.slice(0, unitIndex + 1);
        const endValues = currentEndValue?.slice(unitIndex + 1);
        formatValue.value = `${startValues.join(':')} - ${endValues.join(':')}`;
        emit('update:startValue', toValue(startValues));
        emit('update:endValue', toValue(endValues));
      } else {
        const values = data.selectedValues.slice(0, unitIndex + 1);
        formatValue.value = values.join(':');
        emit('update:modelValue', toValue(values));
      }
    },
    [onConfirm, formatValue, unitIndex, show],
  );
  return {
    onConfirm: onConfirmClick,
  };
}
handleConfirmButtonClick.order = 4;

function renderToolBar(options: any) {
  const { props, attrs, slots } = options;
  const topSlot = slots['topbar-left'];
  const topRightSlot = slots['topbar-right'];
  const topCenterSlot = slots['topbar-center'];
  const onCancel = () => {
    props['onCancel']?.();
  };
  const onConfirm = () => {
    props['onConfirm']?.();
  };
  return (
    <div class={[bem('toolbar'), 'van-picker__toolbar']}>
      <div class={bem('cancel')} onClick={onCancel}>
        {topSlot && topSlot()}
      </div>
      <div class={bem('title')}>{topCenterSlot && topCenterSlot()}</div>
      <div class={bem('confirm')} onClick={onConfirm}>
        {topRightSlot && topRightSlot()}
      </div>
    </div>
  );
}

function renderBottomBar(options: any) {
  const { props, attrs, slots } = options;
  const bottomSlot = slots['bottombar-left'];
  const bottomRightSlot = slots['bottombar-right'];
  const onCancel = () => {
    props['onCancel']?.();
  };
  const onConfirm = () => {
    props['onConfirm']?.();
  };
  return (
    <div class={bem('bottom-bar')}>
      <div class={bem('bottom-bar-left')} onClick={onCancel}>
        {bottomSlot && bottomSlot()}
      </div>
      <div class={bem('bottom-bar-right')} onClick={onConfirm}>
        {bottomRightSlot && bottomRightSlot()}
      </div>
    </div>
  );
}

function renderRangeContent(options: any) {
  const { props, attrs, slots } = options;
  let { currentStartValue, currentEndValue } = props;
  return (
    <Tabs line-width="150px" lazyRender={false}>
      <Tab title="开始">
        <TimePicker
          {..._.pick(props, Object.keys(timePickerProps))}
          showToolbar={false}
          modelValue={currentStartValue}
          onUpdate:modelValue={(value) => {
            currentStartValue = value;
          }}
        />
      </Tab>
      <Tab style={{ flex: '0 0 20px' }} title="至" disabled />
      <Tab title="结束">
        <TimePicker
          {..._.pick(props, Object.keys(timePickerProps))}
          showToolbar={false}
          modelValue={currentEndValue}
          onUpdate:modelValue={(value) => {
            currentEndValue = value;
          }}
        />
      </Tab>
    </Tabs>
  );
}

function renderBasicContent(options: any) {
  const { props, attrs, slots } = options;
  const { modelValue, formatValue, 'onUpdate:modelValue': onUpdateModelValue } = props;
  return (
    <TimePicker
      {..._.pick(props, Object.keys(timePickerProps))}
      v-slots={slots}
      modelValue={modelValue}
      onUpdate:modelValue={onUpdateModelValue}
    />
  );
}

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
      const { modelValue, formatValue, 'onUpdate:modelValue': onUpdateModelValue, isRange } = props;
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

  return { render, ...props, show };
}
handleBasicRender.order = 3;
