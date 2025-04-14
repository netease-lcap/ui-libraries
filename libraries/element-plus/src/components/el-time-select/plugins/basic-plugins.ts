export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';

export function handleTagName(props) {
  const className = props.get('class') ?? '';
  return {
    formTagName: 'el-form-time-select',
    class: `${className} el-time-select`,
  };
}
export { handleIcon } from '@/plugins/common/icon';
