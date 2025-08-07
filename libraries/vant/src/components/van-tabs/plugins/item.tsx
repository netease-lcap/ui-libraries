import { useMemo } from '@/plugins/hooks';

export default function handleDestination(props: any) {
  const destination = props.get('destination');
  const link = props.get('link');
  const href = props.get('href');
  const to = props.get('to');
  const url = props.get('url');
  const toSelf = useMemo(() => to || destination, [destination, to]);
  const urlSelf = useMemo(() => url || href || link, [href, link, url]);
  return {
    url: urlSelf,
    to: toSelf,
  };
}