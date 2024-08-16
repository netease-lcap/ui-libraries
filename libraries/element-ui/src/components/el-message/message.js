import Message from 'element-ui/lib/message';
import ElIcon from '../el-icon/icon';

export default {
  name: 'ElMessage',
  props: {
    duration: {
      type: Number,
      default: 3000,
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: Number,
      default: 20,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'info',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  watch: {
    visible: {
      handler(val, oldVal) {
        if (val === oldVal) {
          return;
        }

        if (val) {
          this.openMessage();
        } else {
          this.closeMessage();
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    this.closeMessage();
  },
  methods: {
    openMessage() {
      if (this.instance) {
        this.closeMessage();
      }
      const h = this.$createElement;
      const vnodes = this.$scopedSlots.default() || [];

      if (this.icon) {
        vnodes.unshift(
          h(ElIcon, {
            attrs: {
              name: this.icon,
            },
            class: `el-message__icon el-icon-${this.type}`,
          }),
        );
      }

      const message = h('div', {
        class: 'el-message__content',
      }, vnodes);

      this.instance = Message({
        duration: this.duration,
        showClose: this.showClose,
        center: this.center,
        offset: this.offset,
        message,
        type: this.type,
        iconClass: this.icon ? 'el-message--custom-icon' : '',
        customClass: this.icon ? `el-message--${this.type} ${this.$vnode.data.staticClass}` : this.$vnode.data.staticClass,
        onClose: () => {
          this.visible = false;
          this.$emit('update:visible', false);
          this.$emit('close');
        },
      });

      if (this.$vnode.data.staticStyle && this.instance.$el) {
        const exclude = [
          'zIndex', 'postion', 'left', 'right', 'top', 'bottom',
        ];

        Object.keys(this.$vnode.data.staticStyle).forEach((key) => {
          if (exclude.includes(key)) {
            return;
          }

          this.instance.$el.style[key] = this.$vnode.data.staticStyle[key];
        });
      }

      this.instance.$nextTick(() => {
        this.$emit('open');
      });
    },
    closeMessage() {
      if (this.instance) {
        const ins = this.instance;
        this.instance = null;
        ins.close();
      }
    },
  },
  render() {
    return null;
  },
};
