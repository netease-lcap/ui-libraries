export const handleTimeSelectProps = (props) => {
  const start = props.get('start');
  const end = props.get('end');
  const step = props.get('step');
  const format = props.get('format');

  return {
    start: start || '09:00',
    end: end || '18:00',
    step: step || '00:30',
    format: format || 'HH:mm',
  };
};
