import { defineComponent, onMounted, watch } from 'vue';
import _ from 'lodash';

export const ElDescriptionsCell = defineComponent({
  name: 'ElDescriptionsCell',
  props: {
    style: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const className = _.uniqueId('el-descriptions__cell');
    onMounted(() => {
      setStyle(props.style, className);
    });

    watch(() => props.style, (newStyle) => {
      setStyle(newStyle, className);
    });

    return () => {
      return <span class={className}></span>;
    };
  },
});

function setStyle(style: Record<string, string>, className: string) {
  const node = document.querySelector(`.${className}`)?.closest('.el-descriptions__cell');
  if (!node || !style) return;
  Object.keys(style).forEach(key => {
    (node as HTMLElement).style[key] = style[key];
  });
}
