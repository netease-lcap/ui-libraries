import _ from 'lodash';
// import { getIsPreview, getRender } from '@/plugins/common/preview';
export { handleControllableValue } from '@/plugins/common/index';
export * from './ide';

export function handlePreview(props) {
  const ref = props.get('ref');
  const Component = props.get('render');
  // const isPreview = getIsPreview(props);

  const previewRender = (insProps) => {
    // const inIDE = !!props.get('data-nodepath');
    // const previewText = inIDE || _.isNil(insProps.modelValue) ? '-' : insProps.modelValue;
    // return <van-text>{previewText}</van-text>;
  };

  // const { render, insRef } = getRender(Component, previewRender, isPreview);
  return {
    // ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
    // render,
  };
}
