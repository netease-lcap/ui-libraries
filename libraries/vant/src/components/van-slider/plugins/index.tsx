import _ from 'lodash';
import { useCallback } from '@/plugins/hooks';
import { categoryStyles, categoryProps } from '@/utils/dom';
import styles from '../index.module.css';

export function handleDefaultValue(props) {
  const modelValueProps = props.get('modelValue');
  const isArrayModelValue = _.isArray(modelValueProps);
  const range = props.get('range');
  const modelValue = range && isArrayModelValue ? modelValueProps : [0, 0];
  return {
    modelValue,
  };
}
handleDefaultValue.order = 1;

export { handleComponentInForm } from '@/components/van-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';

export function handleWarp(props) {
  const nodePath = props.get('data-nodepath');
  const Component = props.get('render');
  const render = useCallback(
    (props) => {
      const { style, innerStyle } = categoryStyles(props.style);
      const { outerProps } = categoryProps(props);
      const className = props.vertical ? styles['van-slider-room-vertical'] : styles['van-slider-room'];
      return (
        <div data-nodepath={nodePath} style={style} class={className} {...outerProps}>
          <Component {...props} style={innerStyle} />
        </div>
      );
    },
    [Component],
  );
  return {
    render,
    tagName: 'van-slider',
    formTagName: 'van-form-slider',
  };
}
