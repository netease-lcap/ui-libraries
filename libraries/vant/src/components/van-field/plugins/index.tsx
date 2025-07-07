import _ from 'lodash';
import { getPropsIcon } from '@/plugins/common/icon';

export { handleControllableValue } from '@/plugins/common/index';

export function handleFieldIcons(props) {
  const suffixIcon = props.get('suffixIcon');
  const prefixIcon = props.get('prefixIcon');
  return {
    suffixIcon: getPropsIcon({ name: suffixIcon }),
    prefixIcon: getPropsIcon({ name: prefixIcon }),
  };
}

export function handleFieldSlots(props) {
  const slots = props.get('slots');
  const append = _.isEmpty(_.attempt(slots.append)) ? { append: undefined } : { append: slots.append };
  const prepend = _.isEmpty(_.attempt(slots.prepend)) ? { prepend: undefined } : { prepend: slots.prepend };

  return {
    slots: _.assign(slots, append, prepend),
  };
}
