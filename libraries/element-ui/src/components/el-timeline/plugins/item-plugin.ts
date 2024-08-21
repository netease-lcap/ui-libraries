import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import ElIcon from '../../el-icon';

export const useIcon: NaslComponentPluginOptions = {
  props: ['dotStyle'],
  setup({ get: propGet }, { h }) {
    return {
      slotDot: () => {
        const iconAttr = propGet('icon');
        if (!iconAttr) {
          return null;
        }
        const size = propGet('size') || 'normal';
        const type = propGet('type');
        const dotStyle = propGet<any>('dotStyle');
        return h('div', {
          class: {
            'el-timeline-item__node': true,
            [`el-timeline-item__node--${size}`]: true,
            [`el-timeline-item__node--${type}`]: true,
          },
          style: {
            top: 0,
            ...dotStyle,
          },
        }, [h(ElIcon, {
          attrs: { name: iconAttr },
        })]);
      },
    };
  },
};
