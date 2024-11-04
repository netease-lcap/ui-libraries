/* eslint-disable no-param-reassign */
import Vue, { type VNode, type ComponentOptions } from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { isNil, kebabCase } from 'lodash';
import type {
  NaslComponentPluginOptions,
  PluginMap,
  PluginSetupFunction,
  NaslComponentExtendInfo,
} from './types';
import PluginManager from './plugin';
import createHocComponent from './hoc-base';
import MField from '../mixins/field';
import { isEmptyVNodes, normalizeArray } from './utils';

export { $deletePropList, $ref, $render } from './constants';
export * from './common';

Vue.use(VueCompositionAPI);

// 兼容 cloud ui form mixin
function createUFormMixin() {
  return {
    mixins: [MField],
    methods: {
      handleFocus(e: any) {
        this.$emit('focus', e);
      },
      handleBlur(e: any) {
        this.$emit('blur', e);
      },
      resetFieldRender(attrs: any, listeners: any) {
        listeners.focus = this.handleFocus;
        listeners.blur = this.handleBlur;
      },
    },
  };
}

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
    watch: {
      [prop]: {
        handler(val) {
          this.$emit('update', val);
        },
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
      normalizeRangeValue(startValue, endValue) {
        if (isNil(startValue) && isNil(endValue)) {
          return null;
        }

        return [startValue, endValue];
      },
    },
    created() {
      this.$emit('update', this.normalizeRangeValue(this[startProp], this[endProp]));

      this.$watch(() => JSON.stringify([this[startProp], this[endProp]]), () => {
        this.$emit('update', this.normalizeRangeValue(this[startProp], this[endProp]));
      });
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

  const isFormField = hasModel || hasRangeModel;

  if (isFormField) {
    mixins.unshift(createUFormMixin());
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

      const listeners = {
        ...this.$listeners,
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

      if (isFormField) {
        this.resetFieldRender(attrs, listeners);
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
          on: listeners,
        },
        childrenNodes,
      );
    },
  } as ComponentOptions<Vue>;
};

export { NaslComponentPluginOptions, PluginSetupFunction };
