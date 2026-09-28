export function handleCustomProps(props) {
  const format = props.get('format') || 'HH:mm:ss';
  return {
    format,
  };
}
