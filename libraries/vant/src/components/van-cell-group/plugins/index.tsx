import _ from 'lodash';
import { createNamespace } from 'vant/es/utils';
import { useCallback } from '@/plugins/hooks';

const [, bem] = createNamespace('cell-group');

export function useCellGroupTitle(props: any) {
  const useTitle = props.get('useTitle');
  const slots = props.get('slots');

  return {
    slots: _.assign(slots, {
      title: useTitle ? slots.title : null,
    }),
  };
}

export function useReRender(props: any) {
  const Component = props.get('render');
  const render = useCallback(
    (props, { attrs, slots }) => {
      return (
        <div class={`${bem('wrapper')}`}>
          <Component {..._.omit(props, ['class'])} {...attrs} v-slots={slots} />
        </div>
      );
    },
    [Component],
  );

  return { render };
}
