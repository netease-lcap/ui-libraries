/* eslint-disable no-param-reassign */
import Vue, { type VNode, type ComponentOptions } from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { isFunction } from 'lodash';
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
  const { prop = 'value', event = 'update:value' } = model;

  return {
    props: {
      formField: {
        type: Object,
      },
      [prop]: {
        default: null,
      },
    },
    watch: {
      [prop](val, oldVal) {
        if (val !== oldVal && this.formField && this.formField.getValue() !== val) {
          this.formField.setValue(val, false);
        }
      },
    },
    methods: {
      getModelValue() {
        if (this.formField && isFunction(this.formField.getValue)) {
          return this.formField.getValue();
        }

        return this[prop];
      },
      changeModelValue(v) {
        if (this.formField && isFunction(this.formField.setValue)) {
          this.formField.setValue(v);
        } else if (this.$listeners[event]) {
          this.$listeners[event](v);
        }
      },
      resetModelRender(attrs: Record<string, any>, listeners: Record<string, any>) {
        const changeListner = listeners[event];
        listeners[event] = this.changeModelValue;
        attrs[prop] = this.getModelValue();
        if (this.formField && isFunction(this.formField.setChangeListener)) {
          this.formField.setChangeListener(changeListner);
        }
      },
    },
  } as ComponentOptions<any>;
}

function createRangeModelMixin(rangeModel: NaslComponentExtendInfo['rangeModel']) {
  const [startProp, endProp] = rangeModel;
  const getEvent = (prop: string) => `update:${prop}`;
  const startEvent = getEvent(startProp);
  const endEvent = getEvent(endProp);
  const getNameIndex = (prop: any) => (prop === endProp ? 1 : 0);

  return {
    props: {
      [startProp]: {
        default: null,
      },
      [endProp]: {
        default: null,
      },
      formRangeField: {
        type: Object,
      },
    },
    watch: {
      [startProp](val, oldVal) {
        const startIndex = 0;
        if (val !== oldVal && this.formRangeField && this.formRangeField.getValue(startIndex) !== val) {
          this.formRangeField.setValue(startIndex, val, false);
        }
      },
      [endProp](val, oldVal) {
        const endIndex = 1;
        if (val !== oldVal && this.formRangeField && this.formRangeField.getValue(endIndex) !== val) {
          this.formRangeField.setValue(endIndex, val, false);
        }
      },
    },
    methods: {
      getRangeModelValue(prop = startProp) {
        if (this.formRangeField && isFunction(this.formRangeField.getValue)) {
          return this.formRangeField.getValue(getNameIndex(prop));
        }

        return this[prop];
      },
      changeRangeModelValue(prop, v) {
        if (this.formRangeField && isFunction(this.formRangeField.setValue)) {
          this.formRangeField.setValue(getNameIndex(prop), v);
        } else if (this.$listeners[getEvent(prop)]) {
          this.$listeners[getEvent(prop)](v);
        }
      },
      resetRangeModelRender(attrs, listeners) {
        const startChangeListner = listeners[startEvent];
        const endChangeListner = listeners[endEvent];
        listeners[startEvent] = (v: any) => this.changeRangeModelValue(startProp, v);
        listeners[endEvent] = (v: any) => this.changeRangeModelValue(endProp, v);

        attrs[startProp] = this.getRangeModelValue(startProp);
        attrs[endProp] = this.getRangeModelValue(endProp);
        if (this.formRangeField && isFunction(this.formRangeField.setChangeListener)) {
          this.formRangeField.setChangeListener(startChangeListner, endChangeListner);
        }
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
      ...(rangeModel && rangeModel.length === 2 ? { [rangeModel[0]]: {}, [rangeModel[1]]: {} } : {}),
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

      // 初始值
      self.manger.allPropKeys.forEach((key: string) => {
        if (!Object.prototype.hasOwnProperty.call(attrs, key)) {
          attrs[key] = undefined;
        }
      });

      const listeners = { ...self.$listeners };

      if (hasModel) {
        this.resetModelRender(attrs, listeners);
      }

      if (hasRangeModel) {
        this.resetRangeModelRender(attrs, listeners);
      }

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
        on: listeners,
      }, childrenNodes);
    },
  } as ComponentOptions<Vue>;
};

export {
  NaslComponentPluginOptions,
  PluginSetupFunction,
};
