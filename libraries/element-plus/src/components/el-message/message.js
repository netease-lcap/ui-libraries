import { ElMessage as Message } from 'element-plus';
import { h } from 'vue';
// import ElIcon from '../el-icon/icon';
// import { setElStyle } from '../../utils/dom';

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
    open() {
      this.openMessage();
    },
    close() {
      this.closeMessage();
    },
    openMessage() {
      if (this.instance) {
        this.closeMessage();
      }
      const vnodes = this.$slots.default ? this.$slots.default() : [];

      if (this.icon) {
        // vnodes.unshift(
        //   h(ElIcon, {
        //     attrs: {
        //       name: this.icon,
        //     },
        //     class: `el-message__icon el-icon-${this.type}`,
        //   }),
        // );
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
        customClass: this.icon ? `el-message--${this.type}` : '',
        onClose: () => {
          this.visible = false;
          this.$emit('update:visible', false);
          this.$emit('close');
        },
      });

      // 使用 Vue 的 nextTick 而不是实例的 nextTick
      this.$nextTick(() => {
        this.$emit('open');
      });
    },
    closeMessage() {
      if (this.instance) {
        const ins = this.instance;
        this.instance = null;
        // 确保 close 方法存在
        if (typeof ins.close === 'function') {
          ins.close();
        }
      }
    },
  },
  render() {
    return null;
  },
};
