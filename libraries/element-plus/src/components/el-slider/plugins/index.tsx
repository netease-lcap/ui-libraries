import _ from 'lodash';
import { getIsPreview, getRender } from '@/plugins/common/preview';
import { ElText } from '@/index';

export * from './ide';
export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';

export function handleHeight(props) {
  const heightProps = props.get('height');
  const height = _.isNumber(heightProps) ? `${heightProps}px` : '';
  return { height };
}

export function handlePreview(props) {
  const ref = props.get('ref');
  const Component = props.get('render');
  const isPreview = getIsPreview(props);

  const previewRender = (insProps) => {
    const inIDE = !!props.get('data-nodepath');
    const previewText = inIDE || _.isNil(insProps.modelValue) ? '-' : insProps.modelValue;
    return <ElText text={previewText} />;
  };

  const { render, insRef } = getRender(Component, previewRender, isPreview);
  return {
    ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
    render,
  };
}
