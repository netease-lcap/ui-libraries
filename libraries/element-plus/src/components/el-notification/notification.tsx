import { defineComponent, watch, onBeforeUnmount, getCurrentInstance, PropType } from 'vue';
import { ElNotification as ElNotificationPlus, NotificationHandle } from 'element-plus';
import { setElStyle } from '../../utils/dom';
import { ElIcon } from '../index';

export default defineComponent({
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
      default: true,
    },
    offset: {
      type: Number,
      default: 20,
    },
    zIndex: {
      type: Number,
      default: 0,
    },
    customClass: {
      type: String,
    },
    appendTo: {
      type: [String, Object] as PropType<string | HTMLElement>,
    },
  },

  setup(props, { slots, emit, expose }) {
    let instance: any = null;
    let messageHandler: NotificationHandle | null = null;

    const closeNotification = () => {
      if (messageHandler) {
        const handler = messageHandler;
        instance = null;
        messageHandler = null;
        handler?.close();
      }
    };

    const openNotification = () => {
      closeNotification();

      const vnodes = slots.default?.() || [];
      const message = vnodes.length > 0 ? <div>{vnodes}</div> : null;

      const IconComp = <ElIcon name={props.icon} />;

      messageHandler = ElNotificationPlus({
        type: props.type,
        title: props.title,
        duration: props.duration,
        showClose: props.showClose,
        offset: props.offset,
        position: props.position,
        zIndex: props.zIndex,
        icon: IconComp,
        customClass: props.customClass,
        appendTo: props.appendTo,
        message,
        onClick: () => {
          emit('click');
        },
        onClose: () => {
          emit('update:visible', false);
          emit('close');
        },
      } as any);

      instance = getCurrentInstance()!;
      if (!instance) {
        return;
      }

      const { ctx } = instance;
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
      // if (currentInstance?.vnode.data?.staticStyle && instance.$el) {
      //   setElStyle(currentInstance.vnode.data.staticStyle, instance.$el);
      // }

      // if (currentInstance?.vnode.data?.style && instance.$el) {
      //   setElStyle(currentInstance.vnode.data.style, instance.$el);
      // }

      // instance.$nextTick(() => {
      //   emit('open');
      // });
    };

    const open = () => {
      openNotification();
    };

    const close = () => {
      closeNotification();
    };

    watch(
      () => props.visible,
      (val, oldVal) => {
        if (val === oldVal) return;
        if (val) {
          openNotification();
        } else {
          closeNotification();
        }
      },
      { immediate: true },
    );

    onBeforeUnmount(() => {
      closeNotification();
    });

    expose({
      open,
      close,
    });

    return () => null;
  },
});
