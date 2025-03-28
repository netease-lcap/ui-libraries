import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'ElLoading',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    target: {
      type: String,
    },
    body: {
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: true,
    },
    lock: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
    },
    background: {
      type: String,
    },
    spinner: {
      type: String,
    },
    svg: {
      type: String,
    },
    svgViewBox: {
      type: String,
    },
    customClass: {
      type: String,
    },
  },
  setup(props, { slots, expose }) {
    const isVisible = ref(false);
    const loadingConfig = ref({
      body: props.body,
      fullscreen: props.fullscreen,
      lock: props.lock,
      text: props.text,
      background: props.background,
      spinner: props.spinner,
      svg: props.svg,
      svgViewBox: props.svgViewBox,
      customClass: props.customClass,
    });

    const show = () => {
      isVisible.value = true;
    };

    const hide = () => {
      isVisible.value = false;
    };

    // 监听 visible prop 的变化
    watch(() => props.visible, (newVal) => {
      isVisible.value = newVal;
    }, { immediate: true });

    expose({
      show,
      hide,
    });

    return () => (
      <div
        v-loading={isVisible.value ? loadingConfig.value : false}
      >
        {slots.default?.()}
      </div>
    );
  },
});
