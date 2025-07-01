import { getPropsIcon } from '@/plugins/common/icon';

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';
export * from './ide';

export function handlePlaceholder(props) {
  const placeholder = props.get('placeholder') ?? '请输入内容';
  return {
    placeholder,
  };
}

export function handleSuffixIcon(props) {
  const suffixIcon = props.get('suffixIcon');
  const prefixIcon = props.get('prefixIcon');
  return {
    suffixIcon: getPropsIcon({ name: suffixIcon }),
    prefixIcon: getPropsIcon({ name: prefixIcon }),
  };
}


