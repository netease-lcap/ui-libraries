import _ from 'lodash';

export const handleDateRange = (props) => {
  const previewSrcListProps = props.get('previewSrcList');
  const listRange = _.isString(previewSrcListProps) ? previewSrcListProps?.split(',') : [];
  const previewSrcList = _.isEmpty(listRange) ? {} : { previewSrcList: listRange };
  return {
    ...previewSrcList,
  };
};

export const handleSwitchChange = (props) => {
  const onSwitch = props.get('onSwitchChange');
  return {
    onSwitch,
  };
};
