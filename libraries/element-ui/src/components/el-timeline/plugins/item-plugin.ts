import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import ElIcon from '../../el-icon';

export const useIcon: NaslComponentPluginOptions = {
  props: ['dotStyle'],
  setup({ get: propGet, useComputed }, { h }) {
    const currentBackgroundColor = useComputed(['dotStyle', 'color'], (dotStyle, colorValue) => {
      const iconAttr = propGet('icon');
      if (!iconAttr && dotStyle) {
        return dotStyle.backgroundColor;
      }
      return colorValue;
    });
    return {
      color: currentBackgroundColor,
      slotDot: () => {
        const iconAttr = propGet('icon');
        if (!iconAttr) {
          return null;
        }
        const size = propGet('size') || 'normal';
        const type = propGet('type');
        const colorAttr = propGet('color');
        let dotStyle = propGet<any>('dotStyle');
        if (dotStyle === undefined) {
          dotStyle = { color: 'white' };
        }
        dotStyle.color = dotStyle.color ?? 'white';
        dotStyle.backgroundColor = dotStyle.backgroundColor ?? colorAttr;
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
