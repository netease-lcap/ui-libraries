import _ from 'lodash';
import { getIsPreview, getRender } from '@/plugins/common/preview';

import { ElText } from '@/index';

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';
export * from './ide';

export function handleColor(props) {
  const lowColor = props.get('lowColor', '#F7BA2A');
  const mediumColor = props.get('mediumColor', '#F7BA2A');
  const highColor = props.get('highColor', '#F7BA2A');
  const colorsProps = props.get('colors');
  const colors = _.isArray(colorsProps) ? colorsProps : [lowColor, mediumColor, highColor];
  return {
    colors,
  };
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
  return isPreview
    ? {
        ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
        render,
      }
    : {};
}
