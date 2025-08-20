import _ from 'lodash';

export function handleSlots(props) {
  const isCustomPulling = props.get('isCustomPulling');
  const isCustomLoosing = props.get('isCustomLoosing');
  const isCustomLoading = props.get('isCustomLoading');
  const isCustomSuccess = props.get('isCustomSuccess');

  const slots = props.get('slots');

  return {
    slots: _.assign(slots, {
      pulling: isCustomPulling ? slots.pulling : null,
      loosing: isCustomLoosing ? slots.loosing : null,
      loading: isCustomLoading ? slots.loading : null,
      success: isCustomSuccess ? slots.success : null,
    }),
  };
}
