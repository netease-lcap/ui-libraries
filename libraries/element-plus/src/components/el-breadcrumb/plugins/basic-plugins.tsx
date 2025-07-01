import _ from 'lodash';
import { useMemo, useState } from '@/plugins/hooks';
import { ElBreadcrumbItem } from '../index';
import { ElIcon } from '../../index';
import { useCallback } from '../../../plugins/hooks';

export function handleAutoCrumbs(props) {
  const auto = props.get('auto');
  const showInDesigner = props.get('showInDesigner');
  const slots = props.get('slots');
  const route = props.get('route');
  const [routeInfo, setRouteInfo] = useState(route);
  const router = props.get('router');
  router.afterEach((to) => setRouteInfo(to));

  const isNotAutoCrumbs = useMemo(() => !auto || showInDesigner, [auto, showInDesigner]);

  // TODO 整理代码
  const routerMeta = useMemo(() => {
    if (!routeInfo?.path) return [];
    return _.reduce(
      routeInfo.matched,
      (pre: Array<{ title: string; to: string }>, curMatch) => {
        const meta = _.assign(
          {},
          curMatch.meta,
          _.get(curMatch, 'components.default.__vccOpts.meta', {}),
          _.get(curMatch, 'components.default.meta', {}),
        );
        if (!meta?.crumb && !meta?.name) {
          return pre;
        }
        return pre.concat({
          title: meta?.crumb || curMatch.name || curMatch.path,
          to: curMatch.path,
        });
      },
      [],
    );
  }, [routeInfo]);

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
    () => (!isNotAutoCrumbs
        ? {
            slots: {
              ...slots,
              default: defaultSlots,
            },
          }
        : {}),
    [isNotAutoCrumbs, defaultSlots, slots],
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
