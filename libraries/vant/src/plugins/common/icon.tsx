import { ElIcon } from '@/components';

export function handleIcon(props) {
  const clearIconName = props.get('clearIconName');
  const prefixIconName = props.get('prefixIconName');
  const clearIcon = clearIconName ? { clearIcon: <ElIcon name={clearIconName} /> } : {};
  const prefixIcon = prefixIconName ? { prefixIcon: <ElIcon name={prefixIconName} /> } : {};
  return {
    ...clearIcon,
    ...prefixIcon,
  };
}

export function getPropsIcon(props: any) {
  return props.name ? <ElIcon {...props} /> : null;
}
