/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
import {
  ref, Ref, defineProps, watch, provide, inject,
} from 'vue';
import { ElForm as ElFormPlus } from 'element-plus';
import create from 'zustand-vue';
import { Map as imMap } from 'immutable';
import _ from 'lodash';
import fp from 'lodash/fp';
import { $deletePropsList } from '@/plugins/constants';
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
    // setup(props, { attrs, slots, emit, expose }) {
    //   const componentRef = ref(null);
    //   expose({
    //     mystate: () => {
    //       console.log('res');
    //       componentRef.value.resetFields();
    //     },
    //   });
    //   return () => {
    //     return <Component {...props} v-slots={slots} v-on={emit} ref={componentRef} />;
    //   };
    // },

    setup(props, {
      attrs, slots, emit, expose,
    }) {
      const componentRef = ref(null);
      const plugin = new PluginOptions(options);
      const pluginHooks = plugin.getPluginMethod();
      const mystate = ref({ state: { render: () => {} } });
      const fiberMap = new Map();
      const myRef = ref({});
      const childrenRef = ref({});
      const injectRef = inject('provide') as Ref;
      const provideRef = ref({});
      let queen: any[] = [];
      const useStore = create((set) => ({
        state: {
          ...props,
          ...attrs,
          emit,
          slots,
          inject: injectRef,
          provide: {},
          ref: {},
          childrenRef: {},
          [$deletePropsList]: [],
          render: Component,
        },

        // ...attrs,
        // emit,
        setvalue: (commit, tr) => {
          const getNewStateFn = _.cond([
            [_.isFunction, _.identity],
            [_.isPlainObject, (state) => (store) => ({ state: { ...store.state, ...state } })],
            [_.stubTrue, _.constant],
          ])(commit) as any;
          return set((state) => getNewStateFn(state), tr);
        },
        deleteList: ['deleteList'],
      }));
      const setValue = useStore((state: any) => state.setvalue);
      function useState(this: any, isMount, initialstate) {
        let hook;
        if (isMount) {
          hook = {
            next: null,
            storeKey: Symbol('storeKey'),
          };
          hook.next = hook;
          if (this.workInProgressState) {
            hook.next = this.workInProgressState.next;
            this.workInProgressState.next = hook;
          }
          this.workInProgressState = hook;
        } else {
          hook = this.workInProgressState.next;
          this.workInProgressState = this.workInProgressState.next;
        }
        const state = this.useStore((store) => store.state[hook?.storeKey] ?? initialstate);
        const localSetValue = (value) => {
          if (_.isEqual(value, state.value)) {
            return;
          }
          if (_.isFunction(value)) {
            const state = this.useStore((store) => store.state[hook?.storeKey] ?? initialstate);
            value = value(state);
          }
          queen.push({ [hook.storeKey]: value });
          _.defer(() => {
            if (!_.isEmpty(queen)) {
              const comit = queen.reduce((pre, cur) => ({ ...pre, ...cur }), {});
              setValue(comit);
              queen = [];
            }
          }, queen);
        };
        return [state?.value ?? state, localSetValue];
      }
      function useEffect(this: any, isMount, callBack, dep) {
        let hook;
        if (isMount) {
          hook = {
            next: null,
            dep,
            result: null,
          };
          hook.next = hook;
          if (this.workInProgressEffect) {
            hook.next = this.workInProgressEffect.next;
            this.workInProgressEffect.next = hook;
          }
          this.workInProgressEffect = hook;
          hook.result = callBack();
        } else {
          hook = this.workInProgressEffect.next;
          this.workInProgressEffect = this.workInProgressEffect.next;
        }
        const isSameDep = _.every(dep, (item, index) => Object.is(item, _.get(hook, `dep.${index}`)));
        // const isInvokeCallBack = !_.isEmpty(dep) && !isSameDep;
        // const result = isInvokeCallBack ? [callBack(), dep] : [hook.result, hook.dep];
        // [hook.result, hook.dep] = result;
        if (!_.isEmpty(dep) && !isSameDep) {
          hook.result = callBack();
          hook.dep = dep;
        }
        return hook.result;
      }
      function scheduler(pluginHooks, ImmutableProps, componentRef) {
        return pluginHooks?.reduce((ImmutableProps, handleFn) => {
          const isMount = !fiberMap.has(handleFn);
          const storeKey = _.uniqueId('storeKey');
          const fiber = isMount
            ? {
              workInProgressState: null,
              workInProgressEffect: null,
              useStore,
              setValue,
              storeKey,
            }
            : fiberMap.get(handleFn);
          const localUseState = _.bind(useState, fiber, isMount);
          const localUseEffect = _.bind(useEffect, fiber, isMount);
          const result = _.attempt(_.bind(handleFn, fiber), ImmutableProps, {
            useState: localUseState,
            useEffect: localUseEffect,
            useMemo: localUseEffect,
            componentRef,
            childrenRef,
            ref: myRef.value,
          });
          fiberMap.set(handleFn, fiber);
          return ImmutableProps.merge(result);
        }, ImmutableProps);
      }
      useStore.subscribe((props: any, pre) => {
        const ImmutableProps = imMap(props.state);
        const commitState = scheduler(pluginHooks, ImmutableProps, componentRef);
        const commitJsState = commitState.toJS();
        Object.assign(mystate.value.state, commitJsState);
        Object.assign(myRef.value, commitJsState.ref);
        Object.assign(provideRef.value, commitJsState.provide);
      });
      watch(
        () => [props, attrs, slots, emit],
        ([props, attrs, slots, emit]) => {
          setValue({
            ..._.filterUnderfinedValue(props),
            ..._.filterUnderfinedValue(attrs),
            // ...props,
            // ...attrs,
            slots,
            emit,
          });
          const expandProps = useStore() as any;
          _.defaults(mystate.value.state, expandProps.state);
          Object.assign(myRef.value, expandProps.state.ref);
        },
        { deep: true, immediate: true },
      );
      watch(componentRef, (value) => Object.assign(myRef.value, value));
      watch(childrenRef, (value) => Object.assign(myRef.value, value));
      watch(injectRef, (value) => _.defaults(provideRef.value, value), { deep: true, immediate: true });
      expose(myRef.value);

      provide('provide', provideRef);
      // [1, 2, 3].forEach((el) => {
      //   provide(`provide${el}`, `mypro${el}`);
      // });
      // [1, 2, 3].forEach((el) => {
      //   const a = inject(`provide${el}`);
      //   console.log(a, 'loginject');
      // });
      const RenderComponent = mystate.value.state.render ?? Component;

      return () => {
        // const expandProps = useStore() as any;
        if (mystate.value.state.name === 'formItem') {
          console.log(mystate.value.state, 'mystate.value.state');
        }

        return (
          <RenderComponent
            {..._.omit(mystate.value.state, mystate.value.state[$deletePropsList])}
            v-slots={{ ...slots, ..._.get(mystate, 'value.state.slots', {}) }}
            // onInput={(el) => {
            //   if (injectRef) {
            // setTimeout(() => {
            // injectRef.value.mystate.state.model.input = el;
            // }, 10);
            // }
            // }}
            v-on={emit}
            ref={componentRef}
          />
        );
      };
    },
  };
}
