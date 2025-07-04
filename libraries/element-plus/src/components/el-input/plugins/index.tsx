import _ from 'lodash';
import { getPropsIcon } from '@/plugins/common/icon';

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';
export * from './ide';

export function handlePlaceholder(props) {
  const placeholder = props.get('placeholder') ?? '请输入内容';
  return {
    placeholder,
  };
}

export function handleSlots(props) {
  return {
    rows: 3,
  };
}

export function handleSuffixIcon(props) {
  const suffixIcon = props.get('suffixIcon');
  const prefixIcon = props.get('prefixIcon');
  return {
    suffixIcon: getPropsIcon({ name: suffixIcon }),
    prefixIcon: getPropsIcon({ name: prefixIcon }),
  };
}

export function handleAppend(props) {
  const slots = props.get('slots');
  const append = _.isEmpty(_.attempt(slots.append)) ? { append: undefined } : { append: slots.append };
  const prepend = _.isEmpty(_.attempt(slots.prepend)) ? { prepend: undefined } : { prepend: slots.prepend };

  return {
    slots: _.assign(slots, append, prepend),
  };
}
