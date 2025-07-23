import _ from 'lodash';
import { getPropsIcon } from '@/plugins/common/icon';
import { getIsPreview, getRender } from '@/plugins/common/preview';

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';
export * from './ide';

export function handlePlaceholder(props) {
  const placeholder = props.get('placeholder') ?? '请输入内容';
  return {
    placeholder,
  };
}

export function handleSlots(props) {
  return {
    rows: 3,
  };
}

export function handleSuffixIcon(props) {
  const suffixIcon = props.get('suffixIcon');
  const prefixIcon = props.get('prefixIcon');
  return {
    suffixIcon: getPropsIcon({ name: suffixIcon }),
    prefixIcon: getPropsIcon({ name: prefixIcon }),
  };
}

export function handleAppend(props) {
  const slots = props.get('slots');
  const { append: appendSlot = () => {}, prepend: prependSlot = () => {} } = _.pick(slots, ['append', 'prepend']);
  const append = _.isEmpty(_.attempt(appendSlot)) ? { append: undefined } : { append: appendSlot() };
  const prepend = _.isEmpty(_.attempt(prependSlot)) ? { prepend: undefined } : { prepend: prependSlot() };

  return {
    slots: _.assign(slots, append, prepend),
  };
}

export function handlePreview(props) {
  const ref = props.get('ref');
  const Component = props.get('render');
  const isPreview = getIsPreview(props);

  const previewRender = (insProps) => {
    const inIDE = !!props.get('data-nodepath');
    const previewText = inIDE || _.isEmpty(insProps.modelValue) ? '-' : insProps.modelValue;
    return <el-preview text={previewText} />;
  };

  const { render, insRef } = getRender(Component, previewRender, isPreview);

  return {
    ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
    render,
  };
}
