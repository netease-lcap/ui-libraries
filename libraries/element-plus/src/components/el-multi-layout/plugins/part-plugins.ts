import { PluginAccumulateTypes } from '@/plugins/accumulate';

export function createLayoutPartPlugin<T>(className: string) {
  return new PluginAccumulateTypes<T, object>().addPlugin({
    name: 'handleLayout',
    handle(props) {
      const myClass = props.get('class', '');
      return {
        class: `${myClass} ${className}`,
      };
    },
  });
}

export const topNavPlugins = createLayoutPartPlugin<nasl.ui.ElMultiLayoutTopNavOptions>(
  'el-multi-layout-top-nav',
);
export const bodyPlugins = createLayoutPartPlugin<nasl.ui.ElMultiLayoutBodyOptions>('el-multi-layout-body');
export const sidebarPlugins = createLayoutPartPlugin<nasl.ui.ElMultiLayoutSidebarOptions>(
  'el-multi-layout-sidebar',
);
export const mainPlugins = createLayoutPartPlugin<nasl.ui.ElMultiLayoutMainOptions>('el-multi-layout-main');
export const mainBodyPlugins = createLayoutPartPlugin<nasl.ui.ElMultiLayoutMainBodyOptions>(
  'el-multi-layout-main-body',
);
