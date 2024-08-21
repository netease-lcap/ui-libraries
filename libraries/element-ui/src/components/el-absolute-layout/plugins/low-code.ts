/* 仅在 ide 环境生效的插件 */
import { computed, provide } from '@vue/composition-api';
import { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/index';
import styles from '../index.module.css';

export const useLowcodeEmtpyTip: NaslComponentPluginOptions = {
  setup: (props, { h }) => {
    provide('inAbsoluteLayout', 'true');
    const emptyClass = computed(() => {
      const slotDefault = props.get('slotDefault');
      const defaultContent = typeof slotDefault === 'function' ? slotDefault() : null;
      if (!defaultContent || (Array.isArray(defaultContent) && defaultContent.length === 0)) {
        return styles.empty;
      }

      return '';
    });
    return {
      'vusion-slot-name': 'default',
      class: emptyClass,
      slotDefault: () => {
        const slotDefault = props.get('slotDefault');
        const defaultContent = typeof slotDefault === 'function' ? slotDefault() : null;
        if (!defaultContent || (Array.isArray(defaultContent) && defaultContent.length === 0)) {
          return h('div', { class: styles.emptyTip }, '拖入组件放至任意位置');
        }

        return defaultContent;
      },
    };
  },
  order: 11,
  onlyUseIDE: true,
};
