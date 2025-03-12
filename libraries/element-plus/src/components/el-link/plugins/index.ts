import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';

export * from './ide.ts';

export function handleTextToSlots(props) {
  const text = props.get('text');
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat('text');
  return {
    slots: _.defaults(slots, {
      default: () => text,
    }),
    [$deletePropsList]: deletePropsList,
  };
}
