/* 组件功能扩展插件 */
import { $deletePropList, $ref } from '@lcap/vue2-utils/plugins/index';
import { createProp2Default } from '@lcap/vue2-utils/plugins/common/text';
import type { NaslComponentPluginOptions, Slot } from '@lcap/vue2-utils/plugins/types';
import ElIcon from '../../el-icon';
import { isEmptyVNodes } from '@/utils/vnode';
import styles from '../index.module.css';

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

        const iconNode = h(ElIcon, { attrs: { name: icon } });
        const vnodes = slotDefault ? slotDefault() : [];

        if (isEmptyVNodes(vnodes)) {
          return iconNode;
        }

        if (iconPosition === 'right') {
          if (!iconNode.data) {
            iconNode.data = {};
          }

          iconNode.data.class = 'el-icon--right';
          return h('span', { class: styles.spanwrap }, [
            h('span', vnodes),
            iconNode,
          ]);
        }
        return h('span', { class: styles.spanwrap }, [iconNode, h('span', vnodes)]);
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

export const useSetSize: NaslComponentPluginOptions = {
  setup: (props) => {
    const currentSize = props.useComputed(['size'], (size) => {
      return size || 'small';
    });
    return {
      size: currentSize,
    };
  },
};
