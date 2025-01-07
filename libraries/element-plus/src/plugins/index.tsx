/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
import { ref, defineProps, watch } from 'vue';
import create from 'zustand-vue';
import _ from 'lodash';
import fp from 'lodash/fp';

export class PluginOptions {
  plugin: any[] = [];

  constructor(options) {
    this.setPlugin(options.plugin);
  }

  handleRule = (plugin) => {
    const defaultOrderPlugin = _.map(plugin, (plugin) => _.defaults(plugin, { order: 4 }));
    const sortPlugin = _.orderBy(defaultOrderPlugin, ['order'], ['asc']);
    const unionPlugin = _.unionBy(sortPlugin, 'name');
    return unionPlugin;
  };

  setPlugin = (plugin) => {
    const handlePluginList = _.cond([
      [_.isArray, _.identity],
      [_.isObject, _.values],
      [_.stubTrue, _.stubArray],
    ]);

    this.plugin = this.handleRule(_.concat(this.plugin, handlePluginList(plugin)));
  };

  getPluginMethod = () => {
    const handlePlgunMethod = _.cond([
      [_.isFunction, _.identity],
      [_.flow([fp.get('method'), _.isFunction]), fp.get('method')],
      [_.stubTrue, _.noop],
    ]);
    const pluginMethod = _.map(this.plugin, handlePlgunMethod);
    return pluginMethod;
  };
}
export function registerComponet(Component, options) {
  return {
    name: 'HocBaseComponents',
    components: { Component },
    inheritAttrs: false,
    props: Component.props,
    setup(props, {
      attrs, slots, emit, expose,
    }) {
      const componentRef = ref(null);
      const plugin = new PluginOptions(options);
      const pluginHooks = plugin.getPluginMethod();
      const useStore = create((set) => ({
        ...props,
        state: {},
        slots,
        ...attrs,
        emit,
        set,
        setvalue: (fn, tr) => set((state) => fn(state), tr),
        deleteList: ['deleteList'],
      }));
      watch(() => [props, attrs, slots, emit], ([props, attrs, slots, emit]) => {
        useStore.setState({
          ...props, ...attrs, slots, emit,
        });
      }, { deep: true });
      pluginHooks.forEach((handleFun) => _.attempt(handleFun, useStore, componentRef));
      const expandProps = useStore() as any;
      setTimeout(() => {
        console.log(componentRef, 'componentRef');
      }, 1000);
      expose({
        inputref: componentRef,
      });
      return () => {
        console.log(expandProps, '==expandProps,', slots);
        console.log('default', slots.default());
        return (
          <Component
            {...attrs}
            {..._.omit(expandProps, expandProps.deleteList)}
            {...expandProps.state}
            // v-slots={slots}
            v-on={emit}
            ref={componentRef}
          >
            {{
              ...slots,
            }}
          </Component>
        );
      };
    },
  };
}
