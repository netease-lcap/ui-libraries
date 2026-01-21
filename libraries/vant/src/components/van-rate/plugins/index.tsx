import _ from 'lodash';
import { previewRender } from '@/plugins/common/icon';

export { handleComponentInForm } from '@/components/van-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';

export function handleTagName(props) {
  return {
    tagName: 'van-rate',
    formTagName: 'van-form-rate',
  };
}

export function handlePreview(props) {
  const value = props.get('modelValue') ?? 0;
  const render = previewRender(props, value);
  if (!render) return {};
  return {
    render,
  };
}
