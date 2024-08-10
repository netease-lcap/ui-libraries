/* 组件功能扩展插件 */
import { $deletePropList, $ref } from '@lcap/nasl-hoc-vue/index';
import { createProp2Default } from '@lcap/nasl-hoc-vue/common/text';
import type { NaslComponentPluginOptions, Slot } from '@lcap/nasl-hoc-vue/plugin';
import ElIcon from '../../el-icon';
import { isEmptyVNodes } from '@/utils/vnode';

export const useText2Default = createProp2Default('text');

export const useIcon: NaslComponentPluginOptions = {
  props: ['iconPosition'],
  order: 10,
  setup(props, { h }) {
    return {
      slotDefault: () => {
        const slotDefault = props.get<Slot>('slotDefault');
        const icon = props.get<string>('icon');
        const iconPosition = props.get<string>('iconPosition');

        if (!icon) {
          return slotDefault();
        }

        const iconNode = h(ElIcon, { attrs: { name: icon }, class: 'el-icon-ri' });
        const vnodes = slotDefault ? slotDefault() : [];

        if (isEmptyVNodes(vnodes)) {
          return iconNode;
        }

        if (iconPosition === 'right') {
          return [h('span', vnodes), iconNode];
        }
        return [iconNode, h('span', vnodes)];
      },
      [$deletePropList]: ['icon'],
    };
  },
};

export const useSetLoading: NaslComponentPluginOptions = {
  setup: (props) => {
    const loading = props.useRef<boolean>('loading');

    return {
      loading,
      [$ref]: {
        startLoading: () => {
          loading.value = true;
        },
        closeLoading: () => {
          loading.value = false;
        },
      },
    };
  },
};
