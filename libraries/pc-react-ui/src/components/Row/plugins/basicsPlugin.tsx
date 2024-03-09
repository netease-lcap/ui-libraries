import _ from 'lodash';

export function useHandleGutter(props) {
  const gutterJustify = props.get('gutterJustify', 0);
  const gutterAlign = props.get('gutterAlign', 0);
  return {
    gutter: [gutterJustify, gutterAlign],
  };
}
export function useHandleStyle(props) {
  const styleProps = props.get('style');
  const style = _.assign({ marginLeft: 0, marginRight: 0 }, styleProps);
  return {
    style,
  };
}
