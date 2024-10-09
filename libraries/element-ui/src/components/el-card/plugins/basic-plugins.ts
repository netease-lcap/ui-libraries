/* 组件功能扩展插件 */

import { $ref, $render, createUseUpdateSync } from '@lcap/vue2-utils';

import { CreateElement } from 'vue';

const a = {
  value: '123',
  update: (value) => {},
};
export const useCard = {
  setup(props, ctx) {
    function WithConsole(WrappedComponent) {
      console.log(WrappedComponent, 'WrappedComponent');
      return {
        mounted() {
          console.log('I have already mounted=======');
        },
        props: WrappedComponent.props,
        render(h) {
          // const slots = Object.keys(this.$slots)
          //   .reduce((arr, key) => arr.concat(this.$slots[key]), [])
          //   .map((vnode) => {
          //     vnode.context = this._self;
          //     return vnode;
          //   });

          return WrappedComponent;
        },
      };
    }

    return {
      [$render](resultVNode) {
        const node = ctx.setupContext.slots.default();

        if (node[0].componentOptions.propsData.value) {
          // node[0].componentOptions.propsData.value = a.value;
          a.value = node[0].componentOptions.propsData.value;
          a.update = (value) => {
            // a.value = value;
            // node[0].componentOptions.propsData.value = value;
            // node[0].componentInstance.$emit('myevent', '123');
            node[0].componentInstance.$emit('update:value', value);
            // node[0].componentOptions.Ctor.listeners.input(value);
            // node[0].context.$forceUpdate();
          };
        }
        setTimeout(() => {
          a.update('444');
        }, 0);
        const { input } = node[0].componentOptions.listeners;

        node[0].componentOptions.listeners.input = (value) => {
          console.log(input(value));
          a.value = value;
        };
        // const mynode = vnodes.map((el) => WithConsole(el));
        // console.log(WithConsole(vnodes[0]));
        resultVNode.componentOptions.children = node;

        return resultVNode;
      },
      [$ref]: {
        valueChange(value) {
          a.value = value;
          a.update(value);
        },
        getValue() {
          return a.value;
        },
      },
    };
  },
};
