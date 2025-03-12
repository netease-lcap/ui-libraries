import { defineComponent, watch, onBeforeUnmount, getCurrentInstance, ComponentInternalInstance } from 'vue';
// TODO LD:这里要改成组件库里的icon组件
import { ElMessage as ElMessagePlus, ElIcon, MessageHandler } from 'element-plus';
import { setElStyle } from '../../utils/dom';

export default defineComponent({
  name: 'ElMessage',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'info',
    },
    plain: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
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
    grouping: {
      type: Boolean,
      default: false,
    },
    repeatNum: {
      type: Number,
      default: 1,
    },
  },

  setup(props, { slots, emit, expose }) {
    let messageHandler: MessageHandler | null = null;
    let instance: ComponentInternalInstance | null = null;

    const closeMessage = () => {
      if (messageHandler) {
        const handler = messageHandler;
        instance = null;
        messageHandler = null;
        handler?.close();
      }
    };

    const openMessage = () => {
      if (instance) {
        closeMessage();
      }

      const vnodes = slots.default?.() || [];
      // TODO LD:确认Icon的使用方式
      const message = (
        <div class="el-message__content">
          {props.icon && (
            <ElIcon
              name={props.icon}
              class={`el-message__icon el-icon-${props.type}`}
            />
          )}
          {vnodes}
        </div>
      );

      messageHandler = ElMessagePlus({
        type: props.type,
        plain: props.plain,
        icon: props.icon,
        duration: props.duration,
        showClose: props.showClose,
        center: props.center,
        offset: props.offset,
        grouping: props.grouping,
        repeatNum: props.repeatNum,
        message,
        iconClass: props.icon ? 'el-message--custom-icon' : '',
        onClose: () => {
          emit('update:visible', false);
          emit('close');
        },
      }as any);
      instance = getCurrentInstance()!;
      if (!instance) {
        return;
      }

      const { ctx } = instance as any;
      // 处理样式
      if (ctx.$el) {
        if (instance?.data?.staticStyle) {
          setElStyle(instance.data.staticStyle, ctx.$el);
        }
        if (instance?.data?.style) {
          setElStyle(instance.data.style, ctx.$el);
        }
      }
      ctx.$nextTick(() => {
        emit('open');
      });
    };

    const open = () => {
      openMessage();
    };

    const close = () => {
      closeMessage();
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

    // TODO LD
    const originalExpose = getCurrentInstance()?.exposed || {};
    expose({
      ...originalExpose,
      open,
      close,
    });
    return () => null;
  },
});
