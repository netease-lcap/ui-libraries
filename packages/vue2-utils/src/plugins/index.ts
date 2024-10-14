/* eslint-disable no-param-reassign */
import Vue, { type VNode, type ComponentOptions } from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { kebabCase } from 'lodash';
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

function createModelMixin(model: NaslComponentExtendInfo['model']) {
  const { prop = 'value' } = model;

  return {
    props: [prop],
    methods: {
      resetModelRender(
        attrs: Record<string, any>,
      ) {
        attrs[prop] = this[prop];
      },
    },
  } as ComponentOptions<any>;
}

function createRangeModelMixin(
  rangeModel: NaslComponentExtendInfo['rangeModel'],
) {
  const [startProp, endProp] = rangeModel;

  return {
    props: [startProp, endProp],
    methods: {
      resetRangeModelRender(attrs) {
        attrs[startProp] = this[startProp];
        attrs[endProp] = this[endProp];
      },
    },
  } as ComponentOptions<any>;
}

export const registerComponent = (
  baseComponent: any,
  pluginOption: PluginMap,
  {
    name,
    slotNames = ['default'],
    nativeEvents = [],
    methodNames = [],
    eventNames = [],
    model,
    rangeModel,
  }: NaslComponentExtendInfo = {},
) => {
  const componentOptions = typeof baseComponent === 'function' ? baseComponent.options : baseComponent;
  if (!componentOptions) {
    return baseComponent;
  }
  const mixins: any = [];

  const hasModel = model && model.prop;
  if (hasModel) {
    mixins.push(createModelMixin(model));
  }

  const hasRangeModel = rangeModel && rangeModel.length >= 2;
  if (hasRangeModel) {
    mixins.push(createRangeModelMixin(rangeModel));
  }

  return {
    name: name || componentOptions.name,
    inheritAttrs: false,
    mixins,
    props: {
      plugin: {},
      ...(model && model.prop ? { [model.prop]: {} } : {}),
      ...(rangeModel && rangeModel.length === 2
        ? { [rangeModel[0]]: {}, [rangeModel[1]]: {} }
        : {}),
    },
    model,
    rangeModel,
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

      if (this.$env && this.$env.VUE_APP_DESIGNER) {
        self.manger.allPropKeys.forEach((key: string) => {
          if (
            !Object.prototype.hasOwnProperty.call(attrs, key)
            && !Object.prototype.hasOwnProperty.call(attrs, kebabCase(key))
          ) {
            attrs[key] = undefined;
          }
        });
      }

      if (hasModel) {
        this.resetModelRender(attrs);
      }

      if (hasRangeModel) {
        this.resetRangeModelRender(attrs);
      }

      return h(
        HocBaseComponent,
        {
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
        },
        childrenNodes,
      );
    },
  } as ComponentOptions<Vue>;
};

export { NaslComponentPluginOptions, PluginSetupFunction };
