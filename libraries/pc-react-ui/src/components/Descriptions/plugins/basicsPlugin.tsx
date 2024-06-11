import classnames from 'classnames';

export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames('cw-nasl', className),
  };
}
