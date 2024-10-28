/* eslint-disable no-param-reassign */
import Vue, { type VNode, type ComponentOptions } from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { kebabCase } from 'lodash';
import type {
  NaslComponentPluginOptions,
  PluginMap,
  PluginSetupFunction,
  NaslComponentExtendInfo,
} from './types';
import PluginManager from './plugin';
import createHocComponent from './hoc-base';
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
  const componentName = name || componentOptions.name;
  const manger = new PluginManager({
    name: componentName,
    componentOptions,
    plugin: { ...pluginOption },
  });

  const HocBaseComponent = createHocComponent(baseComponent, manger);

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
    name: componentName,
    inheritAttrs: false,
    mixins,
    props: {
      ...(model && model.prop ? { [model.prop]: {} } : {}),
      ...(rangeModel && rangeModel.length === 2
        ? { [rangeModel[0]]: {}, [rangeModel[1]]: {} }
        : {}),
    },
    model,
    rangeModel,
    render(h) {
      const self = this as any;
      if (!manger.valid) {
        return null;
      }

      const scopedSlots = {
        ...self.$scopedSlots,
      };

      const childrenNodes: VNode[] = [];
      (slotNames || []).forEach((slotName) => {
        if (scopedSlots[slotName]) {
          const nodes = scopedSlots[slotName]({});

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
        manger.allPropKeys.forEach((key: string) => {
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
          attrs: {
            $slotNames: slotNames,
            $nativeEvents: nativeEvents,
            $methodNames: methodNames,
            $eventNames: eventNames,
            ...attrs,
          },
          scopedSlots,
          on: self.$listeners,
        },
        manger.name === 'ElForm' ? this.$slots.default : childrenNodes,
      );
    },
  } as ComponentOptions<Vue>;
};

export { NaslComponentPluginOptions, PluginSetupFunction };
