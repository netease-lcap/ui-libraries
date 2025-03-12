export const handleDateRange = (props) => {
  const previewSrcList = props.get('previewSrcList');
  const listRange = previewSrcList?.split(',');
  return {
    previewSrcList: Array.isArray(listRange) ? listRange : undefined,
  };
};
