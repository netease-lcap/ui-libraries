export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';
export * from './ide';

export function handlePlaceholder(props) {
  const placeholder = props.get('placeholder') ?? '请输入内容';
  return {
    placeholder,
  };
}
