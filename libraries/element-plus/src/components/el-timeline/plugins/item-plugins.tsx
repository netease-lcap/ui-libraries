import { getPropsIcon } from '@/plugins/common/icon';
export function handleIcon(props) {
  const icon = props.get('icon');

  return {
    icon: getPropsIcon({ name: icon }),
  };
}
