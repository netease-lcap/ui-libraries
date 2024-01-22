// Utils
import { createNamespace } from '../utils';

const [createComponent, bem] = createNamespace('toast');

let uid = 0;

export default createComponent({
  props: {
    icon: String,
    className: null,
    iconPrefix: String,
    loadingType: String,
    forbidClick: Boolean,
    closeOnClick: Boolean,
    message: [Number, String],
    type: {
      type: String,
      default: 'text',
    },
    position: {
      type: String,
      default: 'middle',
    },
    transition: {
      type: String,
      default: 'van-fade',
    },
    lockScroll: {
      type: Boolean,
      default: false,
    },
    duration: { type: Number, default: 2000 },

    customIcon: String,
  },

  data() {
    return {
      key: `u-toast-${uid++}`,
    };
  },

  methods: {
    open() {
      const { staticStyle } = this.$vnode.data;

      this.$nextTick(() => {
        this.$toast.openToast({
          key: this.key,
          message: this.message,
          type: this.type,
          duration: this.duration,
          customIcon: this.customIcon,
          onShow: () => {
            this.$emit('open');
          },
          onHide: () => {
            this.$emit('close');
          },
          staticStyle: this.filterCSSVarInStyle(staticStyle),
        });
      })
    },
    close() {
      this.$toast.closeToast(this.key);
    },
    filterCSSVarInStyle(staticStyle) {
      const style = {};
      for (const key in staticStyle) {
        if (Object.prototype.hasOwnProperty.call(staticStyle, key)) {
          if (/^--/.test(key)) {
            const value = staticStyle[key];
            style[key] = value;
          }
        }
      }

      return style;
    },
  },

  render() {
    return null;
  },
});
