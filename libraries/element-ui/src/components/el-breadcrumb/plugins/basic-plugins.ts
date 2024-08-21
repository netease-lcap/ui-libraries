import BreadcrumbItem from 'element-ui/lib/breadcrumb-item';
import { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/index';
import { watch, shallowRef, unref } from '@vue/composition-api';
import { getRouteComponentOptions } from '@/utils/router';

/* 组件功能扩展插件 */
export const useExtendsPlugin: NaslComponentPluginOptions = {
  props: ['auto', 'showInDesiner'],
  setup(props, { h, setupContext: ctx, isDesigner }) {
    const [auto, showInDesiner] = props.get<boolean[]>([
      'auto',
      'showInDesiner',
    ]);

    const inDesigner = isDesigner || showInDesiner;

    if (inDesigner || !auto) {
      return undefined;
    }

    const itemsRef = shallowRef<any[]>([]);

    watch(
      () => (ctx.parent as any)?.$route,
      (to, from) => {
        if (!to || to.fullPath === (from && from.fullPath)) {
          return;
        }

        const matched = to.matched || [];
        const items: any[] = [];
        matched.forEach((route) => {
          const componentOptions = getRouteComponentOptions(route);
          const meta = {
            ...route.meta,
            ...(componentOptions && componentOptions.meta ? componentOptions.meta : {}),
          };

          let { crumb } = meta;

          if (crumb) {
            if (typeof crumb === 'function') crumb = crumb(route, to, from);
            else if (typeof crumb === 'object') crumb = { ...crumb };
            else if (typeof crumb === 'string') crumb = { title: crumb };
            if (!crumb.to) crumb.to = route.path || '/';
            if (crumb.to === to.path) crumb.readonly = true;

            if (crumb.title) items.push(crumb);
          }
        });
        const last = items[items.length - 1];
        if (last) {
          last.readonly = true;
        }

        itemsRef.value = items;
      },
    );

    return {
      slotDefault() {
        const slotDefault = props.get('slotDefault');
        const items = unref(itemsRef);

        if (auto && !inDesigner) {
          return items.map((it) => {
            return h(BreadcrumbItem, {
              key: it.title,
              attrs: {
                to: it.to,
              },
            }, it.title);
          });
        }

        if (typeof slotDefault === 'function') {
          return slotDefault();
        }

        return [];
      },
    };
  },
};
