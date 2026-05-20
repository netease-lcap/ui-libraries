import { defineComponent, watch, onBeforeUnmount, ref, PropType } from 'vue';
import { ElMessageBox as ElMessageBoxPlus, MessageBoxInputValidator, ComponentSize, Callback } from 'element-plus';
import { ElIcon } from '../index';

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
      default: 'Close',
    },
    showClose: {
      type: Boolean,
      default: true,
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
      default: 'Loading',
    },
    confirmButtonLoadingIcon: {
      type: String,
      default: 'Loading',
    },
    closeOnHashChange: {
      type: Boolean,
      default: true,
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
    },
    customClass: {
      type: String,
    },
    modalClass: {
      type: String,
    },
    cancelButtonClass: {
      type: String,
    },
    confirmButtonClass: {
      type: String,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    appendTo: {
      type: [String, Object] as PropType<string | HTMLElement>,
    },
    customStyle: {
      type: Object,
    },
    callback: {
      type: Function as PropType<Callback>,
    },
    onBeforeClose: {
      type: Function as PropType<({ action, instance, done }: { action: 'confirm' | 'cancel' | 'close', instance: any, done: () => void}) => void>,
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

      const IconComp = props.icon ? <ElIcon name={props.icon} /> : '';
      const CloseIconComp = <ElIcon name={props.closeIcon} />;
      // 源码中需要结合cancelButtonLoading和confirmButtonLoading来判断是否显示loading图标，但是没有暴露这两个参数
      // const CancelButtonLoadingIconComp = <ElIcon name={props.cancelButtonLoadingIcon} />;
      // const ConfirmButtonLoadingIconComp = <ElIcon name={props.confirmButtonLoadingIcon} />;

      try {
        const { value } = await ElMessageBoxPlus({
          boxType: props.type,
          type: props.iconType,
          title: props.title,
          message,
          autofocus: props.autofocus,
          cancelButtonText: props.cancelButtonText,
          confirmButtonText: props.confirmButtonText,
          // cancelButtonLoadingIcon: CancelButtonLoadingIconComp,
          // confirmButtonLoadingIcon: ConfirmButtonLoadingIconComp,
          center: props.center,
          draggable: props.draggable,
          overflow: props.overflow,
          icon: IconComp,
          closeIcon: CloseIconComp,
          distinguishCancelAndClose: true,
          lockScroll: props.lockScroll,
          showCancelButton: props.showCancelButton,
          showConfirmButton: props.showConfirmButton,
          showClose: props.showClose,
          roundButton: props.roundButton,
          closeOnPressEscape: props.closeOnPressEscape,
          closeOnClickModal: props.closeOnClickModal,
          // closeOnPressEscape: props.type !== 'alert',
          // closeOnClickModal: props.type !== 'alert',
          showInput: props.type === 'prompt',
          inputPlaceholder: props.inputPlaceholder,
          inputType: props.inputType,
          inputValue: props.inputValue,
          inputPattern: props.inputPattern ? new RegExp(props.inputPattern) : undefined,
          inputValidator: props.inputValidator,
          inputErrorMessage: props.inputErrorMessage,
          buttonSize: props.buttonSize,
          customClass: props.customClass,
          modalClass: props.modalClass,
          cancelButtonClass: props.cancelButtonClass,
          confirmButtonClass: props.confirmButtonClass,
          closeOnHashChange: props.closeOnHashChange,
          appendTo: props.appendTo,
          customStyle: props.customStyle,
          callback: props.callback,
          beforeClose: props.onBeforeClose ? (action, instance, done) => props?.onBeforeClose?.({ action, instance, done }) : undefined,
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
