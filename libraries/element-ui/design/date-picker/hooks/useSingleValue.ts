import {
  toRefs, watchEffect, ref, computed,
} from '@vue/composition-api';
import {
  formatDate,
  formatTime,
  isValidDate,
  getDefaultFormat,
  parseToDayjs,
} from '../../_common/js/date-picker/format';
import useVModel from '../../hooks/useVModel';
import { DateMultipleValue, DateValue, ElDatePickerProps } from '../type';
import { extractTimeFormat } from '../../_common/js/date-picker/utils';

export default function useSingleValue(props: ElDatePickerProps) {
  const { value: valueFromProps } = toRefs(props);
  const [value, onChange] = useVModel(valueFromProps, props.defaultValue, props.onChange, 'change');

  const formatRef = computed(() => getDefaultFormat({
    mode: props.mode,
    format: props.format,
    enableTimePicker: props.multiple ? false : props.enableTimePicker,
  }));

  if (props.enableTimePicker) {
    if (!extractTimeFormat(formatRef.value.format)) console.error(`format: ${formatRef.value.format} 不规范，包含时间选择必须要有时间格式化 HH:mm:ss`);
  }

  const time = ref(
    formatTime(
      props.multiple ? (value.value as DateMultipleValue)[0] : value.value,
      formatRef.value.format as string,
      formatRef.value.timeFormat as string,
      props.defaultTime as string | string[],
    ),
  );
  const month = ref<number>(
    parseToDayjs(
      props.multiple ? (value.value as DateMultipleValue)[0] : (value.value as DateValue),
      formatRef.value.format as string,
    ).month(),
  );
  const year = ref<number>(
    parseToDayjs(
      props.multiple ? (value.value as DateMultipleValue)[0] : (value.value as DateValue),
      formatRef.value.format as string,
    ).year(),
  );
  const cacheValue = ref(
    formatDate(props.multiple ? (value.value as DateMultipleValue)[0] : value.value, {
      format: formatRef.value.format as string,
    }),
  ); // 缓存选中值，panel 点击时更改

  // 输入框响应 value 变化
  watchEffect(() => {
    if (!value.value) {
      cacheValue.value = '';
      return;
    }
    if (!isValidDate(value.value, formatRef.value.format as string)) return;

    cacheValue.value = formatDate(value.value, {
      format: formatRef.value.format as string,
    });
    time.value = formatTime(value.value, formatRef.value.format as string, formatRef.value.timeFormat as string, props.defaultTime as string | string[]);
  });

  return {
    year,
    month,
    value,
    time,
    cacheValue,
    onChange,
  };
}
