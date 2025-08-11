import _ from 'lodash';

export { handleControllableValue } from '@/plugins/common/index';

export { handleComponentInForm } from '@/components/van-form/plugins/form-item';

export function handleTagName() {
  return {
    tagName: 'van-switch',
    formTagName: 'van-form-switch',
  };
}
