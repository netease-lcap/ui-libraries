/* eslint-disable react/jsx-pascal-case */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
import { ref, Ref, watch, provide, inject, markRaw, computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import create from 'zustand-vue';
import { Map as imMap } from 'immutable';
import _ from 'lodash';
import fp from 'lodash/fp';
import { $deletePropsList, $provide } from '@/plugins/constants';
import { scheduler } from '@/plugins/hooks';
import '@/utils/index';

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

export function registerComponent<T>(Component, options) {
  return defineComponent<T>({
    name: 'HocBaseComponents',
    components: { Component },
    inheritAttrs: false,
    props: Component.props,

    setup(props, { attrs, slots, emit, expose }) {
      const componentRef = ref(null);
      const plugin = new PluginOptions(options);
      const pluginHooks = plugin.getPluginMethod();
      const componentState = ref({ state: {} });
      const render = markRaw(Component);
      const exposeRef = ref({});
      const injectRef = inject($provide) ?? (ref({}) as Ref);
      const provideRef = ref({});
      const router = useRouter?.();
      const route = useRoute?.();
      const useStore = create((set) => ({
        state: {
          inject: injectRef,
          provide: {},
          ref: {},
          router,
          route,
          [$deletePropsList]: ['provide', 'inject', 'render', 'slots', 'emit', $deletePropsList],
        },
        props: {
          ...props,
          ...attrs,
          emit,
          slots,
        },

        setvalue: (commit, tr) => {
          const getNewStateFn = _.cond([
            [_.isFunction, _.identity],
            [_.isPlainObject, (state) => (store) => ({ state: { ...store.state, ...state } })],
            [_.stubTrue, _.constant],
          ])(commit) as any;
          return set((state) => getNewStateFn(state), tr);
        },
      }));
      const fiberMap = new Map<string, any>([
        ['updateQueen', new Set()],
        ['useStore', useStore],
      ]);
      const setValue = useStore((state: any) => state.setvalue);
      useStore.subscribe((props: any) => {
        const ImmutableProps = imMap({ ...props.props, ...props.state, ref: exposeRef.value, render: Component });
        const commitState = scheduler(pluginHooks, ImmutableProps, fiberMap);
        const ref = commitState.get('ref');
        const commitJsState = commitState.delete('ref').toJS();
        render.value = commitJsState.render;
        componentState.value.state = _.omit(commitJsState, ['render', 'ref']);
        Object.assign(exposeRef.value, ref);
        Object.assign(provideRef.value, commitJsState.provide);
      });
      watch(
        () => [props, attrs, slots, emit],
        ([props, attrs, slots, emit]) => {
          setValue(() => ({
            props: {
              ...props,
              ...attrs,
              slots,
              emit,
            },
          }));
        },
        { deep: true, immediate: true },
      );

      watch(componentRef, (value) => _.defaults(exposeRef.value, value));
      watch(injectRef, (value) => _.defaults(provideRef.value, value), { deep: true, immediate: true });
      expose(exposeRef.value);

      provide($provide, provideRef);
      const RenderComponent = computed(() => render.value) as any;

      return () => {
        return (
          <RenderComponent.value
            {..._.omit(componentState.value.state, componentState.value.state[$deletePropsList])}
            v-slots={{ ...slots, ..._.get(componentState, 'value.state.slots', {}) }}
            ref={componentRef}
          />
        );
      };
    },
  });
}
