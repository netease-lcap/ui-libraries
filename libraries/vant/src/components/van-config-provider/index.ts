import { defineComponent, h } from 'vue';

export const VanConfigProvider = defineComponent({
  name: 'VanConfigProvider',
  props: {
    theme: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    return () => h('div', null, props.theme);
  },
});

export default VanConfigProvider;
