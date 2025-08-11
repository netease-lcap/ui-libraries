import _ from 'lodash';

export function useTextEllipsisSlots(props) {
  const slots = props.get('slots');
  const isCustomAction = props.get('isCustomAction');

  return {
    slots: _.assign(slots, {
      action: isCustomAction ? slots.action : null,
    }),
  };
}
