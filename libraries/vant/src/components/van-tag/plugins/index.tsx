import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
import { getPropsIcon } from '@/plugins/common/icon';

export function handleTextToslot(props) {
  const text = props.get('text');
  const slots = props.get('slots');
  const icon = props.get('icon');
  const deletePropsList = props.get($deletePropsList).concat(['text']);
  const defaultSlot = text ? { default: () => text } : {};
  return {
    slots: _.assign(slots, defaultSlot),
    [$deletePropsList]: deletePropsList,
    icon: getPropsIcon({ name: icon }),
  };
}
