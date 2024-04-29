import _ from 'lodash';

export function useHandleGutter(props) {
  const gutterJustify = _.isNumber(props.get('gutterJustify', 0)) ? props.get('gutterJustify', 0) : 0;
  const gutterAlign = _.isNumber(props.get('gutterAlign', 0)) ? props.get('gutterAlign', 0) : 0;
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
export function useHandleMatchProps(props) {
  const alignmentProps = props.get('alignment');
  const align = props.get('align');
  return {
    align: align ?? alignmentProps,
  };
}
