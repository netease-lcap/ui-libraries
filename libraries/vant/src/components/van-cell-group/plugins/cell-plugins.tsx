import _ from 'lodash';
import { getPropsIcon } from '@/plugins/common/icon';
import { useMemo } from '@/plugins/hooks';

export function useCellIcon(props: any) {
  const slots = props.get('slots');
  const icon = props.get('icon');
  const rightIcon = props.get('rightIcon');

  return {
    slots: _.assign(slots, {
      icon: icon ? getPropsIcon({ name: icon }) : null,
      'right-icon': rightIcon ? getPropsIcon({ name: rightIcon }) : null,
    }),
  };
}

export function useCellHrefAndTo(props: any) {
  const destination = props.get('destination');
  const link = props.get('link');
  const href = props.get('href');
  const to = props.get('to');

  const toSelf = useMemo(() => to || href || link || destination, [destination, href, link, to]);

  return {
    url: toSelf,
  };
}
