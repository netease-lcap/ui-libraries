import { useCallback } from '@/plugins/hooks';
import { categoryStyles } from '@/utils/dom';
import styles from '../index.module.css';

export function handleWarp(props) {
  const nodePath = props.get('data-nodepath');
  const Component = props.get('render');
  const render = useCallback(
    (props) => {
      const { style, innerStyle } = categoryStyles(props.style);
      const className = props.vertical ? styles['van-slider-room-vertical'] : styles['van-slider-room'];
      return (
        <div data-nodepath={nodePath} style={style} class={className}>
          <Component {...props} style={innerStyle} />
        </div>
      );
    },
    [Component],
  );
  return {
    render,
  };
}
