import { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/index';
import BreadcrumbItem from 'element-ui/lib/breadcrumb-item';

/* 仅在 ide 环境生效的插件 */
export const useAutoDesignerDemo: NaslComponentPluginOptions = {
  props: ['auto', 'showInDesiner'],
  setup(props, { h, isDesigner }) {
    return {
      slotDefault: () => {
        const [auto, showInDesiner] = props.get<boolean[]>(['auto', 'showInDesiner']);
        const inDesigner = isDesigner || showInDesiner;
        if (inDesigner && auto) {
          return [
            h(BreadcrumbItem, {}, '面包屑'),
            h(BreadcrumbItem, {}, '会根据路径'),
            h(BreadcrumbItem, {}, '自动生成'),
          ];
        }

        const slotDefault = props.get('slotDefault');

        if (typeof slotDefault === 'function') {
          return slotDefault();
        }

        return [];
      },
    };
  },
  onlyUseIDE: true,
  order: 11,
};
