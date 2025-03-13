import { defineComponent, watch, onBeforeUnmount } from 'vue';
import { ElLoadingService } from 'element-plus';

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
  },

  setup(props, { expose }) {
    let instance: any = null;

    const closeMessage = () => {
      if (instance) {
        const ins = instance;
        instance = null;
        ins?.close();
      }
    };

    const openMessage = () => {
      if (instance) {
        return;
      }

      instance = ElLoadingService({
        visible: props.visible,
        text: props.text,
        body: props.body,
        fullscreen: props.fullscreen,
        lock: props.lock,
        target: props.target,
        background: props.background,
        svg: props.svg,
        svgViewBox: props.svgViewBox,
        spinner: props.spinner,
      });

      // if (this.$vnode.data.staticStyle && instance.$el) {
      //   setElStyle(this.$vnode.data.staticStyle, instance.$el);
      // }

      // if (this.$vnode.data.style && instance.$el) {
      //   setElStyle(this.$vnode.data.style, instance.$el);
      // }
    };

    watch(
      () => props.visible,
      (val, oldVal) => {
        if (val === oldVal) return;
        if (val) {
          openMessage();
        } else {
          closeMessage();
        }
      },
      { immediate: true },
    );

    onBeforeUnmount(() => {
      closeMessage();
    });

    const open = () => {
      openMessage();
    };

    const close = () => {
      closeMessage();
    };

    expose({
      open,
      close,
    });
    return () => null;
  },
});
