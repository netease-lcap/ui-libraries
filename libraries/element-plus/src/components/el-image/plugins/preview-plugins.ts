export const handleDateRange = (props) => {
  const previewSrcList = props.get('urlList');
  const listRange = typeof previewSrcList === 'string' ? previewSrcList?.split(',') : [];
  return {
    urlList: Array.isArray(listRange) ? listRange : undefined,
  };
};
