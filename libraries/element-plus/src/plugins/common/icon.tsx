import _ from 'lodash';
import { VNode } from 'vue';
import { ElIcon } from '@/components';

// 定义 handleIcon 函数的参数类型
type HandleIconProps = {
  get: (key: string) => any;
};

// 定义 handleIcon 函数的返回类型
type HandleIconResult = {
  prefixIcon?: VNode;
};

export function handleIcon(props: HandleIconProps): HandleIconResult {
  const prefixIconName = props.get('prefixIconName');
  const prefixIcon = prefixIconName ? { prefixIcon: <ElIcon name={prefixIconName} /> } : {};
  return {
    ...prefixIcon,
  };
}

// 定义函数返回类型 - Vue 3 JSX 返回 VNode 或 null
type IconResult = VNode | null;

export function getPropsIcon(props: any): IconResult {
  return _.cond([
    [_.conforms({ name: (name) => _.isString(name) && !!name }), (props) => <ElIcon {...props} />],
    [_.conforms({ name: _.isNil }), _.constant(null)],
    [_.conforms({ name: (name) => _.isFunction(name?.setup) }), (props) => props.name],
    [_.stubTrue, _.constant(null)],
  ])(props);
}
