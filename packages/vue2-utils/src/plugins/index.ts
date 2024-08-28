/* eslint-disable no-param-reassign */
import Vue, { type VNode, type ComponentOptions } from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { uid } from 'uid';
import type {
  NaslComponentPluginOptions,
  PluginMap,
  PluginSetupFunction,
  NaslComponentExtendInfo,
} from './types';
import PluginManager from './plugin';
import HocBaseComponent from './hoc-base';
import { isEmptyVNodes, normalizeArray } from './utils';

export { $deletePropList, $ref, $render } from './constants';
export * from './common';

Vue.use(VueCompositionAPI);

export const registerComponent = (
  baseComponent: any,
  pluginOption: PluginMap,
  {
    slotNames,
    nativeEvents,
    methodNames,
    eventNames,
  }: NaslComponentExtendInfo = {},
) => {
  if (!slotNames) {
    slotNames = ['default'];
  }

  if (!nativeEvents) {
    nativeEvents = [];
  }

  if (!methodNames) {
    methodNames = [];
  }

  if (!eventNames) {
    eventNames = [];
  }

  return {
    name: baseComponent.name,
    inheritAttrs: false,
    props: {
      plugin: {},
    },
    data() {
      return {
        renderKey: uid(),
      };
    },
    created() {
      const self = this as any;
      self.manger = new PluginManager({
        name: baseComponent.name,
        componentOptions: typeof baseComponent === 'function' ? baseComponent.options : baseComponent,
        plugin: { ...pluginOption, ...self.plugin },
      });
    },
    watch: {
      plugin(v) {
        const self = this as any;
        self.manger.setPlugin(v);
        // 重新生成key rerender 组件
        this.renderKey = uid();
      },
    },
    render(h) {
      const self = this as any;
      if (!self.manger.valid) {
        return null;
      }

      const scopedSlots = {
        ...self.$scopedSlots,
      };

      const childrenNodes: VNode[] = [];
      (slotNames || []).forEach((slotName) => {
        if (scopedSlots[slotName]) {
          let nodes = scopedSlots[slotName]({});

          if (Array.isArray(nodes)) {
            nodes = nodes.filter((n) => {
              if (typeof n === 'object') {
                return n.tag || (n.text && n.text.trim());
              }

              return true;
            });
          }
          delete scopedSlots[slotName];
          if (isEmptyVNodes(nodes)) {
            return;
          }

          childrenNodes.push(
            h('template', { slot: slotName }, normalizeArray(nodes)),
          );
        }
      });

      const attrs = {
        ...this.$attrs,
      };

      // 初始值
      self.manger.allKeys.forEach((key: string) => {
        if (!Object.prototype.hasOwnProperty.call(attrs, key)) {
          attrs[key] = undefined;
        }
      });

      return h(HocBaseComponent, {
        key: self.renderKey,
        attrs: {
          $plugin: self.manger,
          $component: baseComponent,
          $slotNames: slotNames,
          $nativeEvents: nativeEvents,
          $methodNames: methodNames,
          $eventNames: eventNames,
          ...attrs,
        },
        scopedSlots,
        on: self.$listeners,
      }, childrenNodes);
    },
  } as ComponentOptions<Vue>;
};

export {
  NaslComponentPluginOptions,
  PluginSetupFunction,
};
