import _ from 'lodash';

export const handleDateRange = (props) => {
  const previewSrcList = props.get('previewSrcList');
  const listRange = _.isString(previewSrcList) ? previewSrcList?.split(',') : [];
  return {
    previewSrcList: listRange,
  };
};
