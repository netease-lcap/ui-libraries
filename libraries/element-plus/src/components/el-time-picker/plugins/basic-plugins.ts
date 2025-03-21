import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo, useControllableValue } from '@/plugins/hooks';
import { getNaslTimeValue, getFormatTimeValue } from './utils';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export function handleControllableValue(props: any) {
  const ref = props.get('ref');
  const value = props.get('value');
  const startValue = props.get('start-value');
  const endValue = props.get('end-value');
  const isRange = props.get('isRange');
  const emit = props.get('emit');
  const format = props.get('format');
  // 根据startValue和endValue拼接成默认值数组
  const defaultTimeValue = isRange ? [getFormatTimeValue(startValue), getFormatTimeValue(endValue)] : getFormatTimeValue(value);

  const [, setValue, valueProps] = useControllableValue(props, {
    // @ts-ignore
    defaultValue: defaultTimeValue,
    onChange: (val) => {
      const valArr = typeof val === 'string' ? getNaslTimeValue(val, format) : val.map((item) => getNaslTimeValue(item, format));
      emit('change', valArr);
    },
  });

  return {
    ...valueProps,
    formTagName: 'el-form-time-picker',
    ref: Object.assign(ref, {
      resetField: () => setValue(undefined),
    }),
  };
}

export function handleNodePath(props) {
  const nodePath = props.get('data-nodepath');
  const myClass = props.get('class', '');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const nodeId = useMemo(() => _.uniqueId('TimePicker_'), []);
  const isRange = props.get('isRange');
  useEffect(() => {
    const node = document.querySelector(`.${nodeId}`);
    const inputNumberElement = node?.closest('.el-date-editor');
    inputNumberElement?.setAttribute('data-nodepath', nodePath);
  }, []);
  return {
    class: `${myClass} ${nodeId}`,
    [$deletePropsList]: deletePropsList,
    'is-range': isRange,
    formTagName: 'el-form-time-picker',
  };
}

handleNodePath.type = $ide;

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';

export function handleIcon(props) {
  const clearIcon = props.get('clearIcon');
  const prefixIcon = props.get('prefixIcon');

  return {
    clearIcon: clearIcon ? ElementPlusIconsVue[clearIcon] : null,
    prefixIcon: prefixIcon ? ElementPlusIconsVue[prefixIcon] : null,
  };
}
