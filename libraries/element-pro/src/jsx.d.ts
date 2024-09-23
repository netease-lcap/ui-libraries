import { VNode, PluginObject } from 'vue'; // eslint-disable-line
import { ComponentRenderProxy } from '@vue/composition-api'; // eslint-disable-line

declare global {
  namespace JSX {
    interface Element extends VNode {
      children?: any;
    }
    interface ElementClass extends ComponentRenderProxy {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
    type IntrinsicAttributes = any;
  }
}

declare module '@vue/composition-api' {
  interface ComponentInternalInstance { // todo
    [x: string]: any;
  }
}

declare module 'vue' {
  interface VueConstructor {
    _installedPlugins: PluginObject<any>[];
  }
}
