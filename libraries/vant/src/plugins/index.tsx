/* eslint-disable class-methods-use-this */

import { ref, Ref, watch, provide, inject, defineComponent, unref, getCurrentInstance, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// import create from 'zustand-vue';
import { createStore } from 'zustand/vanilla';

import { Map as imMap } from 'immutable';
import _ from 'lodash';
import fp from 'lodash/fp';
import { $deletePropsList, $provide, $tagName, $router, $route, $mergeRef } from '@/plugins/constants';
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

export function registerComponent(Component, options) {
  return defineComponent({
    name: options.name || 'HocBaseComponents',
    components: { Component },
    inheritAttrs: false,
    props: Component.props,

    setup(props, { attrs, slots, emit, expose }) {
      const plugin = new PluginOptions(options);
      const pluginHooks = plugin.getPluginMethod();
      const componentState = ref({ state: {} });
      let Render = Component;
      const exposeRef = ref({}) as Ref<any>;
      const injectRef = inject($provide) ?? (ref({}) as Ref<any>);
      const provideRef = ref({}) as Ref<any>;
      Object.assign(provideRef.value, (injectRef as any)?.value || {});
      const router = useRouter?.();
      const route = useRoute?.();
      const useStore = createStore((set) => ({
        state: {
          inject: injectRef,
          provide: {},
          ref: {},
          [$router]: router,
          [$route]: route,
          'data-component-name': options.name,
          [$mergeRef]: _.mergeRef(exposeRef.value),
          [$tagName]: options.name,
          [$deletePropsList]: ['provide', 'inject', 'render', 'slots', 'emit', $deletePropsList, $mergeRef, $tagName],
        },
        props: {
          ...props,
          ...attrs,
          emit,
          slots,
        },

        setValue: (commit, tr) => {
          const getNewStateFn = _.cond([
            [_.isFunction, _.identity],
            [_.isPlainObject, (state) => (store) => ({ state: { ...store.state, ...state } })],
            [_.stubTrue, _.constant],
          ])(commit) as any;
          return set((state) => getNewStateFn(state), tr);
        },
      }));
      const { getState, subscribe } = useStore;
      const fiberMap = new Map<string, any>([
        ['updateQueen', new Set()],
        ['getState', getState],
      ]);
      const { setValue } = getState() as any;

      // 保存取消订阅函数，用于组件卸载时清理
      const unsubscribe = subscribe((props: any) => {
        const ImmutableProps = imMap({ ...props.props, ...props.state, ref: exposeRef.value, render: Component });
        const commitState = scheduler(pluginHooks, ImmutableProps, fiberMap);
        const ref = commitState.get('ref');
        const commitJsState = commitState.delete('ref').toJS();
        const isRenderChange = Render !== commitState.get('render');
        Render = isRenderChange ? commitJsState.render : Render;
        componentState.value.state = _.omit(commitJsState, ['render', 'ref']);
        _.assign(exposeRef.value, ref);
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

      watch(injectRef, (value) => _.defaults(provideRef.value, value), { immediate: true });
      expose(exposeRef.value);

      // 组件卸载时清理资源，防止内存泄露
      onBeforeUnmount(() => {
        // 1. 取消 zustand store 订阅
        unsubscribe?.();

        // 2. 清理 fiberMap 中的 Fiber 对象和 Hook 链表
        const updateQueen = fiberMap.get('updateQueen');
        if (updateQueen instanceof Set) {
          updateQueen.clear();
        }

        // 遍历 fiberMap，清理每个 fiber 中的 Hook 链表
        fiberMap.forEach((value, key) => {
          if (key !== 'updateQueen' && key !== 'getState' && typeof value === 'object') {
            const fiber = value;

            // 清理 workInProgressState Hook 链表
            if (fiber.workInProgressState) {
              let current = fiber.workInProgressState;
              const visited = new Set();
              // 断开循环链表
              while (current && !visited.has(current)) {
                visited.add(current);
                const { next } = current;
                current.next = null;
                current.storeKey = null;
                current.value = null;
                current = next;
              }
              fiber.workInProgressState = null;
            }

            // 清理 workInProgressEffect Hook 链表
            if (fiber.workInProgressEffect) {
              let current = fiber.workInProgressEffect;
              const visited = new Set();
              // 断开循环链表
              while (current && !visited.has(current)) {
                visited.add(current);
                const { next } = current;
                current.next = null;
                current.dep = null;
                current.result = null;
                current.callBack = null;
                current = next;
              }
              fiber.workInProgressEffect = null;
            }

            // 清理 fiber 对象的其他引用
            fiber.updateQueen = null;
            fiber.getState = null;
            fiber.setValue = null;
            fiber.queen = null;
          }
        });

        fiberMap.clear();

        // 3. 清理 exposeRef 中的引用
        if (exposeRef.value && typeof exposeRef.value === 'object') {
          Object.keys(exposeRef.value).forEach((key) => {
            delete exposeRef.value[key];
          });
        }

        // 4. 清理 componentState
        if (componentState.value?.state) {
          componentState.value.state = {};
        }

        // 5. 清理 Render 引用
        Render = null;
      });

      provide($provide, provideRef);
      return () => {
        return (
          <Render
            {..._.omit(componentState.value.state, componentState.value.state[$deletePropsList])}
            v-slots={{ ...slots, ..._.get(componentState, 'value.state.slots', {}) }}
            ref={_.mergeRef(exposeRef.value)}
          />
        );
      };
    },
  });
}
