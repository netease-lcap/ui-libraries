import { Icon as VantIcon } from 'vant';
import { VanText } from '@/index';

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

export function previewRender(props, previewText) {
  if (!props.get('preview')) {
    return null;
  }
  const text = previewText ?? props.get('modelValue');
  return <VanText text={text} />;
}
