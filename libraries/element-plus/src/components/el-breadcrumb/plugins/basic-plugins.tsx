import _ from 'lodash';
import { breadcrumbProps } from 'element-plus';
import { useMemo, useState, useCallback, useEffect } from '@/plugins/hooks';
import { $router, $route } from '@/plugins/constants';
import { ElBreadcrumbItem } from '../index';
import { getPropsIcon } from '@/plugins/common/icon';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import lowCodePlugin from './low-code';

const BreadcrumbAccumulate = new PluginAccumulateTypes<nasl.ui.ElBreadcrumbOptions, typeof breadcrumbProps>();

export default BreadcrumbAccumulate.addAccumulate(lowCodePlugin)
  .addPlugin({
    name: 'handleAutoCrumbs',
    handle: (props) => {
      const auto = props.get('auto');
      const showInDesigner = props.get('showInDesigner');
      const slots = props.get('slots');
      const route = props.get($route);
      const [routeInfo, setRouteInfo] = useState(route);
      const router = props.get($router);
      useEffect(() => {
        router?.afterEach?.((to) => setRouteInfo(to));
      }, []);

      const isNotAutoCrumbs = useMemo(() => !auto || showInDesigner, [auto, showInDesigner]);

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
            const hasPageName = meta?.crumb || meta?.name;
            const currentPageInfo = hasPageName
              ? {
                  title: meta?.crumb || curMatch.name || curMatch.path,
                  to: curMatch.path,
                }
              : [];
            return pre.concat(currentPageInfo);
          },
          [],
        );
      }, [routeInfo]);

      const defaultSlots = useCallback(() => {
        return routerMeta.map((item) => (
          <ElBreadcrumbItem replace={false} key={item.to} to={{ path: item.to }}>
            {{
              default: () => item.title,
            }}
          </ElBreadcrumbItem>
        ));
      }, [routerMeta]);

      const result = useMemo(
        () => (isNotAutoCrumbs
            ? {}
            : {
                slots: _.assign({}, slots, {
                  default: defaultSlots,
                }),
              }),
        [isNotAutoCrumbs, defaultSlots, slots],
      );
      return result;
    },
  })
  .addPlugin({
    name: 'handleSeparatorIcon',
    handle: (props) => {
      const separatorIcon = props.get('separatorIcon');

      return separatorIcon
        ? {
            separatorIcon: getPropsIcon({ name: separatorIcon }),
          }
        : {};
    },
  });
