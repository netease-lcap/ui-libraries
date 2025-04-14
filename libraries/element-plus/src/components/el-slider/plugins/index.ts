import _ from 'lodash';

export * from './ide';
export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';

export function handleHeight(props) {
  const heightProps = props.get('height');
  const height = _.isNumber(heightProps) ? `${heightProps}px` : '';
  return { height };
}
