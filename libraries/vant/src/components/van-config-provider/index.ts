import { defineComponent, h } from 'vue';

export const ConfigProvider = defineComponent({
  name: 'ConfigProvider',
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

export default ConfigProvider;
