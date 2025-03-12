import { defineComponent, watch, onBeforeUnmount, ref, PropType } from 'vue';
import { ElMessageBox as ElMessageBoxPlus, MessageBoxInputValidator, ComponentSize } from 'element-plus';

type MessageType = '' | 'alert' | 'confirm' | 'prompt';
type IconType = '' | 'success' | 'info' | 'warning' | 'error';

export default defineComponent({
  name: 'ElMessageBox',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String as PropType<MessageType>,
      default: 'alert',
    },
    iconType: {
      type: String as PropType<IconType>,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    closeIcon: {
      type: String,
      default: '',
    },
    showClose: {
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
    cancelButtonLoadingIcon: {
      type: String,
      default: '',
    },
    confirmButtonLoadingIcon: {
      type: String,
      default: '',
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
    inputPattern: {
      type: [Object, undefined] as PropType<RegExp | undefined>,
    },
    inputValidator: {
      type: Function as PropType<MessageBoxInputValidator>,
    },
    inputErrorMessage: {
      type: String,
      default: '输入的数据不合法!',
    },
    center: {
      type: Boolean,
      default: false,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    overflow: {
      type: Boolean,
      default: false,
    },
    roundButton: {
      type: Boolean,
      default: false,
    },
    buttonSize: {
      type: String as PropType<ComponentSize>,
      default: 'default',
    },
  },

  setup(props, { slots, emit, expose }) {
    const opened = ref(false);

    const closeMessageBox = () => {
      if (!opened.value) {
        return;
      }
      opened.value = false;
      ElMessageBoxPlus.close();
    };

    const openMessageBox = async () => {
      const vnodes = slots.default?.() || [];
      const message = vnodes.length > 0 ? <div>{vnodes}</div> : null;

      try {
        const { value } = await ElMessageBoxPlus({
          boxType: props.type,
          type: props.iconType,
          title: props.title,
          message,
          autofocus: props.autofocus,
          cancelButtonText: props.cancelButtonText,
          confirmButtonText: props.confirmButtonText,
          cancelButtonLoadingIcon: props.cancelButtonLoadingIcon,
          confirmButtonLoadingIcon: props.confirmButtonLoadingIcon,
          center: props.center,
          draggable: props.draggable,
          overflow: props.overflow,
          icon: props.icon,
          distinguishCancelAndClose: true,
          lockScroll: props.lockScroll,
          showCancelButton: props.showCancelButton,
          showConfirmButton: props.showConfirmButton,
          showClose: props.showClose,
          roundButton: props.roundButton,
          closeOnPressEscape: props.type !== 'alert',
          closeOnClickModal: props.type !== 'alert',
          showInput: props.type === 'prompt',
          inputPlaceholder: props.inputPlaceholder,
          inputType: props.inputType,
          inputValue: props.inputValue,
          inputPattern: props.inputPattern ? new RegExp(props.inputPattern) : undefined,
          inputValidator: props.inputValidator,
          inputErrorMessage: props.inputErrorMessage,
          buttonSize: props.buttonSize,
          // customClass: getCurrentInstance()?.vnode?.data?.staticClass,
        });

        emit('update:visible', false);
        emit('confirm', value);
        emit('close');
      } catch (action) {
        if (action === 'cancel') {
          emit('cancel');
        }
        emit('update:visible', false);
        emit('close');
      }
      opened.value = true;
    };

    const open = () => {
      openMessageBox();
    };

    const close = () => {
      closeMessageBox();
    };

    watch(
      () => props.visible,
      (val, oldVal) => {
        if (val === oldVal) return;
        if (val) {
          openMessageBox();
        } else {
          closeMessageBox();
        }
      },
      { immediate: true },
    );

    onBeforeUnmount(() => {
      closeMessageBox();
    });

    expose({
      open,
      close,
    });

    return () => null;
  },
});
