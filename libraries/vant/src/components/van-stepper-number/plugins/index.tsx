import _ from 'lodash';
import { previewRender } from '@/plugins/common/icon';

export { handleControllableValue } from '@/plugins/common/index';
export { handleComponentInForm } from '@/components/van-form/plugins/form-item';

export function handleTagName() {
  return {
    tagName: 'van-stepper-number',
    formTagName: 'van-form-stepper-number',
  };
}

export function handlePreview(props) {
  const render = previewRender(props);
  if (!render) return {};
  return {
    render,
  };
}
