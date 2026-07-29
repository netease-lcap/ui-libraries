export function handleText(props) {
  const textProps = props.get('text');
  const currentRate = props.get('currentRate');
  const text = textProps || `${currentRate}%`;
  return {
    text,
  };
}
