import { useCallback } from '@/plugins/hooks';
import { categoryStyles } from '@/utils/dom';
import styles from '../index.module.css';

export function handleWarp(props) {
  const nodePath = props.get('data-nodepath');
  const Component = props.get('render');
  const render = useCallback(
    (props) => {
      const { style, innerStyle } = categoryStyles(props.style);
      return (
        <div data-nodepath={nodePath} style={style} class={styles['van-progress-room']}>
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
