import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  Slot,
} from 'vue';
import './index.css';

export default defineComponent({
  name: 'VanText',

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
      default: 'normal',
    },
  },
  setup(props) {
    const instance = getCurrentInstance();
    const classList = computed(() => {
      return [
        'van-text',
        `van-text--size-${props.size}`,
        `van-text--color-${props.color}`,
        `van-text--display-${props.display}`,
        `van-text--overflow-${props.overflow}`,
      ];
    });

    return () => {
      let content: any = props.text;
      const childrenNodes = instance?.slots.default ? (instance?.slots.default as Slot)() : null;
      if (childrenNodes) {
        content = childrenNodes;
      }
      return h('span', {
        class: classList.value,
      }, [content]);
    };
  },
});
