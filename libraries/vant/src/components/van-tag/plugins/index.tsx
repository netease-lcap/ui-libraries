import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';

export function handleTextToslot(props) {
  const text = props.get('text');
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat(['text']);
  const defaultSlot = text ? { default: () => text } : {};
  return {
    slots: _.assign(slots, defaultSlot),
    [$deletePropsList]: deletePropsList,
  };
}
