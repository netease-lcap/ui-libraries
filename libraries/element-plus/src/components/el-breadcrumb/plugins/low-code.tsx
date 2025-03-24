import { ElBreadcrumbItem } from 'element-plus';
import { $ide } from '@/plugins/constants';

/* 仅在 ide 环境生效的插件 */
export function handleAutoDesignerDemo(props) {
  const slots = props.get('slots');
  const auto = props.get('auto');
  const showInDesigner = props.get('showInDesigner');

  const defaultSlot = auto && showInDesigner ? {
    default: () => [
      <ElBreadcrumbItem>面包屑</ElBreadcrumbItem>,
      <ElBreadcrumbItem>会根据路径</ElBreadcrumbItem>,
      <ElBreadcrumbItem>自动生成</ElBreadcrumbItem>,
    ],
  } : {};

  return {
    slots: {
      ...slots,
      ...defaultSlot,
    },
  };
}

handleAutoDesignerDemo.type = $ide;
