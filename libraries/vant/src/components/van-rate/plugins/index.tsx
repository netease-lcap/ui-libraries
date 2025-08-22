import _ from 'lodash';

export { handleComponentInForm } from '@/components/van-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';

export function handleTagName(props) {
  return {
    tagName: 'van-rate',
    formTagName: 'van-form-rate',
  };
}
