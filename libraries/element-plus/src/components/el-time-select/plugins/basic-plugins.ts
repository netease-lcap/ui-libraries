import { getPropsIcon } from '@/plugins/common/icon';

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';

export function handleTagName(props) {
  const className = props.get('class') ?? '';
  return {
    formTagName: 'el-form-time-select',
    tagName: 'el-time-select',
    class: `${className} el-time-select`,
  };
}

export function handleIcon(props) {
  const prefixIconName = props.get('prefixIconName');
  const clearIconName = props.get('clearIconName');
  return {
    prefixIcon: getPropsIcon({ name: prefixIconName }),
    clearIcon: getPropsIcon({ name: clearIconName }),
  };
}
