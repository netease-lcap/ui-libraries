export const handleScrollbar = (props) => {
  const wrapStyle = props.get('wrapStyle');
  const viewStyle = props.get('viewStyle');
  return {
    wrapStyle: wrapStyle ? JSON.parse(wrapStyle) : undefined,
    viewStyle: viewStyle ? JSON.parse(viewStyle) : undefined,
  };
};
