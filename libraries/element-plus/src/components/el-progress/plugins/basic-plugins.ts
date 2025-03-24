/* 组件功能扩展插件 */
import _ from 'lodash';
import { useMemo } from '@/plugins/hooks';

export function handleFormatFunction(props) {
  const format = props.get('format');
  const formatFunction = useMemo(() => {
    if (!format) {
      return null;
    }
    if (_.isFunction(format)) {
      return format;
    }
    return () => {
      return format;
    };
  }, [format]);
  return {
    format: formatFunction,
  };
}
