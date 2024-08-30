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
    model,
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

  const componentOptions = typeof baseComponent === 'function' ? baseComponent.options : baseComponent;

  if (!componentOptions) {
    throw new Error('注册组件需要获取组件的 options , 传入数据错误');
  }

  return {
    name: componentOptions.name,
    inheritAttrs: false,
    props: {
      plugin: {},
      ...(model && model.prop ? { [model.prop]: {} } : {}),
    },
    model,
    data() {
      return {
        renderKey: uid(),
      };
    },
    created() {
      const self = this as any;
      self.manger = new PluginManager({
        name: componentOptions.name,
        componentOptions,
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
      self.manger.allPropKeys.forEach((key: string) => {
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
          ...(model && model.prop ? { [model.prop]: self[model.prop] } : {}),
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
