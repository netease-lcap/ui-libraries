export { handleControllableValue } from '@/plugins/common/index';
export { handleComponentInForm } from '@/components/van-form/plugins/form-item';
export function handleFormTagName(props) {
  return {
    tagName: 'van-tree-select',
    formTagName: 'van-form-tree-select',
  };
}

export * from './dataSource';
export * from './modelValue';
export * from './ide';
