import _ from 'lodash';
import { useMemo } from '@/plugins/hooks';
import { ElBreadcrumbItem } from '../index';
import { ElIcon } from '../../index';
import { useCallback } from '../../../plugins/hooks';

export function handleAutoCrumbs(props) {
  const auto = props.get('auto');
  const showInDesigner = props.get('showInDesigner');
  const slots = props.get('slots');
  const route = props.get('route');

  const isAutoCrumbs = useMemo(() => !auto || showInDesigner, [auto, showInDesigner]);

  const routerMeta = useMemo(() => {
    if (!route?.path) return [];
    return _.reduce(
      route.matched,
      (pre: Array<{ title: string; to: string }>, curMatch) => {
        const meta = _.assign(
          {},
          curMatch.meta,
          _.get(curMatch, 'components.default.__vccOpts.meta', {}),
          _.get(curMatch, 'components.default.meta', {}),
        );
        return pre.concat({
          title: meta?.crumb || curMatch.name || curMatch.path,
          to: curMatch.path,
        });
      },
      [],
    );
  }, [route]);

  const defaultSlots = useCallback(() => {
    return routerMeta.map((item) => (
      <ElBreadcrumbItem key={item.to} to={{ path: item.to }}>
        {{
          default: () => item.title,
        }}
      </ElBreadcrumbItem>
    ));
  }, [routerMeta]);

  const result = useMemo(
    () => (isAutoCrumbs
        ? {
            slots: {
              ...slots,
              default: defaultSlots,
            },
          }
        : {}),
    [isAutoCrumbs, defaultSlots, slots],
  );
  return result;
}

export function handleSeparatorIcon(props) {
  const separatorIcon = props.get('separatorIcon');
  if (!separatorIcon) return {};

  const separatorIconComp = <ElIcon name={separatorIcon} />;

  return {
    separatorIcon: separatorIconComp,
  };
}
