/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
import { ref, Ref, watch, provide, inject, markRaw } from 'vue';
import create from 'zustand-vue';
import { Map as imMap } from 'immutable';
import _ from 'lodash';
import fp from 'lodash/fp';
import { $deletePropsList, $provide } from '@/plugins/constants';
import { fiberNode } from '@/plugins/hooks';
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

export function registerComponet(Component, options) {
  return {
    name: 'HocBaseComponents',
    components: { Component },
    inheritAttrs: false,
    props: Component.props,

    setup(props, { attrs, slots, emit, expose }) {
      const componentRef = ref(null);
      const plugin = new PluginOptions(options);
      const pluginHooks = plugin.getPluginMethod();
      const mystate = ref({ state: {} });
      const render = markRaw(Component);
      const fiberMap = new Map();
      const myRef = ref({});
      const childrenRef = ref({});
      const injectRef = inject($provide) ?? (ref({}) as Ref);
      const provideRef = ref({});
      const useStore = create((set) => ({
        state: {
          inject: injectRef,
          provide: {},
          ref: {},
          childrenRef: {},
          [$deletePropsList]: ['provide', 'childrenRef', 'inject', 'render', 'slots', 'emit', $deletePropsList],
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
      const setValue = useStore((state: any) => state.setvalue);

      function scheduler(pluginHooks, ImmutableProps, componentRef) {
        return pluginHooks?.reduce((ImmutableProps, handleFn) => {
          const isMount = !fiberMap.has(handleFn);
          const storeKey = _.uniqueId('storeKey');
          const fiber = isMount
            ? {
                workInProgressState: null,
                workInProgressEffect: null,
                updateQueen: [],
                useStore,
                setValue,
                storeKey,
              }
            : fiberMap.get(handleFn);
          fiberNode.setCurrentFiber(fiber, isMount);
          const result = _.attempt(_.bind(handleFn, fiber), ImmutableProps, {
            componentRef,
            childrenRef,
            ref: myRef.value,
          });
          fiberMap.set(handleFn, fiber);
          return ImmutableProps.merge(result);
        }, ImmutableProps);
      }
      useStore.subscribe((props: any) => {
        const ImmutableProps = imMap({ ...props.props, ...props.state });
        const ImmutableCommit = ImmutableProps.merge({ render: Component });
        const commitState = scheduler(pluginHooks, ImmutableCommit, componentRef);
        const commitJsState = commitState.toJS();
        render.value = commitJsState.render;
        mystate.value.state = _.omit(commitJsState, ['render']);
        Object.assign(myRef.value, commitJsState.ref);
        Object.assign(provideRef.value, commitJsState.provide);
      });
      watch(
        () => [props, attrs, slots, emit],
        (value, oldValue) => {
          if (!_.isEqual(value, oldValue)) {
            const [props, attrs, slots, emit] = value;
            setValue((state) => ({
              props: {
                ...props,
                ...attrs,
                slots,
                emit,
              },
            }));
            const expandProps = useStore() as any;
            Object.assign(myRef.value, expandProps.state.ref);
          }
        },
        { deep: true, immediate: true },
      );

      watch(componentRef, (value) => _.defaults(myRef.value, value));
      watch(childrenRef, (value) => Object.assign(myRef.value, value));
      watch(injectRef, (value) => _.defaults(provideRef.value, value), { deep: true, immediate: true });
      expose(myRef.value);

      provide($provide, provideRef);

      const RenderComponent = render.value ?? Component;

      return () => {
        return (
          <RenderComponent
            {..._.omit(mystate.value.state, mystate.value.state[$deletePropsList])}
            v-slots={{ ...slots, ..._.get(mystate, 'value.state.slots', {}) }}
            ref={componentRef}
          />
        );
      };
    },
  };
}
