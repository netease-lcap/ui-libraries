import _ from 'lodash';
// import { getIsPreview, getRender } from '@/plugins/common/preview';
export { handleComponentInForm } from '@/components/van-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';
// export * from './ide';

export function handlePreview(props) {
  return {
    tagName: 'van-search',
    formTagName: 'van-form-search',
  };
}
