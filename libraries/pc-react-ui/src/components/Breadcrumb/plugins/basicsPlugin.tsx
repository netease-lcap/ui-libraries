import React from 'react';
import _ from 'lodash';
import { RouterContext } from '@/components/Router';

export function useHandle(props) {
  const auto = props.get('auto');
  const BaseComponent = props.get('render');
  const [items, setItems] = React.useState([]);
  const { useLocation, router, useNavigate } = React.useContext(RouterContext);
  const navigate = useNavigate?.();
  const location = useLocation?.();
  React.useEffect(() => {
    if (!location?.pathname) return;
    const path = location.pathname?.split('/')?.filter(Boolean);
    const localItem = path?.reduce((pre, next) => {
      const currentRouter = pre?.router?.find((item) => item.path === next);
      pre.router = currentRouter?.children ?? [];
      const paths = _.isNil(pre.path.at(-1)) ? `/${currentRouter.path}` : `${pre.path.at(-1).paths}/${currentRouter?.path}`;
      pre.path.push({
        title: currentRouter?.meta?.crumb,
        paths,
        onClick: () => {
          navigate(paths);
        },
      });
      return pre;
    }, { router: router?.routes ?? [], path: [] });
    setItems(localItem.path);
  }, [location?.pathname, router]);
  const render = React.useCallback((selfProps) => {
    return <BaseComponent {..._.omit(selfProps, 'children')} items={selfProps.items} />;
  }, [BaseComponent]);
  if (!auto) {
    return {};
  }
  const resulsItems = _.isEmpty(items) ? { render } : { items, render };
  return resulsItems;
}

export function useHandleEmpty(props) {
  const nodepath = props.get('data-nodepath');
  const auto = props.get('auto');
  const items = props.get('items');
  if (!nodepath || !auto) {
    return {};
  }
  if (_.isEmpty(items)) {
    return {

      items: [{
        title: '面包屑',
      }, {
        title: '自动生成',
      }],
    };
  }
  return {};
}
