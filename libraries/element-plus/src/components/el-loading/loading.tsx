import { defineComponent, ref } from 'vue';

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
  setup(props) {
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
    return {
      loadingConfig,
    };
  },
  render() {
    return (
      <div
        v-loading={this.visible ? this.loadingConfig : false}
      >
        {this.$slots.default?.()}
      </div>
    );
  },
});
