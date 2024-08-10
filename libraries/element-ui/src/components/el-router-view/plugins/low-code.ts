import { inject } from '@vue/composition-api';
import { $render, NaslComponentPluginOptions } from '@lcap/nasl-hoc-vue/index';
import styles from '../index.module.css';

/* 仅在 ide 环境生效的插件 */
export const useLowcodePlaceholder: NaslComponentPluginOptions = {
  setup: () => {
    const inAbsolutedLayout = inject('inAbsoluteLayout') || false;
    return {
      [$render]: (resultVnode, h) => {
        const absoluteTip = h('div', { class: styles.tooltip }, [
          h('span', { class: styles.tooltipIcon }),
          h('span', '温馨提示'),
          h('div', { class: styles.tooltipContent }, [
            h('div', '自由布局中子组件相互独立。若希望下方内容位置随子页面发布后实际高度变化，可将其放入自由布局容器，再将容器和子页面设置为“纵向线性布局”。'),
            h('div', { class: styles.tipImg }),
          ]),
        ]);

        return h('div', {
          class: styles.fake,
        }, [
          h('div', { class: styles.fakeRouter }, [resultVnode]),
          h('div', { class: styles.fakeEmpty }, [
            h('span', ['此容器为子页面呈现占位，可在子页面编辑内容']),
            inAbsolutedLayout ? absoluteTip : null,
          ]),
        ]);
      },
    };
  },
  onlyUseIDE: true,
};
