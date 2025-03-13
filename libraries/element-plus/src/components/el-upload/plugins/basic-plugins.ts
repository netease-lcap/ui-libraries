export const handleUploadProps = (props) => {
  const headers = props.get('headers');
  const data = props.get('data');
  return {
    headers: headers ? JSON.parse(headers) : undefined,
    data: data ? JSON.parse(data) : undefined,
  };
};
