import _ from 'lodash';

export const handleDateRange = (props) => {
  const previewSrcList = props.get('urlList');
  const listRange = _.isString(previewSrcList) ? previewSrcList?.split(',') : [];
  return {
    urlList: listRange,
  };
};
