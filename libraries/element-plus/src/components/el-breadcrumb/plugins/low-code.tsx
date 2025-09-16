import { ElBreadcrumbItem } from 'element-plus';
import { $ide } from '@/plugins/constants';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

/* 仅在 ide 环境生效的插件 */
export default new PluginAccumulateTypes().addPlugin({
  name: 'handleAutoDesignerDemo',
  type: $ide,
  handle: (props) => {
    const slots = props.get('slots');
    const auto = props.get('auto');
    const showInDesigner = props.get('showInDesigner');

    const defaultSlot = auto && showInDesigner
        ? {
            default: () => [
              <ElBreadcrumbItem>面包屑</ElBreadcrumbItem>,
              <ElBreadcrumbItem>会根据路径</ElBreadcrumbItem>,
              <ElBreadcrumbItem>自动生成</ElBreadcrumbItem>,
            ],
          }
        : {};

    return {
      slots: {
        ...slots,
        ...defaultSlot,
      },
    };
  },
});
