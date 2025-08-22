import _ from 'lodash';

export const handleDateRange = (props) => {
  const previewSrcList = props.get('previewSrcList');
  const listRange = _.isString(previewSrcList) ? previewSrcList?.split(',') : [];
  return {
    previewSrcList: listRange,
  };
};
export const handleSwitchChange = (props) => {
  const onSwitch = props.get('onSwitchChange');
  return {
    onSwitch,
  };
};
