import { useMemo, useCallback } from '@/plugins/hooks';
import VanIcon from '@/components/van-icon';

export function handleDestination(props: any) {
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

export function handleIcon(props: any) {
  const icon = props.get('icon');
  const iconSlot = useCallback(() => {
    if (icon) {
      return <VanIcon name={icon} />;
    }
    return null;
  }, [icon]);
  return {
    slots: {
      icon: iconSlot,
    },
  };
}
