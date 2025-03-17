import { ElBreadcrumbItem } from 'element-plus';
import { h } from 'vue';

/* 仅在 ide 环境生效的插件 */
export function handleAutoDesignerDemo(props) {
  return {
    slots: {
      default: () => {
        const auto = props.get('auto');
        const showInDesigner = props.get('showInDesigner');

        if (showInDesigner && auto) {
          return [
            h(ElBreadcrumbItem, {}, '面包屑'),
            h(ElBreadcrumbItem, {}, '会根据路径'),
            h(ElBreadcrumbItem, {}, '自动生成'),
          ];
        }

        const slotDefault = props.get('slots').default;

        if (typeof slotDefault === 'function') {
          return slotDefault();
        }

        return [];
      },
    },
  };
}

// handleAutoDesignerDemo.type = $ide;
