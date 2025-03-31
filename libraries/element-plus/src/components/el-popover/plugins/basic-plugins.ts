export function handlePopperClass(props) {
  const popperClassProp = props.get('popperClass');
  const setClass = props.get('class');

  return {
    popperClass: `${popperClassProp} ${setClass}`,
  };
}
