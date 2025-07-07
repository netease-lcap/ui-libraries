import _ from 'lodash';
import { getIsPreview, getRender } from '@/plugins/common/preview';

export * from './ide';
export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';

export function handlePreview(props) {
  const ref = props.get('ref');
  const Component = props.get('render');
  const isPreview = getIsPreview(props);

  const previewRender = (insProps) => {
    const inIDE = !!props.get('data-nodepath');
    const value = (insProps.modelValue || []).join(', ');
    const previewText = inIDE || _.isEmpty(value) ? '-' : value;
    return <el-preview text={previewText}></el-preview>;
  };

  const { render, insRef } = getRender(Component, previewRender, isPreview);

  return {
    ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
    render,
  };
}
