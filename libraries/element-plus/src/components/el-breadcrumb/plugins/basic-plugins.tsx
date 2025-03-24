import { useRoute, useRouter } from 'vue-router';
import { useEffect, useState } from '@/plugins/hooks';
import { ElBreadcrumbItem } from '../index';
import { ElIcon } from '../../index';

export function handleAutoCrumbs(props) {
  const auto = props.get('auto');
  const showInDesigner = props.get('showInDesigner');
  const slots = props.get('slots');

  if (!auto || showInDesigner) return {};

  const router = useRouter?.();
  const route = useRoute?.();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!route?.path) return;

    const matched = route.matched || [];
    const items = matched.reduce((pre: Array<{title: string, to: string}>, curMatch) => {
      const meta = {
        ...curMatch.meta,
        ...((curMatch?.components?.default?.__vccOpts || curMatch.components?.default)?.meta || {}),
      };
      pre.push({
        title: meta?.crumb || curMatch.name || curMatch.path,
        to: curMatch.path,
      });
      return pre;
    }, []);
    setItems(items);
  }, [route, router]);

  const renderBreadcrumbItem = (item) => (
    <ElBreadcrumbItem
      key={item.to}
      to={{ path: item.to }}
    >
      {{
        default: () => item.title,
      }}
    </ElBreadcrumbItem>
  );

  return {
    slots: {
      ...slots,
      default: () => items.map(renderBreadcrumbItem),
    },
  };
}

export function handleSeparatorIcon(props) {
  const separatorIcon = props.get('separatorIcon');
  if (!separatorIcon) return {};

  const separatorIconComp = <ElIcon name={separatorIcon} />;

  return {
    separatorIcon: separatorIconComp,
  };
}
