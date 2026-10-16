import { useCallback } from '@/plugins/hooks';

export { handleControllableValue } from '@/plugins/common/index';

export function handleFlex(props) {
  const ref = props.get('ref');
  const myRouter = props.get('myRouter');
  return {
    router: myRouter,
  };
}

export function handleScroll(props) {
  const onScroll = props.get('onScroll');
  const onScrollHandler = useCallback(
    (event: Event) => {
      const target = (event.currentTarget ?? event.target) as HTMLElement | null;
      return onScroll?.({
        scrollTop: target?.scrollTop ?? 0,
        scrollLeft: target?.scrollLeft ?? 0,
        scrollWidth: target?.scrollWidth ?? 0,
        scrollHeight: target?.scrollHeight ?? 0,
        clientWidth: target?.clientWidth ?? 0,
        clientHeight: target?.clientHeight ?? 0,
      });
    },
    [onScroll],
  );
  if (!onScroll) return {};
  return {
    onScroll: onScrollHandler,
  };
}
