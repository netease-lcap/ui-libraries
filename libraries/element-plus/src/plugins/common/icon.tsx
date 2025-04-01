import { ElIcon } from '@/components';
import _ from 'lodash';

export function handleIcon(props) {
  const clearIconName = props.get('clearIconName');
  const prefixIconName = props.get('prefixIconName');
  
  return {
    clearIcon: <ElIcon name={clearIconName} />,
    prefixIcon: <ElIcon name={prefixIconName} />,
  };
}