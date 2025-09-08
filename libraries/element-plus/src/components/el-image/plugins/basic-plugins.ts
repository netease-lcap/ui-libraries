import _ from 'lodash';

export const handleDateRange = (props) => {
  const previewSrcListProps = props.get('previewSrcList');
  const listRange = _.match(previewSrcListProps)
    .when(_.isString, () => previewSrcListProps?.split(','))
    .when(_.isArray, () => previewSrcListProps)
    .otherwise(() => []);
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
