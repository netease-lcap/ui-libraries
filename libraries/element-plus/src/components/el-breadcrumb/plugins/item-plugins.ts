import { useMemo } from '@/plugins/hooks';

export function handle(props) {
  const destination = props.get('destination');
  const link = props.get('link');
  const href = props.get('href');
  const to = props.get('to');

  const toSelf = useMemo(() => to || href || link || destination, [destination, href, link, to]);

  // 面包屑的to属性只接受string|RouteLocationRaw类型，
  // RouteLocationRaw类型不可以设置外部链接及target，这里只返回链接地址, replace用组件里设置的
  return {
    to: toSelf,
  };
}
