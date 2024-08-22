import type { VNode } from 'vue';
import type { NaslComponentPluginOptions, Slot } from '@lcap/vue2-utils/plugins/types';
import { isShallowEqualArray } from '@lcap/vue2-utils/plugins/utils';
import { shallowRef, watch } from '@vue/composition-api';
import Step from 'element-ui/lib/step';
import { $ref } from '@lcap/vue2-utils';
import { isNil, at } from 'lodash';
import ElIcon from '../../el-icon';

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils';

const STEP_NAME_PREFIX = '__STEP__';

/* 组件功能扩展插件 */
export const useExtendsPlugin: NaslComponentPluginOptions = {
  setup: (props, { h }) => {
    const settedDataSouce = props.useComputed('dataSource', (v) => {
      return !isNil(v) && (typeof v === 'function' || Array.isArray(v) || Array.isArray(v.list));
    });
    const namesRef = shallowRef<string[]>([]);
    const activeRef = props.useRef('active', (v) => {
      if (isNil(v)) {
        return 0;
      }
      if (typeof v === 'number') {
        return v;
      }

      const activeIndex = namesRef.value.indexOf(v);
      return activeIndex === -1 ? 0 : activeIndex;
    });

    watch(namesRef, (val: string[], oldValue: string[]) => {
      const active = props.get<string | number>('active');
      if (isShallowEqualArray(val, oldValue) || typeof active === 'number' || isNil(active)) {
        return;
      }

      const activeIndex = val.indexOf(active);

      activeRef.value = activeIndex === -1 ? 0 : activeIndex;
    });

    const updateSyncActive = () => {
      let value: any = namesRef.value[activeRef.value];
      if (isNil(value) || (typeof value === 'string' && value.startsWith(STEP_NAME_PREFIX))) {
        value = activeRef.value;
      }

      const onUpdateValue = props.get('update:value');
      const onChange = props.get('onChange');
      if (typeof onUpdateValue === 'function') {
        onUpdateValue(value);
      }

      if (typeof onChange === 'function') {
        onChange(value);
      }
    };

    const prevStep = () => {
      if (activeRef.value === 0) {
        return;
      }
      activeRef.value -= 1;
      updateSyncActive();
    };

    const nextStep = () => {
      if (namesRef.value.length === activeRef.value) {
        return;
      }
      activeRef.value += 1;
      updateSyncActive();
    };

    const renderDataSource = () => {
      const data = props.get<any[]>('data');
      const nameField = props.get<string>('nameField');
      const slotTitle = props.get<Slot | null>('slotTitle') || (() => []);
      const slotDescription = props.get<Slot | null>('slotDescription') || (() => []);
      const names: string[] = [];
      const vnodes = data.map((it, i) => {
        const current = {
          item: it,
          index: i,
          rowIndex: i,
        };
        const [name] = at(it, nameField);
        names.push(name);
        const childrenNodes: VNode[] = [];
        const titleVNodes = slotTitle(current);
        const descriptionVNodes = slotDescription(current);

        if (titleVNodes.length > 0) {
          childrenNodes.push(
            h('template', { slot: 'title' }, titleVNodes),
          );
        }

        if (descriptionVNodes.length > 0) {
          childrenNodes.push(
            h('template', { slot: 'escription' }, descriptionVNodes),
          );
        }

        return h(Step, {}, childrenNodes);
      });
      namesRef.value = names;
      return vnodes;
    };

    const renderSlots = () => {
      const slotDefault = props.get<Slot | null>('slotDefault');
      if (!slotDefault) {
        return [];
      }

      const vnodes = slotDefault();
      const names: string[] = [];
      let index = 0;
      vnodes.forEach((vnode) => {
        if (!vnode.componentOptions || !vnode.componentOptions.tag || !vnode.componentOptions.tag.endsWith('-step')) {
          return;
        }

        const { attrs = {} } = vnode.data || {};
        const { propsData } = vnode.componentOptions;

        if (attrs.name) {
          names.push(attrs.name);
        } else {
          names.push(`${STEP_NAME_PREFIX}${index++}`);
        }

        if (!propsData) {
          return;
        }

        const vnodeProps = propsData as Record<string, any>;

        if (vnodeProps.icon && !vnodeProps.icon.startsWith('el-')) {
          const { icon } = vnodeProps;
          // delete vnodeProps.icon;
          if (!vnode.componentOptions.children) {
            vnode.componentOptions.children = [];
          }

          if (!vnode.data) {
            vnode.data = {};
          }

          if (!vnode.data.scopedSlots) {
            vnode.data.scopedSlots = {};
          }

          vnode.data.scopedSlots.icon = () => {
            return [h(ElIcon, {
              attrs: {
                name: icon,
              },
              class: 'el-step__icon-inner',
            })];
          };
        }
      });

      namesRef.value = names;

      return vnodes;
    };

    return {
      active: activeRef,
      slotDefault: () => {
        if (settedDataSouce.value) {
          return renderDataSource();
        }

        return renderSlots();
      },
      [$ref]: {
        prev: prevStep,
        next: nextStep,
      },
    };
  },
};
