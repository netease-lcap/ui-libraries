export const handleMenuProps = (props) => {
  const backgroundColor = props.get('backgroundColor');
  const textColor = props.get('textColor');
  const activeTextColor = props.get('activeTextColor');

  return {
    backgroundColor: backgroundColor || '#ffffff',
    textColor: textColor || '#303133',
    activeTextColor: activeTextColor || '#409EFF',
  };
};
