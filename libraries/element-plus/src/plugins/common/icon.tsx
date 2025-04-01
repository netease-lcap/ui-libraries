import { ElIcon } from '@/components';
import _ from 'lodash';

export function handleIcon(props) {
  const clearIconName = props.get('clearIconName') || 'CircleClose';
  const prefixIconName = props.get('prefixIconName') || 'Clock';
  const clearIcon = !_.isNil(clearIconName) ? <ElIcon name={clearIconName} /> : null;
  const prefixIcon = !_.isNil(prefixIconName) ? <ElIcon name={prefixIconName} /> : null;
  return {
    clearIcon,
    prefixIcon,
  };
}