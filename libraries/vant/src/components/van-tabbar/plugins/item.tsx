import { useMemo, useCallback } from '@/plugins/hooks';
import VanIcon from '@/components/van-icon';
import { $deletePropsList } from '@/plugins/constants';

export function handleDestination(props: any) {
  const destination = props.get('destination');
  const link = props.get('link');
  const href = props.get('href');
  const to = props.get('to');
  const url = props.get('url');
  const toSelf = useMemo(() => to || destination, [destination, to]);
  const urlSelf = useMemo(() => url || href || link, [href, link, url]);
  const deletePropsList = props
    .get($deletePropsList, [])
    .concat(['destination', 'link', 'href']);
  return {
    url: urlSelf,
    to: toSelf,
    [$deletePropsList]: deletePropsList,
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
