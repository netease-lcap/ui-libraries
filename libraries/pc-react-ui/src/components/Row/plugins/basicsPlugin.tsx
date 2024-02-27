export function useHandleGutter(props) {
  const gutterJustify = props.get('gutterJustify', 0);
  const gutterAlign = props.get('gutterAlign', 0);
  return {
    gutter: [gutterJustify, gutterAlign],
  };
}
