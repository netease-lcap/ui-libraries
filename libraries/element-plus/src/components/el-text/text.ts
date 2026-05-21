import { computed, defineComponent, getCurrentInstance, h, Slot, inject, Ref } from 'vue';

import { $provide } from '@/plugins/constants';
import './index.css';

export default defineComponent({
  name: 'ElText',

  props: {
    text: {
      type: String,
    },
    size: {
      type: String,
      default: 'default',
    },
    color: {
      type: String,
      default: 'default',
    },
    display: {
      type: String,
      default: 'inline',
    },
    overflow: {
      type: String,
    },
  },
  setup(props) {
    const instance = getCurrentInstance();
    const provide = inject($provide) as Ref<any>;
    const classList = computed(() => {
      return [
        'el-text',
        'el-text--reset',
        `el-text--size-${props.size}`,
        `el-text--color-${props.color}`,
        `el-text--display-${props.display}`,
        `el-text--overflow-${props.overflow ?? provide?.value?.elTextOverFlow ?? 'normal'}`,
      ];
    });

    return () => {
      let content: any = props.text;
      const childrenNodes = instance?.slots.default ? (instance?.slots.default as Slot)() : null;
      if (childrenNodes) {
        content = childrenNodes;
      }
      return h(
        'span',
        {
          class: classList.value,
        },
        [content],
      );
    };
  },
});
