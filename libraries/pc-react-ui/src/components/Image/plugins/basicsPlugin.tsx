import classnames from 'classnames';
import style from '../index.module.less';

export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.cascader, className),
  };
}
