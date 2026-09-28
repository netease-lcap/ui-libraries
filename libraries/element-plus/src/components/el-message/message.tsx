import { defineComponent, watch, onBeforeUnmount, getCurrentInstance, nextTick } from 'vue';
import { ElMessage as ElMessagePlus, MessageHandler } from 'element-plus';
import { setElStyle } from '../../utils/dom';
import { ElIcon } from '../index';

// TODO
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
    msgContent: {
      type: String,
      default: '消息内容',
    },
  },

  setup(props, { slots, emit, expose, attrs }) {
    let messageHandler: MessageHandler | null = null;

    const closeMessage = () => {
      if (messageHandler) {
        const handler = messageHandler;
        messageHandler = null;
        handler?.close();
      }
    };

    const openMessage = () => {
      // if (messageHandler) {
      //   closeMessage();
      // }

      const iconComp = props.icon ? <ElIcon name={props.icon} class={`el-message__icon el-icon-${props.type}`} /> : '';

      const messageId = `el-message-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // grouping 功能不支持 VNode 类型的消息，如果启用了 grouping，使用字符串类型的 message
      let message: string | any;
      if (props.grouping) {
        message = props.msgContent;
      } else {
        // 不使用 grouping 时, 使用 VNode 格式（插槽形式）
        const vnodes = slots.default?.() || [];
        message = (
          <div class="el-message__content">
            {vnodes}
          </div>
        );
      }

      const classNames = attrs?.class;
      const styleAttrs = attrs?.style;

      messageHandler = ElMessagePlus({
        type: props.type,
        plain: props.plain,
        icon: iconComp,
        duration: props.duration,
        showClose: props.showClose,
        center: props.center,
        offset: props.offset,
        grouping: props.grouping,
        repeatNum: props.repeatNum,
        message,
        iconClass: props.icon ? 'el-message--custom-icon' : '',
        customClass: `${messageId} ${classNames}`,
        onClose: () => {
          emit('update:visible', false);
          emit('close');
        },
      } as any);
      // 确保 DOM 已渲染完成
      nextTick(() => {
        if (messageHandler && styleAttrs) {
          const messageEl = document.querySelector(`.${messageId}`) as HTMLElement;

          if (messageEl && typeof styleAttrs === 'object') {
            setElStyle(styleAttrs, messageEl);
          }
        }
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
