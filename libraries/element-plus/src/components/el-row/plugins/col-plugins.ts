import { $deletePropsList } from '@/plugins/constants';

export function columnPlugin(props) {
  const transformResponsiveProps = (key, keys) => {
    const [spanKey, offsetKey] = keys;
    const span = props.get(spanKey);
    const offset = props.get(offsetKey);

    // 如果span和offset都未定义，返回原始属性值
    if (span === undefined && offset === undefined) {
      return props.get(key);
    }

    // 构建响应式对象
    const result: { span?: number; offset?: number } = {};
    if (span !== undefined) {
      result.span = span;
    }
    if (offset !== undefined) {
      result.offset = offset;
    }

    return Object.keys(result).length ? result : undefined;
  };

  const keys = ['xs', 'sm', 'md', 'lg', 'xl'];
  const deletePropsList = props
    .get($deletePropsList, [])
    .concat(['xsSpan', 'xsOffset', 'smSpan', 'smOffset', 'mdSpan', 'mdOffset', 'lgSpan', 'lgOffset', 'xlSpan', 'xlOffset']);

  const newKeys = {};
  keys.forEach((key) => {
    const newKey = [`${key}Span`, `${key}Offset`];
    newKeys[key] = transformResponsiveProps(key, newKey);
  });
  return {
    [$deletePropsList]: deletePropsList,
    ...newKeys,
  };
}
