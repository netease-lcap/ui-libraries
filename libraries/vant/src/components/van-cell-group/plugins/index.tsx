import _ from 'lodash';

export function useCellGroupTitle(props: any) {
  const useTitle = props.get('useTitle');
  const slots = props.get('slots');

  return {
    slots: _.assign(slots, {
      title: useTitle ? slots.title : null,
    }),
  };
}
