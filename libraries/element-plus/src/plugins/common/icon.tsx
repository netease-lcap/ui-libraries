import { ElIcon } from '@/components';

export function handleIcon(props) {
  const clearIconName = props.get('clearIconName');
  const prefixIconName = props.get('prefixIconName');

  return {
    clearIcon: <ElIcon name={clearIconName} />,
    prefixIcon: <ElIcon name={prefixIconName} />,
  };
}

export const getPropsIcon = function (props: any) {
  return props.name ? <ElIcon {...props} /> : null;
};
