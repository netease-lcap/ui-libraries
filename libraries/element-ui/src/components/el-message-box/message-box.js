import MessageBox from 'element-ui/lib/message-box';

export default {
  name: 'ElMessageBox',
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
      default: 'alert',
    },
    iconType: {
      type: String,
      default: '',
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    roundButton: {
      type: Boolean,
      default: false,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    showCancelButton: {
      type: Boolean,
      default: false,
    },
    showConfirmButton: {
      type: Boolean,
      default: true,
    },
    cancelButtonText: {
      type: String,
      default: '取消',
    },
    confirmButtonText: {
      type: String,
      default: '确定',
    },
    inputPlaceholder: {
      type: String,
    },
    inputType: {
      type: String,
      default: 'text',
    },
    inputValue: {
      type: String,
    },
    rules: {
      type: Array,
    },
  },
  watch: {
    visible: {
      handler(val, oldVal) {
        if (val === oldVal) {
          return;
        }

        if (val) {
          this.openMessageBox();
        } else {
          this.closeMessageBox();
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    this.closeMessageBox();
  },
  methods: {
    async openMessageBox() {
      const h = this.$createElement;
      const vnodes = this.$scopedSlots.default() || [];
      const message = Array.isArray(vnodes) && vnodes.length > 0 ? h('div', {}, vnodes) : null;

      MessageBox({
        title: this.title,
        message,
        type: this.iconType,
        $type: this.type,
        showClose: this.showClose,
        center: this.center,
        roundButton: this.roundButton,
        lockScroll: this.lockScroll,
        distinguishCancelAndClose: true,
        showCancelButton: this.showCancelButton,
        showConfirmButton: this.showConfirmButton,
        cancelButtonText: this.cancelButtonText,
        confirmButtonText: this.confirmButtonText,
        inputPlaceholder: this.inputPlaceholder,
        inputType: this.inputType,
        inputValue: this.inputValue,
        showInput: this.type === 'prompt',
        closeOnPressEscape: this.type !== 'alert',
        closeOnClickModal: this.type !== 'alert',
        customClass: this.$vnode.data.staticClass,
      }).then(({ value }) => {
        this.$emit('update:visible', false);
        this.$emit('confirm', value);
      }).catch((action) => {
        if (action === 'cancel') {
          this.$emit('cancel');
        }

        this.$emit('update:visible', false);
        this.$emit('close');
      });
      this.opened = true;
    },
    closeMessageBox() {
      if (!this.opened) {
        return;
      }
      this.opened = false;
      MessageBox.close();
    },
  },
  render() {
    return null;
  },
};
