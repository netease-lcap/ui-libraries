import _ from 'lodash';
import { getPropsIcon } from '@/plugins/common/icon';

export function handleIcon(props) {
  const slots = props.get('slots');
  const activeIcon = props.get('activeIcon');
  const inactiveIcon = props.get('inactiveIcon');
  const finishIcon = props.get('finishIcon');

  return {
    slots: _.assign(slots, {
      'active-icon': () => getPropsIcon({ name: activeIcon }),
      'inactive-icon': () => getPropsIcon({ name: inactiveIcon }),
      'finish-icon': () => getPropsIcon({ name: finishIcon }),
    }),
  };
}
