import _ from 'lodash';

export function useSkeletonSlots(props) {
  const slots = props.get('slots');
  const isCustomSkeleton = props.get('isCustomSkeleton');

  const nodePath = props.get('data-nodepath');

  return {
    slots: _.assign(slots, {
      default: () => <div data-nodepath={nodePath}>{slots.content?.()}</div>,
      template: isCustomSkeleton ? slots.template : null,
    }),
  };
}
