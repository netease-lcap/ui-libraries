import { Icon as VantIcon } from 'vant';

export function handleIcon(props) {
  const clearIconName = props.get('clearIconName');
  const prefixIconName = props.get('prefixIconName');
  const clearIcon = clearIconName ? { clearIcon: <VantIcon name={clearIconName} /> } : {};
  const prefixIcon = prefixIconName ? { prefixIcon: <VantIcon name={prefixIconName} /> } : {};
  return {
    ...clearIcon,
    ...prefixIcon,
  };
}

export function getPropsIcon(props: any) {
  return props.name ? <VantIcon {...props} /> : null;
}
