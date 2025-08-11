import _ from 'lodash';
import { useEffect, useMemo } from '@/plugins/hooks';

export function handleSwipeState(props) {
  const swipeState = props.get('swipeState');
  const ref = props.get('ref');
  useEffect(() => {
    if (!swipeState) return;
    ref.open(swipeState);
  }, [swipeState]);
  return {};
}
