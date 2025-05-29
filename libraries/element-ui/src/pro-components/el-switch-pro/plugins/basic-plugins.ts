/* 组件功能扩展插件 */
import { $render, useUpdateSync, type NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { type VNode } from 'vue';
import { type Ref } from '@vue/composition-api';

export const useExtendProps: NaslComponentPluginOptions = {
  props: [
    'width',
    'activeIconClass',
    'inactiveIconClass',
    'activeText',
    'inactiveText',
    'activeValue',
    'inactiveValue',
    'activeColor',
    'inactiveColor',
    'customValue',
  ],
  setup(props) {
    const returnMap = useUpdateSync(props, [{ name: 'value', event: 'change' }]) as { value: Ref<boolean>; onChange: (value: boolean) => void };
    const customValue = props.useComputed(['customValue', 'activeValue', 'inactiveValue'], (customValue, activeValue, inactiveValue) => {
      if (customValue && customValue.length === 2) {
        return customValue;
      }

      return [activeValue ?? true, inactiveValue ?? false];
    });

    const style = props.useComputed(['activeColor', 'inactiveColor', 'width'], (activeColor, inactiveColor, width = '40px') => {
      // 如果 customValue 是数组，则取第一个值, returnMap.value.value 是当前值
      const isActive = returnMap.value.value === customValue.value[0];

      return {
        width: typeof width === 'number' ? `${width}px` : width,
        backgroundColor: isActive ? activeColor : inactiveColor,
      };
    });

    const toggle = () => {
      returnMap.onChange(returnMap.value.value === customValue.value[0] ? customValue.value[1] : customValue.value[0]);
    };

    return {
      ...returnMap,
      customValue,
      style,
      [$render](resultVNode, h, context) {
        const [activeIconClass, inactiveIconClass, activeText, inactiveText] = props.get<string[]>(['activeIconClass', 'inactiveIconClass', 'activeText', 'inactiveText']);

        const content: VNode[] = [];

        const { value, customValue } = context.props as any;

        const [activeValue] = customValue;

        if (inactiveIconClass || inactiveText) {
          content.push(h('div', {
            staticClass: 'el-p-switch__label',
            class: {
              'el-p-switch__label--active': value !== activeValue,
            },
            on: {
              click: toggle,
            },
          }, [
            inactiveIconClass ? h('el-icon', {
              attrs: {
                name: inactiveIconClass,
              }
            }) : h('span', inactiveText),
          ]));
        }

        content.push(resultVNode);

        if (activeIconClass || activeText) {
          content.push(h('div', {
            staticClass: 'el-p-switch__label',
            class: {
              'el-p-switch__label--active': value === activeValue,
            },
            on: {
              click: toggle,
            },
          }, [
            activeIconClass ? h('el-icon', {
              attrs: {
                name: activeIconClass,
              },
            }) : h('span', activeText),
          ]));
        }

        return h('div', {
          staticClass: 'el-p-switch__wrapper',
          attrs: {
            'data-nodepath': context.propsData?.attrs?.['data-nodepath'],
          },
        }, content);
      },
    };
  },
};