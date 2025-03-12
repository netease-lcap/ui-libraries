export const handleTimeProps = (props) => {
  const format = props.get('format');
  const valueFormat = props.get('valueFormat');
  const placeholder = props.get('placeholder');

  return {
    format: format || 'HH:mm:ss',
    valueFormat: valueFormat || 'HH:mm:ss',
    placeholder: placeholder || '请选择时间',
  };
};
