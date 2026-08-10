import _ from 'lodash';

export type RouteTitleItem = {
  title: string;
  to: string;
};

/**
 * 与面包屑自动生成一致：从 matched 路由解析有页面名称的节点。
 * 标题优先级：meta.crumb > route.name > route.path
 * 是否纳入：存在 meta.crumb 或 meta.name
 */
export function getRouteTitleItems(routeInfo?: {
  path?: string;
  matched?: Array<{
    path?: string;
    name?: string | symbol | null;
    meta?: Record<string, any>;
    /** 与 vue-router RouteRecordNormalized.components 对齐，可为 null */
    components?: Record<string, any> | null;
  }>;
}): RouteTitleItem[] {
  if (!routeInfo?.path) return [];
  return _.reduce(
    routeInfo.matched,
    (pre: RouteTitleItem[], curMatch) => {
      const meta = _.assign(
        {},
        curMatch.meta,
        _.get(curMatch, 'components.default.__vccOpts.meta', {}),
        _.get(curMatch, 'components.default.meta', {}),
      );
      const hasPageName = meta?.crumb || meta?.name;
      const currentPageInfo = hasPageName
        ? {
            title: meta?.crumb || (curMatch.name as string) || curMatch.path || '',
            to: curMatch.path || '',
          }
        : [];
      return pre.concat(currentPageInfo);
    },
    [],
  );
}

/** Tab 标题取面包屑链路的最后一项（当前页） */
export function getRouteTabTitle(routeInfo?: Parameters<typeof getRouteTitleItems>[0]): string {
  const items = getRouteTitleItems(routeInfo);
  return _.last(items)?.title || routeInfo?.path || '';
}
