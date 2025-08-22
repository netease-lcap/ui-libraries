import _ from 'lodash';
import { ElIcon } from '@/components';

export function handleIcon(props) {
  const clearIconName = props.get('clearIconName');
  const prefixIconName = props.get('prefixIconName');
  const clearIcon = clearIconName ? { clearIcon: <ElIcon name={clearIconName} /> } : {};
  const prefixIcon = prefixIconName ? { prefixIcon: <ElIcon name={prefixIconName} /> } : {};
  return {
    ...clearIcon,
    ...prefixIcon,
  };
}

export function getPropsIcon(props: any) {
  return _.cond([
    [_.conforms({ name: _.isString }), (props) => <ElIcon {...props} />],
    [_.conforms({ name: _.isNil }), _.constant(null)],
    [_.conforms({ name: (name) => _.isFunction(name?.setup) }), (props) => props.name],
    [_.stubTrue, _.constant(null)],
  ])(props);
}
