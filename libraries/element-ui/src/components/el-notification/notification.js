import Notification from 'element-ui/lib/notification';
import { setElStyle } from '../../utils/dom';

export default {
  name: 'ElNotification',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 4500,
    },
    position: {
      type: String,
      default: 'top-right',
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: Number,
      default: 20,
    },
  },
  watch: {
    visible: {
      handler(val, oldVal) {
        if (val === oldVal) {
          return;
        }

        if (val) {
          this.openNotification();
        } else {
          this.closeNotification();
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    this.closeNotification();
  },
  methods: {
    open() {
      this.openNotification();
    },
    close() {
      this.closeNotification();
    },
    openNotification() {
      this.closeNotification();

      const h = this.$createElement;
      const vnodes = this.$scopedSlots.default() || [];
      const message = Array.isArray(vnodes) && vnodes.length > 0 ? h('div', {}, vnodes) : null;

      this.instance = Notification({
        type: this.type,
        title: this.title,
        duration: this.duration,
        showClose: this.showClose,
        offset: this.offset,
        position: this.position,
        iconClass: this.icon ? `el-icon-${this.icon}` : undefined,
        customClass: this.$vnode.data.staticClass,
        message,
        onClick: () => {
          this.$emit('click');
        },
        onClose: () => {
          this.visible = false;
          this.$emit('update:visible', false);
          this.$emit('close');
        },
      });

      if (this.$vnode.data.staticStyle && this.instance.$el) {
        setElStyle(this.$vnode.data.staticStyle, this.instance.$el);
      }

      if (this.$vnode.data.style && this.instance.$el) {
        setElStyle(this.$vnode.data.style, this.instance.$el);
      }

      this.instance.$nextTick(() => {
        this.$emit('open');
      });
    },
    closeNotification() {
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
