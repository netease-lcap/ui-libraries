import _ from 'lodash';
import { previewRender } from '@/plugins/common/icon';

export { handleControllableValue } from '@/plugins/common/index';

export { handleComponentInForm } from '@/components/van-form/plugins/form-item';

export function handleTagName() {
  return {
    tagName: 'van-switch',
    formTagName: 'van-form-switch',
  };
}

export function handlePreview(props) {
  const text = props.get('modelValue') ? '开启' : '关闭';
  const render = previewRender(props, text);
  if (!render) return {};
  return {
    render,
  };
}
