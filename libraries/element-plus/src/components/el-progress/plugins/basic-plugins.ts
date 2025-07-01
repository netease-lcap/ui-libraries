/* 组件功能扩展插件 */
import _ from 'lodash';
import { useCallback } from '@/plugins/hooks';

export function handleFormatFunction(props) {
  const formatProps = props.get('format', undefined);
  const format = useCallback(
    _.wrap(formatProps, (fn, ...args) => _.attempt(fn, ...args) ?? undefined),
    [formatProps],
  );

  return {
    format,
  };
}
